import { dropTables } from './queryFunctions';

(async () => {
  await dropTables();
  console.log("Dropped tables");
  //await insertIntoTables();
})();
