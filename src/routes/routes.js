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
  getAllUsers,
  addNewClass,
  changeClassNameByID,
  changeClassTeacher,
  getClassByID,
  getClassAndTeacherByID,
  addNewStudent,
  getAllStudents,
  getAllStudentsWithoutClass,
  addNewParent,
  addNewTeacher,
  getAllTeachers,
  changeTeacherTelephoneNumberByID,
  getAllTeachersAssginedToClass,
  addNewRemark,
  deleteRemarkByID,
  getAllRemarks,
  getAllRemarksByStudentID,
  deleteStudentByID,
  editStudentByID,
  editUserByID,
  addNewSubject,
  getAllSubjects,
  deleteSubjectByID,
  assignNewSubjectToTeacherByID,
  deleteTeachersSubjectByIDs,
  getAllTeachersSubjectsByID,
  addNewGrade
} from '../controllers';
const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/testowy', testowy);
indexRouter.post('/Login', login);
indexRouter.post('/Register', register);
indexRouter.patch('/ChangePassword', authenticateJWT, changePassword); //dodac do pozostalych authenticateJWT
indexRouter.post('/ChangeUserRoleByID', changeUserRoleByID);
indexRouter.post('/ChangeUserEmailByID', changeUserEmailByID);
indexRouter.patch('/EditUserByID', editUserByID);
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
indexRouter.patch('/EditStudentByID', editStudentByID);
indexRouter.delete('/DeleteStudentByID', deleteStudentByID);
indexRouter.post('/AddNewTeacher', addNewTeacher);
indexRouter.get('/GetAllTeachers', getAllTeachers);
indexRouter.get('/getAllTeachersAssginedToClass', getAllTeachersAssginedToClass);
indexRouter.patch('/ChangeTeacherTelephoneNumberByID', changeTeacherTelephoneNumberByID);
indexRouter.get('/GetAllTeachersSubjectsByID', getAllTeachersSubjectsByID);
indexRouter.get('/GetAllUsers', getAllUsers);
indexRouter.post('/AddNewRemark', addNewRemark);
indexRouter.delete('/DeleteRemarkByID', deleteRemarkByID);
indexRouter.get('/GetAllRemarks', getAllRemarks);
indexRouter.get('/GetAllRemarksByStudentID', getAllRemarksByStudentID);
indexRouter.post('/AddNewSubject', addNewSubject);
indexRouter.get('/GetAllSubjects', getAllSubjects);
indexRouter.delete('/DeleteSubjectByID', deleteSubjectByID);
indexRouter.post('/AssignNewSubjectToTeacherByID', assignNewSubjectToTeacherByID);
indexRouter.delete('/DeleteTeachersSubjectByIDs', deleteTeachersSubjectByIDs);
indexRouter.post('/AddNewGrade', addNewGrade);




export default indexRouter;
