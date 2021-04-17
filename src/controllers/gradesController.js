import { pool } from '../models/pool';

function StudentExists(id) {
  let exists = pool
    .query(`Select * from "User" where "id"='${id}' and "role" like 'STUDENT'`)
    .then((res) => {
      if (!res.rows[0]) {
        return false;
      }
      return true;
    });
  return exists;
}

function teacherAssigned(id, subjectID) {
  let exists = pool
    .query(
      `select * from "Teacher" join "TeachersSubjects" on "Teacher"."idTeacher"="TeachersSubjects"."teacherID" where "idTeacher"=${id} and "subjectID"=${subjectID}`
    )
    .then((res) => {
      if (!res.rows[0]) {
        return false;
      }
      return true;
    });
  return exists;
}

export const addNewGrade = async (req, res) => {
  let { subjectID, studentID, teacherID, grade, gradeType, weight } = req.body;
  const valid = await teacherAssigned(teacherID, subjectID);
  if (valid) {
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
  } else {
    return res
      .status(409)
      .json({ message: "This teacher doesn't teach that subject." });
  }
};

export const getAllStudentGrades = async (req, res) => {
  let studentID = req.params.studentID;
  let gradesList;
  const userExistsValidStudent = await StudentExists(studentID);
  if (userExistsValidStudent) {
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack);
      }
      client
        .query(
          `select "idGrades","studentID","teacherID","name" as "teacherName","lastname" as "teacherLastName","subjectID","subjectName","grade","gradeType","weight"
           from "Grades" join "Subject" on "Grades"."subjectID"="Subject"."idSubject"
           join "User" on "Grades"."teacherID"="User"."id"
           where "studentID"=${studentID}`
        )
        .then((resQ) => {
          release();
          gradesList = resQ.rows;
          console.log(gradesList);
          return res
            .status(200)
            .json({ message: "All student's grades List", gradesList });
        });
    });
  } else {
    return res.status(409).json({ message: 'There is no such student.' });
  }
};

export const getAllStudentSubjectGrades = async (req, res) => {
  let studentID = req.params.studentID;
  let subjectID = req.params.subjectID;
  let gradesList;
  const userExistsValidStudent = await StudentExists(studentID);
  if (userExistsValidStudent) {
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack);
      }
      client
        .query(
          `select "idGrades","studentID","teacherID","name" as "teacherName","lastname" as "teacherLastName","subjectID","subjectName","grade","gradeType","weight"
           from "Grades" join "Subject" on "Grades"."subjectID"="Subject"."idSubject"
           join "User" on "Grades"."teacherID"="User"."id"
           where "studentID"=${studentID} and "subjectID"=${subjectID}`
        )
        .then((resQ) => {
          release();
          gradesList = resQ.rows;
          console.log(gradesList);
          return res
            .status(200)
            .json({ message: "All student's subject grades List", gradesList });
        });
    });
  } else {
    return res.status(409).json({ message: 'There is no such student.' });
  }
};
