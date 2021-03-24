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

  function TeacherExists(id) {
    let exists = pool
      .query(`Select * from "User" where "id"='${id}' and "role" like 'TEACHER'`)
      .then((res) => {
        if (!res.rows[0]) {
          return false;
        }
        return true;
      });
    return exists;
  }

  function RemarkExists(id) {
    let exists = pool
      .query(`Select * from "Remarks" where "idRemarks"='${id}'`)
      .then((res) => {
        if (!res.rows[0]) {
          return false;
        }
        return true;
      });
    return exists;
  }

export const addNewRemark = async (req, res) => {
    let {studentID,teacherID,remark } = req.body;
    const userExistsValidStudent = await StudentExists(studentID);
    const userExistsValidTeacher = await TeacherExists(teacherID);
    if (userExistsValidStudent) {
        if (userExistsValidTeacher){
      pool.connect((err, client, release) => {
        if (err) {
          return console.error('Error acquiring client', err.stack);
        }
        client.query(
          `insert into "Remarks" ("studentID","teacherID","remark") values (${studentID},${teacherID},'${remark}');`,
          (err) => {
            release();
            if (err) {
              return res
                .status(404)
                .send({ message: 'Error while adding new remark ' + err });
            } else {
              return res.status(200).json({ message: 'Added new remark' });
            }
          }
        );
      });
    } else{
        return res
        .status(409)
        .json({ message: "There is no such teacher." });
    }
    } else {
      return res
        .status(409)
        .json({ message: "There is no such student." });
    }
  };

  export const deleteRemarkByID = async (req, res) => {
    let { idRemarks} = req.body;
    const remarkExistsValidRemark = await RemarkExists(idRemarks);
    if (remarkExistsValidRemark){ 
    pool.query(
      `delete from "Remarks" where "idRemarks"=${idRemarks}`,
      (err) => {
        if (!err) {
          return res.status(200).json({ message: 'Deleted remark' });
        } else {
          return res.status(404).json({ message: "Error while deleting" });
        }
      }
    );
    } else{
        return res
        .status(409)
        .json({ message: "There is no such remark to delete." });
    }
  };

  export const getAllRemarks = (req, res) => {
    let remarkList;
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack);
      }
      client
        .query(
          `select * from "Remarks"`
        )
        .then((resQ) => {
          release();
          remarkList = resQ.rows;
          console.log(remarkList);
          return res
            .status(200)
            .json({ message: 'All remarks List', remarkList });
        });
    });
  };

  export const getAllRemarksByStudentID = async(req, res) => {
    let { studentID } = req.body;
    let remarkList;
    const userExistsValidStudent = await StudentExists(studentID);
    if(userExistsValidStudent){
    pool.connect((err, client, release) => {
      if (err) {
        return console.error('Error acquiring client', err.stack);
      }
      client
        .query(
          `select "idRemarks","teacherID","remark","email","name","lastname","role"
           from "Remarks" full join "User" on "Remarks"."studentID"="User"."id" where "studentID"=${studentID}`
        )
        .then((resQ) => {
          release();
          remarkList = resQ.rows;
          console.log(remarkList);
          return res
            .status(200)
            .json({ message: "All student's remarks List", remarkList });
        });
    });
    }else{
        return res
        .status(409)
        .json({ message: "There is no such student." });
    }
  };