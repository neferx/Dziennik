import express from 'express';
import { authenticateJWT } from '../auth/auth';
import {
  indexPage,
  testowy,
  login,
  register,
  getAllStudentsFromClassByID,
  getParentByID,
  getParentByStudentsId,
  getAllParentsByClassID,
  getAllParentsByClassName,
  changePassword,
  getUserByID,
  getStudentByID,
  changeUserRoleByID,
  changeUserEmailByID,
  getAllUsers,
  deleteUserByID,
  addNewClass,
  changeClassNameByID,
  changeClassTeacher,
  getClassByID,
  getClassAndTeacherByID,
  getAllClassesSubjectsByID,
  addNewStudent,
  addStudentToClass,
  getAllStudents,
  getAllStudentsWithoutClass,
  addNewParent,
  getAllParents,
  addNewTeacher,
  getTeacherByID,
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
  getAllTeachersWithAssignedSubject,
  addNewGrade,
  assignNewSubjectToClassByID,
  deleteClassesSubjectByID,
  getAllStudentGrades,
  getAllStudentSubjectGrades,
  addNewAbsence,
  getAbsenceByID,
  getAllStudentAbsences,
  getAllStudentUnexcusedAbsences,
  excuseAbsenceByID,
} from '../controllers';
const indexRouter = express.Router();

indexRouter.get('/', indexPage);
indexRouter.get('/testowy', testowy);
indexRouter.post('/Login', login);
indexRouter.post('/Register', register);
indexRouter.patch('/ChangePassword', authenticateJWT, changePassword); //dodac do pozostalych authenticateJWT
indexRouter.get('/GetUserByID/:id', getUserByID);
indexRouter.post('/ChangeUserRoleByID', changeUserRoleByID);
indexRouter.post('/ChangeUserEmailByID', changeUserEmailByID);
indexRouter.patch('/EditUserByID', editUserByID);
indexRouter.delete('/DeleteUserByID', deleteUserByID);
indexRouter.get('/GetAllStudentsFromClassByID', getAllStudentsFromClassByID);
indexRouter.get('/getParentByID/:idParent', getParentByID);
indexRouter.get('/GetParentByStudentsID', getParentByStudentsId);
indexRouter.get('/GetAllParentsByClassID', getAllParentsByClassID);
indexRouter.get('/GetAllParentsByClassName', getAllParentsByClassName);
indexRouter.post('/addNewParent', addNewParent);
indexRouter.get('/GetAllParents', getAllParents);
indexRouter.get('/GetStudentByID/:idStudent', getStudentByID);
indexRouter.post('/AddNewClass', addNewClass);
indexRouter.post('/ChangeClassNameByID', changeClassNameByID);
indexRouter.post('/ChangeClassTeacher', changeClassTeacher);
indexRouter.get('/GetClassByID/:idClass', getClassByID);
indexRouter.get('/GetClassAndTeacherByID', getClassAndTeacherByID);
indexRouter.patch('/addStudentToClass', addStudentToClass);
indexRouter.post('/AddNewStudent', addNewStudent);
indexRouter.get('/GetAllStudents', getAllStudents);
indexRouter.get('/GetAllStudentsWithoutClass', getAllStudentsWithoutClass);
indexRouter.patch('/EditStudentByID', editStudentByID);
indexRouter.delete('/DeleteStudentByID', deleteStudentByID);
indexRouter.post('/AddNewTeacher', addNewTeacher);
indexRouter.get('/getTeacherByID/:idTeacher', getTeacherByID);
indexRouter.get('/GetAllTeachers', getAllTeachers);
indexRouter.get(
  '/getAllTeachersAssginedToClass',
  getAllTeachersAssginedToClass
);
indexRouter.patch(
  '/ChangeTeacherTelephoneNumberByID',
  changeTeacherTelephoneNumberByID
);
indexRouter.get('/GetAllTeachersSubjectsByID', getAllTeachersSubjectsByID);
indexRouter.get(
  '/GetAllTeachersWithAssignedSubject',
  getAllTeachersWithAssignedSubject
);
indexRouter.get('/GetAllUsers', getAllUsers);
indexRouter.post('/AddNewRemark', addNewRemark);
indexRouter.delete('/DeleteRemarkByID', deleteRemarkByID);
indexRouter.get('/GetAllRemarks', getAllRemarks);
indexRouter.get(
  '/GetAllRemarksByStudentID/:studentID',
  getAllRemarksByStudentID
);
indexRouter.post('/AddNewSubject', addNewSubject);
indexRouter.get('/GetAllSubjects', getAllSubjects);
indexRouter.delete('/DeleteSubjectByID', deleteSubjectByID);
indexRouter.post(
  '/AssignNewSubjectToTeacherByID',
  assignNewSubjectToTeacherByID
);
indexRouter.delete('/DeleteTeachersSubjectByIDs', deleteTeachersSubjectByIDs);
indexRouter.post('/assignNewSubjectToClassByID', assignNewSubjectToClassByID);
indexRouter.delete('/deleteClassesSubjectByID', deleteClassesSubjectByID);
indexRouter.post('/AddNewGrade', addNewGrade);
indexRouter.get('/getAllStudentGrades/:studentID', getAllStudentGrades);
indexRouter.get(
  '/getAllStudentSubjectGrades/:studentID/:subjectID',
  getAllStudentSubjectGrades
);

indexRouter.get(
  '/getAllClassesSubjectsByID/:idClass',
  getAllClassesSubjectsByID
);
indexRouter.post('/addNewAbsence', addNewAbsence);
indexRouter.get('/getAbsenceByID/:idAbsence', getAbsenceByID);
indexRouter.get('/getAllStudentAbsences/:idStudent', getAllStudentAbsences);
indexRouter.get(
  '/getAllStudentUnexcusedAbsences/:idStudent',
  getAllStudentUnexcusedAbsences
);
indexRouter.patch('/excuseAbsenceByID/:idAbsence', excuseAbsenceByID);

export default indexRouter;
