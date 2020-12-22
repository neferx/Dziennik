export const createUserTable = `
CREATE TABLE "User" (
	"id" serial NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" VARCHAR(255) NOT NULL,
	"name" varchar(255) NOT NULL,
	"lastname" varchar(255) NOT NULL,
	"role" varchar(255) NOT NULL,
	CONSTRAINT "User_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
) `;

//zmiana na bigint i classRegisterNumber unique- blad z tym jest
export const createStudentTable = `
CREATE TABLE "Student" (
	"idStudent" serial NOT NULL,
	"PESEL" bigint NOT NULL UNIQUE,  
	"city" varchar(255) NOT NULL,
	"street" varchar(255) NOT NULL,
	"buildingNumber" integer NOT NULL,
	"classRegisterNumber" integer NOT NULL,
	"ParentID" integer,
	"classID" integer NOT NULL,
	CONSTRAINT "Student_pk" PRIMARY KEY ("idStudent")
) WITH (
  OIDS=FALSE
)`;

export const createParentTable = `
CREATE TABLE "Parent" (
	"idParent" integer NOT NULL,
	"telephoneNumber" integer NOT NULL,
	CONSTRAINT "Parent_pk" PRIMARY KEY ("idParent")
) WITH (
  OIDS=FALSE
)`;

export const createTeacherTable = `
CREATE TABLE "Teacher" (
	"idTeacher" serial NOT NULL,
	"telephoneNumber" integer NOT NULL,
	CONSTRAINT "Teacher_pk" PRIMARY KEY ("idTeacher")
) WITH (
  OIDS=FALSE
)`;

export const createSubjectTable = `
CREATE TABLE "Subject" (
	"idSubject" serial NOT NULL,
	"TeacherID" serial,
	"subjectName" varchar(255) NOT NULL,
	CONSTRAINT "Subject_pk" PRIMARY KEY ("idSubject")
) WITH (
  OIDS=FALSE
)`;

export const createGradesTable = `
CREATE TABLE "Grades" (
	"idGrades" serial NOT NULL,
	"SubjectID" integer NOT NULL,
	"StudentID" integer NOT NULL,
	"grade" integer NOT NULL,
	"gradeType" varchar(255) NOT NULL,
	"weight" varchar(255) NOT NULL,
	CONSTRAINT "Grades_pk" PRIMARY KEY ("idGrades")
) WITH (
  OIDS=FALSE
)`;

export const createClassTable = `
CREATE TABLE "Class" (
	"idClass" serial NOT NULL,
	"teacherID" integer NOT NULL,
	"className" varchar(255) NOT NULL,
	CONSTRAINT "Class_pk" PRIMARY KEY ("idClass")
) WITH (
  OIDS=FALSE
)`;

export const createAbsenceTable = `
CREATE TABLE "Absence" (
	"idAbsence" serial NOT NULL,
	"absenceDate" TIMESTAMP NOT NULL,
	"SubjectID" integer NOT NULL,
	"studentID" integer NOT NULL,
	"excused" BOOLEAN NOT NULL,
	CONSTRAINT "Absence_pk" PRIMARY KEY ("idAbsence")
) WITH (
  OIDS=FALSE
)`;

export const createRemarksTable = `
CREATE TABLE "Remarks" (
	"idRemarks" serial NOT NULL,
	"studentID" integer NOT NULL,
	"teacherID" integer,
	"remark" varchar(255) NOT NULL,
	CONSTRAINT "Remarks_pk" PRIMARY KEY ("idRemarks")
) WITH (
  OIDS=FALSE
)`;

export const createAbsentNotesTable = `
CREATE TABLE "AbsentNotes" (
	"idAbsentNotes" serial NOT NULL,
	"parentID" integer,
	"absenceID" integer NOT NULL,
	"description" varchar(255) NOT NULL,
	CONSTRAINT "absentNotes_pk" PRIMARY KEY ("idAbsentNotes")
) WITH (
  OIDS=FALSE
)`;

export const alterTable = `
ALTER TABLE "User" ADD CONSTRAINT "User_check_role"  CHECK ("role" = 'ADMIN' OR "role" = 'TEACHER' OR "role" = 'PARENT' OR "role" = 'STUDENT' or "role" = '');
ALTER TABLE "Student" ADD CONSTRAINT "Student_fk0" FOREIGN KEY ("idStudent") REFERENCES "User"("id") ON DELETE CASCADE;
ALTER TABLE "Student" ADD CONSTRAINT "Student_fk1" FOREIGN KEY ("ParentID") REFERENCES "Parent"("idParent") ON DELETE SET NULL;
ALTER TABLE "Student" ADD CONSTRAINT "Student_fk2" FOREIGN KEY ("classID") REFERENCES "Class"("idClass");

ALTER TABLE "Parent" ADD CONSTRAINT "Parent_fk0" FOREIGN KEY ("idParent") REFERENCES "User"("id");

ALTER TABLE "Teacher" ADD CONSTRAINT "Teacher_fk0" FOREIGN KEY ("idTeacher") REFERENCES "User"("id") ON DELETE CASCADE;

ALTER TABLE "Subject" ADD CONSTRAINT "Subject_fk0" FOREIGN KEY ("TeacherID") REFERENCES "Teacher"("idTeacher") ON DELETE SET NULL;

ALTER TABLE "Grades" ADD CONSTRAINT "Grades_fk0" FOREIGN KEY ("SubjectID") REFERENCES "Subject"("idSubject");
ALTER TABLE "Grades" ADD CONSTRAINT "Grades_fk1" FOREIGN KEY ("StudentID") REFERENCES "Student"("idStudent") ON DELETE CASCADE;

ALTER TABLE "Class" ADD CONSTRAINT "Class_fk0" FOREIGN KEY ("teacherID") REFERENCES "Teacher"("idTeacher");

ALTER TABLE "Absence" ADD CONSTRAINT "Absence_fk0" FOREIGN KEY ("SubjectID") REFERENCES "Subject"("idSubject");
ALTER TABLE "Absence" ADD CONSTRAINT "Absence_fk1" FOREIGN KEY ("studentID") REFERENCES "Student"("idStudent") ON DELETE CASCADE;

ALTER TABLE "Remarks" ADD CONSTRAINT "Remarks_fk0" FOREIGN KEY ("studentID") REFERENCES "Student"("idStudent") ON DELETE CASCADE;
ALTER TABLE "Remarks" ADD CONSTRAINT "Remarks_fk1" FOREIGN KEY ("teacherID") REFERENCES "Teacher"("idTeacher") ON DELETE SET NULL;

ALTER TABLE "absentNotes" ADD CONSTRAINT "absentNotes_fk0" FOREIGN KEY ("parentID") REFERENCES "Parent"("idParent") ON DELETE SET NULL;
ALTER TABLE "absentNotes" ADD CONSTRAINT "absentNotes_fk1" FOREIGN KEY ("absenceID") REFERENCES "Absence"("idAbsence");`;

export const insertMessages = `
INSERT INTO messages(name, message)
VALUES ('chidimo', 'first message'),
      ('orji', 'second message')
`;

export const dropMessagesTable =
  'DROP TABLE "User", DROP TABLE "Parent", DROP TABLE "Student"';
