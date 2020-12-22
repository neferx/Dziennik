import { dropTables } from './queryFunctions';

(async () => {
  await dropTables();
  //await insertIntoTables();
})();
