export const createUserSeeds = `
INSERT INTO "User" ("email", "password", "name", "lastname", "role") VALUES('lukasztyrala@gmail.com', '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=', 'Łukasz', 'Tyrała', 'STUDENT');
INSERT INTO "User" ("email", "password", "name", "lastname", "role") VALUES('mateuszbarwicki@gmail.com', '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=', 'Mateusz', 'Barwicki', 'STUDENT');
INSERT INTO "User" ("email", "password", "name", "lastname", "role") VALUES('dennisbuk@gmail.com', '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=', 'Dennis', 'Buk', 'STUDENT');
INSERT INTO "User" ("email", "password", "name", "lastname", "role") VALUES('bartoszchlad@gmail.com', '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=', 'Bartosz', 'Chlad', 'ADMIN');
INSERT INTO "User" ("email", "password", "name", "lastname", "role") VALUES('piotrekduleba@gmail.com', '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=', 'Piotr', 'Dulęba', 'TEACHER');
INSERT INTO "User" ("email", "password", "name", "lastname", "role") VALUES('jakubgieron@gmail.com', '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=', 'Jakub', 'Gieron', 'TEACHER');
INSERT INTO "User" ("email", "password", "name", "lastname", "role") VALUES('balbinabarwicka@gmail.com', '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=', 'Balbina', 'Barwicka', 'PARENT');
INSERT INTO "User" ("email", "password", "name", "lastname", "role") VALUES('mariolabuk@gmail.com', '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=', 'Mariola', 'BUK', 'PARENT');
INSERT INTO "User" ("email", "password", "name", "lastname", "role") VALUES('uczen@gmail.com', 'KopR+6Zuczrgcru85OZ4vzK5rqIEn9ab9o3k4X0QFVM=', 'Pan', 'Uczeń', 'STUDENT');
INSERT INTO "User" ("email", "password", "name", "lastname", "role") VALUES('rodzic@gmail.com', '+QSr3Imlp8WUwpIz9abfDjegSm0xSBLzQKE8+nNrkAA=', 'Pan', 'Rodzic', 'PARENT');
INSERT INTO "User" ("email", "password", "name", "lastname", "role") VALUES('nauczyciel@gmail.com', 'nWU82IOs2ZTW42a2/ez35RI/kL/QBA3dlnvBzcGxgv0=', 'Pan', 'Nauczyciel', 'TEACHER');
`;

export const createParentSeeds = `
INSERT INTO "Parent" ("idParent", "telephoneNumber") VALUES(7, 605705805);
INSERT INTO "Parent" ("idParent", "telephoneNumber") VALUES(8, 123456789);
INSERT INTO "Parent" ("idParent", "telephoneNumber") VALUES(6, 456123789);
INSERT INTO "Parent" ("idParent", "telephoneNumber") VALUES(10, 604688123);
`;

export const createTeacherSeeds = `
INSERT INTO "Teacher" ("idTeacher","telephoneNumber") VALUES(5,997997997);
INSERT INTO "Teacher" ("idTeacher","telephoneNumber") VALUES(6,123456789);
INSERT INTO "Teacher" ("idTeacher","telephoneNumber") VALUES(11,664314526);
`;

export const createClassSeeds = `
INSERT INTO "Class" ("idClass","teacherID","className") VALUES(1,6,'Ia');
INSERT INTO "Class" ("idClass","teacherID","className") VALUES(2,11,'Ib');
`;

export const createStudentSeeds = `
INSERT INTO "Student" ("idStudent","PESEL","city","street","buildingNumber","classRegisterNumber","ParentID","classID") VALUES(1,12345678911,'Boronów','Leśna',7,1,6,1);
INSERT INTO "Student" ("idStudent","PESEL","city","street","buildingNumber","classRegisterNumber","ParentID","classID") VALUES(2,12345678912,'Boronów','Pocztowa',14,2,7,1);
INSERT INTO "Student" ("idStudent","PESEL","city","street","buildingNumber","classRegisterNumber","ParentID","classID") VALUES(3,12345678913,'Przybynów','Kamienna',189,3,8,1);
INSERT INTO "Student" ("idStudent","PESEL","city","street","buildingNumber","classRegisterNumber","ParentID","classID") VALUES(9,97010278914,'Częstochowa','Szkolna',112,null,null,1);
`;

export const createSubjectSeeds = `
INSERT INTO "Subject" ("subjectName") VALUES('polski');
INSERT INTO "Subject" ("subjectName") VALUES('angielski');
INSERT INTO "Subject" ("subjectName") VALUES('matematyka');
INSERT INTO "Subject" ("subjectName") VALUES('geografia');
INSERT INTO "Subject" ("subjectName") VALUES('niemiecki');
INSERT INTO "Subject" ("subjectName") VALUES('wychowanie fizyczne');
INSERT INTO "Subject" ("subjectName") VALUES('biologia');
INSERT INTO "Subject" ("subjectName") VALUES('informatyka');
INSERT INTO "Subject" ("subjectName") VALUES('religia');
INSERT INTO "Subject" ("subjectName") VALUES('wiedza o społeczeństwie');
INSERT INTO "Subject" ("subjectName") VALUES('fizyka');
INSERT INTO "Subject" ("subjectName") VALUES('historia');
`;

export const createTeachersSubjectsSeeds = `
INSERT INTO "TeachersSubjects" ("teacherID","subjectID") VALUES(5,1);
INSERT INTO "TeachersSubjects" ("teacherID","subjectID") VALUES(5,4);

INSERT INTO "TeachersSubjects" ("teacherID","subjectID") VALUES(6,3);

INSERT INTO "TeachersSubjects" ("teacherID","subjectID") VALUES(11,6);
INSERT INTO "TeachersSubjects" ("teacherID","subjectID") VALUES(11,7);
INSERT INTO "TeachersSubjects" ("teacherID","subjectID") VALUES(11,8);
`;

export const createClassesSubjectsSeeds = `
INSERT INTO "ClassesSubjects" ("classID","subjectID") VALUES(1,1);
INSERT INTO "ClassesSubjects" ("classID","subjectID") VALUES(1,2);
INSERT INTO "ClassesSubjects" ("classID","subjectID") VALUES(1,3);
INSERT INTO "ClassesSubjects" ("classID","subjectID") VALUES(1,4);
INSERT INTO "ClassesSubjects" ("classID","subjectID") VALUES(1,5);
INSERT INTO "ClassesSubjects" ("classID","subjectID") VALUES(1,6);
INSERT INTO "ClassesSubjects" ("classID","subjectID") VALUES(1,7);
INSERT INTO "ClassesSubjects" ("classID","subjectID") VALUES(1,8);
INSERT INTO "ClassesSubjects" ("classID","subjectID") VALUES(1,9);
INSERT INTO "ClassesSubjects" ("classID","subjectID") VALUES(1,10);

INSERT INTO "ClassesSubjects" ("classID","subjectID") VALUES(2,1);
INSERT INTO "ClassesSubjects" ("classID","subjectID") VALUES(2,2);
INSERT INTO "ClassesSubjects" ("classID","subjectID") VALUES(2,3);
INSERT INTO "ClassesSubjects" ("classID","subjectID") VALUES(2,4);
INSERT INTO "ClassesSubjects" ("classID","subjectID") VALUES(2,5);
INSERT INTO "ClassesSubjects" ("classID","subjectID") VALUES(2,6);
INSERT INTO "ClassesSubjects" ("classID","subjectID") VALUES(2,7);
INSERT INTO "ClassesSubjects" ("classID","subjectID") VALUES(2,8);
INSERT INTO "ClassesSubjects" ("classID","subjectID") VALUES(2,9);
INSERT INTO "ClassesSubjects" ("classID","subjectID") VALUES(2,10);

`;
