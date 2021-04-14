import {
  alterTables,
  createUserSeed,
  createParentSeed,
  createTeacherSeed,
  createClassSeed,
  createStudentSeed,
  createSubjectSeed,
  createTeachersSubjectsSeed,
  createClassesSubjectsSeed,
} from './queryFunctions';

(async () => {
  await alterTables();
  console.log('Altered tables');
  await createUserSeed();
  console.log('Created user Seed');
  await createParentSeed();
  console.log('Created parent Seed');
  await createTeacherSeed();
  console.log('Created teacher Seed');
  await createClassSeed();
  console.log('Created class Seed');
  await createStudentSeed();
  console.log('Created student Seed');
  await createSubjectSeed();
  console.log('Created subject Seed');
  await createTeachersSubjectsSeed();
  console.log('Created teachers subjects Seed');
  await createClassesSubjectsSeed();
  console.log('Created classes subjects Seed');
})();
