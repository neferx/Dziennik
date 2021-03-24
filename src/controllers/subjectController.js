import { pool } from '../models/pool';

export const addNewSubject = async (req, res) => {
    let { subjectName } = req.body;

      pool.connect((err, client, release) => {
        if (err) {
          return console.error('Error acquiring client', err.stack);
        }
        client.query(
          `INSERT INTO "Subject" ("subjectName")
          VALUES( '${subjectName}');`,
          (err, resQ) => {
            release();
            if (err) {
              return res
                .status(404)
                .send({ message: 'Error while adding new subject ' + err });
            } else {
              return res.status(200).json({ message: 'Added new subject' });
            }
          }
        );
      });
     
  };

  export const getAllSubjects = (req, res) => {
    let subjectList;
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack);
      }
      client
        .query(
          `select * from "Subject"`
        )
        .then((resQ) => {
          release();
          subjectList = resQ.rows;
          console.log(subjectList);
          return res
            .status(200)
            .json({ message: 'All subjects List', subjectList });
        });
    });
  };

  export const deleteSubjectByID = (req, res) => {
    let { idSubject } = req.body;
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack);
      }
      client
        .query(
          `DELETE FROM "Subject" WHERE "idSubject"=${idSubject};`
        )
        .then((resQ) => {
            console.log(resQ.rows[0]);
          release();
          return res.status(200).json({ message: 'Deleted subject.' });
        });
    });
  };
  