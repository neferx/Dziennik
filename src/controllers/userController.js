import { pool } from '../models/pool';
import crypto from 'crypto';
import { generateToken } from '../auth/auth';

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

function emailExists(email) {
  let exists = pool
    .query(`Select * from "User" where "email"='${email}'`)
    .then((res) => {
      if (!res.rows[0]) {
        return true;
      }
      return false;
    });
  return exists;
}

function roleExists(id) {
  let exists = pool
    .query(`Select * from "Student" where "idStudent"='${id}'`)
    .then((res) => {
      if (!res.rows[0]) {
        return false;
      }
      return true;
    });
  return exists;
}

export const register = async (req, res) => {
  let { email, password, name, lastname, role } = req.body;
  password = crypto.createHash('sha256').update(password).digest('base64');
  console.log(password);
  const emailExistsValidEmail = await emailExists(email);
  if (emailExistsValidEmail) {
    pool.query(
      `INSERT INTO "User" ("email", "password", "name", "lastname", "role") VALUES('${email}', '${password}', '${name}', '${lastname}', '${role}')`,
      () => {}
    );
    return res.status(200).json({ message: 'Register complete' });
  } else {
    return res.status(409).json({ message: 'Email is already taken' });
  }
};

export const login = (req, res, next) => {
  let { email, password } = req.body;
  password = crypto.createHash('sha256').update(password).digest('base64');
  console.log(password);
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client.query(
      `Select * from "User" where "email"='${email}' and "password"='${password}'`,
      (err, resQ) => {
        release();
        if (!resQ.rows[0]) {
          return res.status(401).send({ message: 'Unauthorized' });
        } else {
          console.log(resQ.rows[0]);
          const token = generateToken(
            resQ.rows[0].name,
            resQ.rows[0].lastname,
            resQ.rows[0].email
          );
          return res.status(200).json({ message: 'Authorized', token });
        }
      }
    );
  });
};

function credentialsValid(id,oldPassword) {
  let exists = pool
    .query(`Select * from "User" where "id"=${id} and "password"='${oldPassword}' `)
    .then((res) => {
      if (!res.rows[0]) {
        return false;
      }
      return true;
    });
  return exists;
}

export const changePassword = async (req, res) => {
  let { id, oldPassword,password } = req.body;
  oldPassword = crypto.createHash('sha256').update(oldPassword).digest('base64');
  password = crypto.createHash('sha256').update(password).digest('base64');
  const valid= await credentialsValid(id,oldPassword);
  console.log(valid);
  if (valid){
  pool.query(
    `update "User" set "password"='${password}' where "User".id=${id} and "password"='${oldPassword}'`,
    (err) => {
      if (!err) {
        return res.status(200).json({ message: 'Changed password' });
      } else {
        return res.status(404).json({ message: "User doesn't exists or incorrect password" });
      }
    }
  );
}
else{
  return res.status(404).json({ message: "Invalid password" });
}
};

export const changeUserRoleByID = async (req, res) => {
  let { id, role } = req.body;
  role = role.toUpperCase();
  const valid= await roleExists(id);
  if(valid){
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack);
      }
      client
        .query(
          `DELETE FROM "Student" WHERE "idStudent"=${id};`
        )
        .then(() => {
          release();
          console.log("Deleted student.");
        });
    });
}
  pool.query(
    `update "User" set "role"='${role}' where "User"."id"=${id};`,
    (err, resQ) => {
      if (!err) {
        if (resQ.rowCount != 0 & valid){
          return res.status(200).json({ message: 'Changed role and deleted student' });
        }
        else if (resQ.rowCount !=0){
          return res.status(200).json({ message: 'Changed role' });
        }
          
        else {
          return res
            .status(200)
            .json({ message: "Couldn't find user with given id" });
        }
      } else {
        return res.status(404).json({ message: 'Failing row constraints ' });
      }
    }
  );
};

export const changeUserEmailByID = async (req, res) => {
  let { id, email } = req.body;
  const emailExistsValidEmail = await emailExists(email);
  if (emailExistsValidEmail) {
    pool.query(
      `update "User" set "email"='${email}' where "User"."id"=${id};`,
      (err, resQ) => {
        if (!err) {
          if (resQ.rowCount != 0)
            return res.status(200).json({ message: 'Changed e-mail' });
          else {
            return res
              .status(200)
              .json({ message: "Couldn't find user with given id" });
          }
        }
      }
    );
  } else {
    return res.status(409).json({ message: 'Email is already taken' });
  }
};

export const getAllUsers = (req, res) => {
  let userList;
  pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack);
    }
    client
      .query(
        `select "id","name","lastname", "email","role" from "User"`
      )
      .then((resQ) => {
        release();
        userList = resQ.rows;
        console.log(userList);
        return res
          .status(200)
          .json({ message: 'All users List', userList });
      });
  });
};

export const editUserByID = async (req, res) => {
  let {
    id,
    email,
    name,
    lastname
  } = req.body;

  const userExistsValidUser = await userExists(id);
  if (userExistsValidUser) {
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack);
      }
      client.query(
        `UPDATE "User" SET "email"='${email}', "name"='${name}', "lastname"='${lastname}' where "id"=${id};`,
        (err,resQ) => { 
          release();
          if (err) {
            return res
              .status(404)
              .send({ message: 'Error while editing user. ' + err });
          } else {
            return res.status(200).json({ message: 'Edited user.' });
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



// INSERT INTO "Student" ("PESEL", "city", "street", "buildingNumber", "classRegisterNumber","ParentID","classID") VALUES(123456,'Częstochowa','Główna',1,6,1,1)

// INSERT INTO "Parent" ("idParent","telephoneNumber") VALUES(1,123456789
//     select * from "User" left join "Parent" on 'user.id'='parent.idParent' ;

//select * from "User" where "role" like 'STUDENT' full join ;

// INSERT INTO public."Student"(
// 	"idStudent", "PESEL", city, street, "buildingNumber", "classRegisterNumber",  "classID")
// 	VALUES (3, 12345678, 'Boronów', 'Pocztowa', 1, 1, 1);
