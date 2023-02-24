import connection from './config/db.config';
import server from './server'
const port = process.env.PORT;

(async () => {
  await connection.sync();
  const app = server.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
})()
