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
  createTeachersSubjects,
  alterTable,
  createClassesSubjects,
} from './queries';
import {
  createUserSeeds,
  createParentSeeds,
  createTeacherSeeds,
  createClassSeeds,
  createStudentSeeds,
  createSubjectSeeds,
  createClassesSubjectsSeeds,
  createTeachersSubjectsSeeds,
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
    `
    DROP TABLE IF EXISTS "ClassesSubjects" cascade;
    DROP TABLE IF EXISTS "TeachersSubjects" cascade;
    DROP TABLE IF EXISTS "AbsentNotes" cascade;
    DROP TABLE IF EXISTS "Remarks" cascade;
    DROP TABLE IF EXISTS "Absence" cascade;
    DROP TABLE IF EXISTS "Class" cascade;
    DROP TABLE IF EXISTS "Grades" cascade;
    DROP TABLE IF EXISTS "Subject" cascade;
    DROP TABLE IF EXISTS "Student" cascade;
   DROP TABLE IF EXISTS "Parent" cascade;
    DROP TABLE IF EXISTS "Teacher" cascade;
    DROP TABLE IF EXISTS "User" cascade;`,
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
    createTeachersSubjects,
    createClassesSubjects,
  ]);

export const alterTables = () =>
  executeQueryArray([
    `ALTER TABLE "User" ADD CONSTRAINT "User_check_role"  CHECK ("role" = 'ADMIN' OR "role" = 'TEACHER' OR "role" = 'PARENT' OR "role" = 'STUDENT' or "role" = '');

    ALTER TABLE "Student" ADD CONSTRAINT "Student_fk0" FOREIGN KEY ("idStudent") REFERENCES "User"("id") ON DELETE CASCADE;
    ALTER TABLE "Student" ADD CONSTRAINT "Student_fk1" FOREIGN KEY ("ParentID") REFERENCES "Parent"("idParent") ON DELETE SET NULL;
    ALTER TABLE "Student" ADD CONSTRAINT "Student_fk2" FOREIGN KEY ("classID") REFERENCES "Class"("idClass");

    ALTER TABLE "Parent" ADD CONSTRAINT "Parent_fk0" FOREIGN KEY ("idParent") REFERENCES "User"("id");

    ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_fk0" FOREIGN KEY ("idTeacher") REFERENCES "User"("id") ON DELETE CASCADE;
    
    ALTER TABLE "Grades" ADD CONSTRAINT "Grades_fk0" FOREIGN KEY ("subjectID") REFERENCES "Subject"("idSubject");
    ALTER TABLE "Grades" ADD CONSTRAINT "Grades_fk1" FOREIGN KEY ("studentID") REFERENCES "Student"("idStudent") ON DELETE CASCADE;
    ALTER TABLE "Grades" ADD CONSTRAINT "Grades_fk2" FOREIGN KEY ("teacherID") REFERENCES "Teacher"("idTeacher") ON DELETE SET NULL;

    ALTER TABLE "Class" ADD CONSTRAINT "Class_fk0" FOREIGN KEY ("teacherID") REFERENCES "Teacher"("idTeacher");

    ALTER TABLE "Absence" ADD CONSTRAINT "Absence_fk0" FOREIGN KEY ("SubjectID") REFERENCES "Subject"("idSubject");
    ALTER TABLE "Absence" ADD CONSTRAINT "Absence_fk1" FOREIGN KEY ("studentID") REFERENCES "Student"("idStudent") ON DELETE CASCADE;

    ALTER TABLE "Remarks" ADD CONSTRAINT "Remarks_fk0" FOREIGN KEY ("studentID") REFERENCES "Student"("idStudent") ON DELETE CASCADE;
    ALTER TABLE "Remarks" ADD CONSTRAINT "Remarks_fk1" FOREIGN KEY ("teacherID") REFERENCES "Teacher"("idTeacher") ON DELETE SET NULL;
    
    ALTER TABLE "AbsentNotes" ADD CONSTRAINT "absentNotes_fk0" FOREIGN KEY ("parentID") REFERENCES "Parent"("idParent") ON DELETE SET NULL;
    ALTER TABLE "AbsentNotes" ADD CONSTRAINT "absentNotes_fk1" FOREIGN KEY ("absenceID") REFERENCES "Absence"("idAbsence");

    ALTER TABLE "TeachersSubjects" ADD CONSTRAINT "TeachersSubjects_fk0" FOREIGN KEY ("subjectID") REFERENCES "Subject"("idSubject") ON DELETE CASCADE;
    ALTER TABLE "TeachersSubjects" ADD CONSTRAINT "TeachersSubjects_fk1" FOREIGN KEY ("teacherID") REFERENCES "Teacher"("idTeacher") ON DELETE CASCADE;
    
    ALTER TABLE "ClassesSubjects" ADD CONSTRAINT "ClassesSubjects_fk0" FOREIGN KEY ("subjectID") REFERENCES "Subject"("idSubject") ON DELETE CASCADE;
    ALTER TABLE "ClassesSubjects" ADD CONSTRAINT "ClassesSubjects_fk1" FOREIGN KEY ("classID") REFERENCES "Class"("idClass") ON DELETE CASCADE;
    `,
  ]);

// export const alterTables = () =>
// executeQueryArray([alterTable
// ]);

export const createUserSeed = () => executeQueryArray([createUserSeeds]);

export const createParentSeed = () => executeQueryArray([createParentSeeds]);

export const createTeacherSeed = () => executeQueryArray([createTeacherSeeds]);

export const createClassSeed = () => executeQueryArray([createClassSeeds]);

export const createStudentSeed = () => executeQueryArray([createStudentSeeds]);

export const createSubjectSeed = () => executeQueryArray([createSubjectSeeds]);

export const createTeachersSubjectsSeed = () =>
  executeQueryArray([createTeachersSubjectsSeeds]);

export const createClassesSubjectsSeed = () =>
  executeQueryArray([createClassesSubjectsSeeds]);
