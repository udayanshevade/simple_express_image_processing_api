import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const defaultPort = process.env.ENV === 'test' ? 9999 : 3000;
const port = process.env.SERVER_PORT || defaultPort;

app.get('/healthcheck', (_, res) => {
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Server started at localhost:${port}`);
});

export default app;
