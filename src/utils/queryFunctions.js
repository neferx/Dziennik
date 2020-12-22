import { pool } from '../models/pool';
import {
  createUserTable,
  createStudentTable,
  createParentTable,
  createTeacherTable,
  createSubjectTable,
  createGradesTable,
  createClassTable,
  createAbsenceTable,
  createRemarksTable,
  createAbsentNotesTable,
} from './queries';
import {
  createUserSeeds,
  createParentSeeds,
  createTeacherSeeds,
  createClassSeeds,
  createStudentSeeds,
} from './seeds';

export const executeQueryArray = async (arr) =>
  new Promise((resolve) => {
    const stop = arr.length;
    arr.forEach(async (q, index) => {
      await pool.query(q);
      if (index + 1 === stop) resolve();
    });
  });
export const dropTables = () =>
  executeQueryArray([
    'DROP TABLE IF EXISTS "User" cascade',
    'DROP TABLE IF EXISTS "Student" cascade',
    'DROP TABLE IF EXISTS "Parent" cascade',
    'DROP TABLE IF EXISTS "Teacher" cascade',
    'DROP TABLE IF EXISTS "Subject" cascade',
    'DROP TABLE IF EXISTS "Grades" cascade',
    'DROP TABLE IF EXISTS "Class" cascade',
    'DROP TABLE IF EXISTS "Absence" cascade',
    'DROP TABLE IF EXISTS "Remarks" cascade',
    'DROP TABLE IF EXISTS "AbsentNotes" cascade',
  ]);
export const createTables = () =>
  executeQueryArray([
    createUserTable,
    createStudentTable,
    createParentTable,
    createTeacherTable,
    createSubjectTable,
    createGradesTable,
    createClassTable,
    createAbsenceTable,
    createRemarksTable,
    createAbsentNotesTable,
  ]);

export const createUserSeed = () => executeQueryArray([createUserSeeds]);

export const createParentSeed = () => executeQueryArray([createParentSeeds]);

export const createTeacherSeed = () => executeQueryArray([createTeacherSeeds]);

export const createClassSeed = () => executeQueryArray([createClassSeeds]);

export const createStudentSeed = () => executeQueryArray([createStudentSeeds]);

export const alterTables = () =>
  executeQueryArray([
    'ALTER TABLE "Student" ADD CONSTRAINT "Student_fk0" FOREIGN KEY ("idStudent") REFERENCES "User"("id")',
    'ALTER TABLE "Student" ADD CONSTRAINT "Student_fk1" FOREIGN KEY ("ParentID") REFERENCES "Parent"("idParent")',
    'ALTER TABLE "Student" ADD CONSTRAINT "Student_fk2" FOREIGN KEY ("classID") REFERENCES "Class"("idClass")',
    'ALTER TABLE "Parent" ADD CONSTRAINT "Parent_fk0" FOREIGN KEY ("idParent") REFERENCES "User"("id")',
    'ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_fk0" FOREIGN KEY ("idTeacher") REFERENCES "User"("id")',
    'ALTER TABLE "Subject" ADD CONSTRAINT "Subject_fk0" FOREIGN KEY ("TeacherID") REFERENCES "Teacher"("idTeacher")',
    'ALTER TABLE "Grades" ADD CONSTRAINT "Grades_fk0" FOREIGN KEY ("SubjectID") REFERENCES "Subject"("idSubject")',
    'ALTER TABLE "Grades" ADD CONSTRAINT "Grades_fk1" FOREIGN KEY ("StudentID") REFERENCES "Student"("idStudent")',
    'ALTER TABLE "Class" ADD CONSTRAINT "Class_fk0" FOREIGN KEY ("teacherID") REFERENCES "Teacher"("idTeacher")',
    'ALTER TABLE "Absence" ADD CONSTRAINT "Absence_fk0" FOREIGN KEY ("SubjectID") REFERENCES "Subject"("idSubject")',
    'ALTER TABLE "Absence" ADD CONSTRAINT "Absence_fk1" FOREIGN KEY ("studentID") REFERENCES "Student"("idStudent")',
    'ALTER TABLE "Remarks" ADD CONSTRAINT "Remarks_fk0" FOREIGN KEY ("studentID") REFERENCES "Student"("idStudent")',
    'ALTER TABLE "Remarks" ADD CONSTRAINT "Remarks_fk1" FOREIGN KEY ("teacherID") REFERENCES "Teacher"("idTeacher")',
    'ALTER TABLE "AbsentNotes" ADD CONSTRAINT "AbsentNotes_fk0" FOREIGN KEY ("parentID") REFERENCES "Parent"("idParent")',
    'ALTER TABLE "AbsentNotes" ADD CONSTRAINT "AbsentNotes_fk1" FOREIGN KEY ("absenceID") REFERENCES "Absence"("idAbsence")',
  ]);
