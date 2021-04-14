import { pool } from '../models/pool';

function classAlreadyHasSubject(id, idSubject) {
  let exists = pool
    .query(
      `Select * from "ClassesSubjects" where "classID"=${id} and "subjectID"=${idSubject}`
    )
    .then((res) => {
      console.log(res.rows);
      if (!res.rows[0]) {
        return true;
      }
      return false;
    });
  return exists;
}

export const assignNewSubjectToClassByID = async (req, res) => {
  let { idClass, idSubject } = req.body;
  const valid = await classAlreadyHasSubject(idClass, idSubject);
  if (valid) {
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack);
      }
      client.query(
        `INSERT INTO "ClassesSubjects" ("classID", "subjectID")
          VALUES(${idClass}, ${idSubject});`,
        (err, resQ) => {
          release();
          if (err) {
            return res.status(404).send({
              message: 'Error while adding new classes subject ' + err,
            });
          } else {
            return res
              .status(200)
              .json({ message: 'Added new classes subject' });
          }
        }
      );
    });
  } else {
    return res
      .status(409)
      .json({ message: 'This class already has assigned given subject.' });
  }
};

export const deleteClassesSubjectByID = (req, res) => {
  let { idClass, idSubject } = req.body;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client
      .query(
        `DELETE FROM "ClassesSubjects" WHERE "classID"=${idClass} and "subjectID"=${idSubject};`
      )
      .then((resQ) => {
        release();
        return res.status(200).json({ message: 'Deleted classes subject.' });
      });
  });
};
