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

export const addNewParent = async (req, res) => {
  let { idParent, telephoneNumber } = req.body;
  const userExistsValidUser = await userExists(idParent);
  if (userExistsValidUser) {
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack);
      }
      client.query(
        `INSERT INTO "Parent" ("idParent", "telephoneNumber")
        VALUES(${idParent}, ${telephoneNumber});`,
        (err, resQ) => {
          release();
          if (err) {
            return res
              .status(404)
              .send({ message: 'Error while adding new parent ' + err });
          } else {
            return res.status(200).json({ message: 'Added new parent' });
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

export const getAllParents = (req, res) => {
  let parentList;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client
      .query(
        `select "id","email","name","lastname","role","idParent","telephoneNumber" from "User" full join "Parent" on "User"."id"="Parent"."idParent" where "role" like 'PARENT'`
      )
      .then((resQ) => {
        release();
        parentList = resQ.rows;
        return res
          .status(200)
          .json({ message: "Student's parent", parentList });
      });
  });
};

export const getParentByID = (req, res) => {
  let idParent = req.params.idParent;
  let userList;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client
      .query(
        `select "id","email","name","lastname","role","idParent","telephoneNumber" 
        from "User" full join "Parent" on "User"."id"="Parent"."idParent" where "role" like 'PARENT' and "idParent"=${idParent}`
      )
      .then((resQ) => {
        release();
        if (resQ.rowCount == 0) {
          return res
            .status(200)
            .json({ message: 'No parent with given ID: ', userList });
        }
        userList = resQ.rows;
        return res.status(200).json({ message: 'Parent: ', userList });
      });
  });
};

export const getParentByStudentsId = (req, res) => {
  let { idStudent } = req.body;
  let parentList;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client
      .query(
        `select "id","email","name","lastname","role","idParent","telephoneNumber" from "User" full join "Parent" on "User"."id"="Parent"."idParent" where "idParent" in (select "ParentID" from "Student" where "idStudent" in (${idStudent}))`
      )
      .then((resQ) => {
        release();
        parentList = resQ.rows;
        return res
          .status(200)
          .json({ message: "Student's parent", parentList });
      });
  });
};

export const getAllParentsByClassID = (req, res) => {
  //lista wszystkich rodziców z danej klasy po IdKlasy
  let { idClass } = req.body;
  let parentList;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client
      .query(
        `select "id","email","name","lastname","role","idParent","telephoneNumber" from "User" full join "Parent" on
          "User"."id"="Parent"."idParent" where "idParent"
          in (select "ParentID" from "Student" where "classID" in (${idClass}))`
      )
      .then((resQ) => {
        release();
        parentList = resQ.rows;
        return res
          .status(200)
          .json({ message: "Student's parent", parentList });
      });
  });
};

export const getAllParentsByClassName = (req, res) => {
  //lista wszystkich rodziców z danej klasy po nazwie klasy
  let { className } = req.body;
  let parentList;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client
      .query(
        `select "id","email","name","lastname","role","idParent","telephoneNumber" from "User" full join "Parent" on
          "User"."id"="Parent"."idParent" where "idParent"
          in (select "ParentID" from "Student" where "classID" in (select "idClass" from "Class" where "className" like '${className}'));`
      )
      .then((resQ) => {
        release();
        parentList = resQ.rows;
        return res
          .status(200)
          .json({ message: "Student's parent", parentList });
      });
  });
};
