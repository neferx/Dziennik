import {
  createTables,
  alterTables,
  createUserSeed,
  createParentSeed,
  createTeacherSeed,
  createClassSeed,
  createStudentSeed,
} from './queryFunctions';

(async () => {
  await createTables();
  await alterTables();
  await createUserSeed();
  await createParentSeed();
  await createTeacherSeed();
  await createClassSeed();
  await createStudentSeed();
})();
