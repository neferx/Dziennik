import { pool } from '../models/pool';

export const addNewAbsence = (req, res) => {
  let { absenceDate, subjectID, studentID, excused } = req.body;
  if (excused == null) {
    excused = false;
  }
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client.query(
      `insert into "Absence" ("absenceDate","SubjectID","studentID","excused")
      VALUES ('${absenceDate}',${subjectID},${studentID},${excused})`,
      (err, resQ) => {
        release();
        if (err) {
          return res
            .status(404)
            .send({ message: 'Error while adding Absence ' + err });
        } else {
          console.log(resQ.rows[0]);
          return res.status(200).json({ message: 'Added new Absence' });
        }
      }
    );
  });
};

export const getAbsenceByID = (req, res) => {
  let idAbsence = req.params.idAbsence;
  let list;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client.query(
      `select * from "Absence" where "idAbsence"='${idAbsence}';`,
      (err, resQ) => {
        release();
        if (err) {
          return res
            .status(404)
            .send({ message: 'Error while getting Absence ' + err });
        } else {
          if (resQ.rowCount == 0) {
            return res
              .status(200)
              .json({ message: 'No Absence with given id' });
          } else {
            list = resQ.rows;
            return res.status(200).json({ message: 'Absence:', list });
          }
        }
      }
    );
  });
};

export const getAllStudentAbsences = (req, res) => {
  let idStudent = req.params.idStudent;
  let list;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client
      .query(`select * from "Absence" where "studentID"=${idStudent}`)
      .then((resQ) => {
        release();
        list = resQ.rows;
        console.log(list);
        return res.status(200).json({ message: 'All students Absences', list });
      });
  });
};

export const getAllStudentUnexcusedAbsences = (req, res) => {
  let idStudent = req.params.idStudent;
  let list;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client
      .query(
        `select * from "Absence" where "studentID"=${idStudent} and "excused"=false`
      )
      .then((resQ) => {
        release();
        list = resQ.rows;
        console.log(list);
        return res
          .status(200)
          .json({ message: 'All students unexcused Absences', list });
      });
  });
};

function absenceExists(id) {
  let exists = pool
    .query(`Select * from "Absence" where "idAbsence"=${id}`)
    .then((res) => {
      if (!res.rows[0]) {
        return false;
      }
      return true;
    });
  return exists;
}

export const excuseAbsenceByID = async (req, res) => {
  let idAbsence = req.params.idAbsence;

  const userExistsValidAbsence = await absenceExists(idAbsence);
  if (userExistsValidAbsence) {
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack);
      }
      client.query(
        `UPDATE "Absence" SET
          "excused"=true where "idAbsence"=${idAbsence}`,
        (err, resQ) => {
          release();
          if (err) {
            return res
              .status(404)
              .send({ message: 'Error while excusing Absence ' + err });
          } else {
            console.log(resQ.rows[0]);
            return res.status(200).json({ message: 'Excused Absence' });
          }
        }
      );
    });
  } else {
    return res.status(409).json({ message: 'There is no such Absence.' });
  }
};
