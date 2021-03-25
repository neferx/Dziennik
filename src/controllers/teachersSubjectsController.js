import { pool } from '../models/pool';

function teacherAlreadyHasSubject(id,idSubject) {
    let exists = pool
      .query(`Select * from "TeachersSubjects" where "teacherID"=${id} and "subjectID"=${idSubject}`)
      .then((res) => {
          console.log(res.rows);
        if (!res.rows[0]) {
          return true;
        }
        return false;
      });
    return exists;
  }

export const assignNewSubjectToTeacherByID = async (req, res) => {
    let { idTeacher, idSubject } = req.body;
    const valid = await teacherAlreadyHasSubject(idTeacher,idSubject);
    if (valid) {
      pool.connect((err, client, release) => {
        if (err) {
          return console.error('Error acquiring client', err.stack);
        }
        client.query(
          `INSERT INTO "TeachersSubjects" ("teacherID", "subjectID")
          VALUES(${idTeacher}, ${idSubject});`,
          (err, resQ) => {
            release();
            if (err) {
              return res
                .status(404)
                .send({ message: "Error while adding new teacher's subject " + err });
            } else {
              return res.status(200).json({ message: "Added new teacher's subject" });
            }
          }
        );
      });
    } else {
      return res
        .status(409)
        .json({ message: "This teacher already has assigned given subject." });
    }
  };

  export const deleteTeachersSubjectByIDs = (req, res) => {
    let { idTeacher,idSubject } = req.body;
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack);
      }
      client
        .query(
          `DELETE FROM "TeachersSubjects" WHERE "teacherID"=${idTeacher} and "subjectID"=${idSubject};`
        )
        .then((resQ) => {
          release();
          return res.status(200).json({ message: "Deleted teacher's subject." });
        });
    });
  };