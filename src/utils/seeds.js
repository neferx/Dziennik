export const createUserSeeds = `
INSERT INTO "User" ("email", "password", "name", "lastname", "role") VALUES('lukasztyrala@gmail.com', '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=', 'Łukasz', 'Tyrała', 'STUDENT');
INSERT INTO "User" ("email", "password", "name", "lastname", "role") VALUES('mateuszbarwicki@gmail.com', '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=', 'Mateusz', 'Barwicki', 'STUDENT');
INSERT INTO "User" ("email", "password", "name", "lastname", "role") VALUES('dennisbuk@gmail.com', '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=', 'Dennis', 'Buk', 'STUDENT');
INSERT INTO "User" ("email", "password", "name", "lastname", "role") VALUES('bartoszchlad@gmail.com', '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=', 'Bartosz', 'Chlad', 'ADMIN');
INSERT INTO "User" ("email", "password", "name", "lastname", "role") VALUES('piotrekduleba@gmail.com', '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=', 'Piotr', 'Dulęba', 'TEACHER');
INSERT INTO "User" ("email", "password", "name", "lastname", "role") VALUES('jakubgieron@gmail.com', '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=', 'Jakub', 'Gieron', 'TEACHER');
INSERT INTO "User" ("email", "password", "name", "lastname", "role") VALUES('balbinabarwicka@gmail.com', '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=', 'Balbina', 'Barwicka', 'PARENT');
INSERT INTO "User" ("email", "password", "name", "lastname", "role") VALUES('mariolabuk@gmail.com', '47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=', 'Mariola', 'BUK', 'PARENT');
`;

export const createParentSeeds = `
INSERT INTO "Parent" ("idParent", "telephoneNumber") VALUES(7, 605705805);
INSERT INTO "Parent" ("idParent", "telephoneNumber") VALUES(8, 123456789);
INSERT INTO "Parent" ("idParent", "telephoneNumber") VALUES(6, 456123789);
`;

export const createTeacherSeeds = `
INSERT INTO "Teacher" ("idTeacher") VALUES(5);
INSERT INTO "Teacher" ("idTeacher") VALUES(6);
`;

export const createClassSeeds = `
INSERT INTO "Class" ("idClass","teacherID","className") VALUES(1,6,'Ia');
`;

export const createStudentSeeds = `
INSERT INTO "Student" ("idStudent","PESEL","city","street","buildingNumber","classRegisterNumber","ParentID","classID") VALUES(1,12345678911,'Boronów','Leśna',7,1,6,1);
INSERT INTO "Student" ("idStudent","PESEL","city","street","buildingNumber","classRegisterNumber","ParentID","classID") VALUES(2,12345678912,'Boronów','Pocztowa',14,2,7,1);
INSERT INTO "Student" ("idStudent","PESEL","city","street","buildingNumber","classRegisterNumber","ParentID","classID") VALUES(3,12345678913,'Przybynów','Kamienna',189,3,8,1);
`;
