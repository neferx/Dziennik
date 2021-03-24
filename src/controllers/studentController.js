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

function test() {
  return 0;
}

//max jeden rodzic dla ucznia - do poprawki 
export const addNewStudent = async (req, res) => {
  let {
    idStudent,
    pesel,
    city,
    street,
    buildingNumber,
    classRegisterNumber,
    ParentID,
    classID,
  } = req.body;
  if (!ParentID) {
    ParentID = null;
  }
  const userExistsValidUser = await userExists(idStudent);
  if (userExistsValidUser) {
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack);
      }
      client.query(
        `INSERT INTO "Student" ("idStudent", "PESEL", "city","street","buildingNumber","classRegisterNumber","ParentID","classID")
        VALUES(${idStudent}, ${pesel},'${city}','${street}',${buildingNumber},${classRegisterNumber},${ParentID},${classID});`,
        (err, resQ) => {
          release();
          if (err) {
            return res
              .status(404)
              .send({ message: 'Error while adding new student ' + err });
          } else {
            console.log(resQ.rows[0]);
            return res.status(200).json({ message: 'Added new student' });
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

export const getAllStudentsFromClassByID = (req, res) => {
  let { idClass } = req.body;
  let studentList;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client
      .query(
        `select "id", "email","name","lastname","role","idStudent","PESEL","city","street","buildingNumber","classRegisterNumber","ParentID","classID" from "User" full join "Student" on "User".id="Student"."idStudent" where ("idStudent" is not null or "role" like 'STUDENT') and "classID"=${idClass}`
      )
      .then((resQ) => {
        release();
        studentList = resQ.rows;
        console.log(studentList);
        return res
          .status(200)
          .json({ message: 'Students from given class list', studentList });
      });
  });
};

export const getAllStudents = (req, res) => {
  let studentList;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client
      .query(
        `select "id", "email","name","lastname","role","idStudent","PESEL","city","street","buildingNumber","classRegisterNumber","ParentID","classID" from "User" full join "Student" on "User".id="Student"."idStudent" where "idStudent" is not null and "role" like 'STUDENT'`
      )
      .then((resQ) => {
        release();
        studentList = resQ.rows;
        console.log(studentList);
        return res
          .status(200)
          .json({ message: 'All students List', studentList });
      });
  });
};

export const getAllStudentsWithoutClass = (req, res) => {
  let studentList;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client
      .query(
        `select "id", "email","name","lastname","role","idStudent","PESEL","city","street","buildingNumber","classRegisterNumber","ParentID","classID" from "User" full join "Student" on "User".id="Student"."idStudent" where ("role" like 'STUDENT' and "idStudent" is null)`
      )
      .then((resQ) => {
        release();
        studentList = resQ.rows;
        console.log(studentList);
        return res
          .status(200)
          .json({ message: 'Students without class list: ', studentList });
      });
  });
};

export const getStudentByID = (req, res) => {
  let { idStudent } = req.body;
  let studentList;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client
      .query(
        `select "id","password", "email","name","lastname","role","idStudent","PESEL","city","street","buildingNumber","classRegisterNumber","ParentID","classID" from "User" full join "Student" on "Student"."idStudent"="User"."id" where "Student"."idStudent" is not null and "Student"."idStudent"=${idStudent};`
      )
      .then((resQ) => {
        release();
        studentList = resQ.rows;
        console.log(studentList);
        return res.status(200).json({ message: 'Student: ', studentList });
      });
  });
};


export const deleteStudentByID = (req, res) => {
  let { idStudent } = req.body;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client
      .query(
        `DELETE FROM "Student" WHERE "idStudent"=${idStudent};`
      )
      .then((resQ) => {
        release();
        return res.status(200).json({ message: 'Deleted student.' });
      });
  });
};


export const editStudentByID = async (req, res) => {
  let {
    email,
    name,
    lastname,
    idStudent,
    pesel,
    city,
    street,
    buildingNumber,
    classRegisterNumber,
    ParentID,
    classID,
  } = req.body;
  if (!ParentID) {
    ParentID = null;
  }
  const userExistsValidUser = await userExists(idStudent);
  if (userExistsValidUser) {
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack);
      }
      client.query(
        `UPDATE "Student" SET "PESEL"=${pesel}, "city"='${city}',"street"='${street}',"buildingNumber"=${buildingNumber},"classRegisterNumber"=${classRegisterNumber},"ParentID"=${ParentID},"classID"=${classID} where "idStudent"=${idStudent};
        UPDATE "User" SET "email"='${email}', "name"='${name}', "lastname"='${lastname}' where "id"=${idStudent} ;`,
        (err,resQ) => { 
          release();
          if (err) {
            return res
              .status(404)
              .send({ message: 'Error while editing student ' + err });
          } else {
            return res.status(200).json({ message: 'Edited student.' });
          }
        }
      );
    });
  } else {
    return res
      .status(409)
      .json({ message: "There is no such user." });
  }
};