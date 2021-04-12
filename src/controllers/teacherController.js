import { pool } from '../models/pool';

function userExists(id) {
  let exists = pool
    .query(`Select * from "User" where "id"='${id}'`)
    .then((res) => {
      if (!res.rows[0]) {
        return false;
      }
      return true;
    });
  return exists;
}

export const addNewTeacher = async (req, res) => {
  let { idTeacher, telephoneNumber } = req.body;
  const userExistsValidUser = await userExists(idTeacher);
  if (userExistsValidUser) {
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack);
      }
      client.query(
        `INSERT INTO "Teacher" ("idTeacher", "telephoneNumber")
          VALUES(${idTeacher}, ${telephoneNumber});`,
        (err, resQ) => {
          release();
          if (err) {
            return res
              .status(404)
              .send({ message: 'Error while adding new teacher ' + err });
          } else {
            return res.status(200).json({ message: 'Added new teacher' });
          }
        }
      );
    });
  } else {
    return res
      .status(409)
      .json({ message: "There is no such user. First create user's account" });
  }
};

export const getAllTeachers = (req, res) => {
  let teacherList;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client
      .query(
        `select "idTeacher","name","lastname", "telephoneNumber","email","role" from "Teacher" full join "User" on "Teacher"."idTeacher"="User".id where "role" like 'TEACHER' or "idTeacher" is not null `
      )
      .then((resQ) => {
        release();
        teacherList = resQ.rows;
        console.log(teacherList);
        return res
          .status(200)
          .json({ message: 'All teachers List', teacherList });
      });
  });
};

export const getTeacherByID = (req, res) => {
  let idTeacher = req.params.idTeacher;
  let userList;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client
      .query(
        `select "idTeacher","name","lastname", "telephoneNumber","email","role" from "Teacher"
         full join "User" on "Teacher"."idTeacher"="User".id where ("role" like 'TEACHER' or "idTeacher" is not null) and "idTeacher"=${idTeacher} `
      )
      .then((resQ) => {
        release();
        if (resQ.rowCount == 0) {
          return res
            .status(200)
            .json({ message: 'No teacher with given ID: ', userList });
        }
        userList = resQ.rows;
        console.log(userList);
        return res.status(200).json({ message: 'Teacher', userList });
      });
  });
};

export const getAllTeachersWithAssignedSubject = (req, res) => {
  let teacherList;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client
      .query(
        `select "idTeacher","name","lastname", "telephoneNumber","email", string_agg("subjectName", ', ')as subjects,"role" from "Teacher"
          full join "User" on "Teacher"."idTeacher"="User".id
          join "TeachersSubjects" on "Teacher"."idTeacher"="TeachersSubjects"."teacherID" 
          full join "Subject" on "Subject"."idSubject"="TeachersSubjects"."subjectID"
          where "role" like 'TEACHER' or "idTeacher" is not null
          GROUP BY 1,2,3,5,7`
      )
      .then((resQ) => {
        release();
        teacherList = resQ.rows;
        console.log(teacherList);
        return res.status(200).json({
          message: 'All teachers with assigned subject list',
          teacherList,
        });
      });
  });
};

export const getAllTeachersAssginedToClass = (req, res) => {
  let teacherList;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client
      .query(
        `select "idTeacher","name","lastname", "telephoneNumber","email","role", "idClass","className" from "Teacher" full join "User" 
          on "Teacher"."idTeacher"="User".id full join "Class" on "Teacher"."idTeacher"="Class"."teacherID"
           where "idClass" is not null and ("role" like 'TEACHER' or "idTeacher" is not null)`
      )
      .then((resQ) => {
        release();
        teacherList = resQ.rows;
        console.log(teacherList);
        return res.status(200).json({
          message: 'All teachers assigned to class List',
          teacherList,
        });
      });
  });
};

export const changeTeacherTelephoneNumberByID = (req, res) => {
  let { idTeacher, telephoneNumber } = req.body;
  pool.query(
    `update "Teacher" set "telephoneNumber"='${telephoneNumber}' where "Teacher"."idTeacher"=${idTeacher}`,
    (err) => {
      if (!err) {
        return res.status(200).json({ message: 'Changed phone number.' });
      } else {
        return res.status(404).json({ message: "Teacher doesn't exists" });
      }
    }
  );
};

export const getAllTeachersSubjectsByID = (req, res) => {
  let { idTeacher } = req.body;
  let teachersSubjectsList;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client
      .query(
        `select "teacherID", "name","lastname","subjectName" from "TeachersSubjects" join "User" on "TeachersSubjects"."teacherID"="User"."id"
          join "Subject" on "TeachersSubjects"."subjectID"="Subject"."idSubject" where "teacherID"=${idTeacher} `
      )
      .then((resQ) => {
        release();
        teachersSubjectsList = resQ.rows;
        console.log(teachersSubjectsList);
        return res
          .status(200)
          .json({ message: "All teacher's subjects", teachersSubjectsList });
      });
  });
};
