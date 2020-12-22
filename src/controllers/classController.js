import { pool } from '../models/pool';

export const addNewClass = (req, res) => {
  let { idClass, teacherID, className } = req.body;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client.query(
      `INSERT INTO "Class" ("idClass", "teacherID", "className") VALUES('${idClass}', '${teacherID}', '${className}')`,
      (err, resQ) => {
        release();
        if (err) {
          return res
            .status(404)
            .send({ message: 'Error while creating new class ' + err });
        } else {
          console.log(resQ.rows[0]);
          return res.status(200).json({ message: 'Created new class' });
        }
      }
    );
  });
};

export const changeClassNameByID = (req, res) => {
  let { idClass, className } = req.body;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client.query(
      `update "Class" set "className"='${className}' where "Class"."idClass"=${idClass};`,
      (err, resQ) => {
        release();
        if (err) {
          return res
            .status(404)
            .send({ message: 'Error while changing class name ' + err });
        } else {
          console.log(resQ.rows[0]);
          return res.status(200).json({ message: 'Changed class name' });
        }
      }
    );
  });
};

export const changeClassTeacher = (req, res) => {
  let { idClass, teacherID } = req.body;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client.query(
      `update "Class" set "teacherID"='${teacherID}' where "Class"."idClass"=${idClass};`,
      (err, resQ) => {
        release();
        if (err) {
          return res
            .status(404)
            .send({ message: 'Error while changing class teacher ' + err });
        } else {
          console.log(resQ.rows[0]);
          return res.status(200).json({ message: 'Changed class teacher' });
        }
      }
    );
  });
};

export const getClassByID = (req, res) => {
  let { idClass } = req.body;
  let classList;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client.query(
      `select * from "Class" where "Class"."idClass"='${idClass}';`,
      (err, resQ) => {
        release();
        if (err) {
          return res
            .status(404)
            .send({ message: 'Error while getting class ' + err });
        } else {
          if (resQ.rowCount == 0) {
            return res.status(200).json({ message: 'No class with given id' });
          } else {
            classList = resQ.rows[0];
            return res.status(200).json({ message: 'Class:', classList });
          }
        }
      }
    );
  });
};

export const getClassAndTeacherByID = (req, res) => {
  let { idClass } = req.body;
  let classList;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client.query(
      `select "idClass","className","teacherID","name","lastname","email","telephoneNumber","role" from "Class" full join "User" on "Class"."teacherID"="User"."id" full join "Teacher" on "Teacher"."idTeacher"="Class"."teacherID" where "Class"."idClass"=${idClass}; `,
      (err, resQ) => {
        release();
        if (err) {
          return res
            .status(404)
            .send({ message: 'Error while getting class ' + err });
        } else {
          if (resQ.rowCount == 0) {
            return res.status(200).json({ message: 'No class with given id' });
          } else {
            classList = resQ.rows[0];
            return res
              .status(200)
              .json({ message: 'Class and teacher: ', classList });
          }
        }
      }
    );
  });
};
