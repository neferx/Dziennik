import {
  createTables,
} from './queryFunctions';

(async () => {
  await createTables();
  console.log("Created tables");
})();
