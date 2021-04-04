import { pool } from '../models/pool';

function teacherAssigned(id,subjectID) {
    let exists = pool
      .query(`select * from "Teacher" join "TeachersSubjects" on "Teacher"."idTeacher"="TeachersSubjects"."teacherID" where "idTeacher"=${id} and "subjectID"=${subjectID}`)
      .then((res) => {
        if (!res.rows[0]) {
          return false;
        }
        return true;
      });
    return exists;
  }


export const addNewGrade = async (req, res) => { 
    let {subjectID,studentID,teacherID,grade,gradeType,weight } = req.body;
    const valid = await teacherAssigned(teacherID,subjectID);
        if (valid){
      pool.connect((err, client, release) => {
        if (err) {
          return console.error('Error acquiring client', err.stack);
        }
        client.query(
          `insert into "Grades" ("subjectID","studentID","teacherID","grade","gradeType","weight") values (${subjectID},${studentID},${teacherID},${grade},'${gradeType}',${weight});`,
          (err) => {
            release();
            if (err) {
              return res
                .status(404)
                .send({ message: 'Error while adding new grade ' + err });
            } else {
              return res.status(200).json({ message: 'Added new grade' });
            }
          }
        );
      });
    } else{
        return res
        .status(409)
        .json({ message: "This teacher doesn't teach that subject." });
    }
    
  };