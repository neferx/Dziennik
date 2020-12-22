import express from 'express';
import { authenticateJWT } from '../auth/auth';
import {
  indexPage,
  testowy,
  login,
  register,
  getAllStudentsFromClassByID,
  getParentByStudentsId,
  getAllParentsByClassID,
  getAllParentsByClassName,
  changePassword,
  getStudentByID,
  changeUserRoleByID,
  changeUserEmailByID,
  addNewClass,
  changeClassNameByID,
  changeClassTeacher,
  getClassByID,
  getClassAndTeacherByID,
  addNewStudent,
  getAllStudents,
  getAllStudentsWithoutClass,
  addNewParent,
} from '../controllers';
const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/testowy', testowy);
indexRouter.post('/Login', login);
indexRouter.post('/Register', register);
indexRouter.post('/ChangePassword', authenticateJWT, changePassword); //dodac do pozostalych authenticateJWT
indexRouter.post('/ChangeUserRoleByID', changeUserRoleByID);
indexRouter.post('/ChangeUserEmailByID', changeUserEmailByID);
indexRouter.get('/GetAllStudentsFromClassByID', getAllStudentsFromClassByID);
indexRouter.get('/GetParentByStudentsID', getParentByStudentsId);
indexRouter.get('/GetAllParentsByClassID', getAllParentsByClassID);
indexRouter.get('/GetAllParentsByClassName', getAllParentsByClassName);
indexRouter.post('/addNewParent', addNewParent);
indexRouter.get('/GetStudentByID', getStudentByID);
indexRouter.post('/AddNewClass', addNewClass);
indexRouter.post('/ChangeClassNameByID', changeClassNameByID);
indexRouter.post('/ChangeClassTeacher', changeClassTeacher);
indexRouter.get('/GetClassByID', getClassByID);
indexRouter.get('/GetClassAndTeacherByID', getClassAndTeacherByID);
indexRouter.post('/AddNewStudent', addNewStudent);
indexRouter.get('/GetAllStudents', getAllStudents);
indexRouter.get('/GetAllStudentsWithoutClass', getAllStudentsWithoutClass);

export default indexRouter;
