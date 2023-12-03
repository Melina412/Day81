import express from 'express';
import cors from 'cors';
import {
  createStorage,
  saveTodo,
  getTodoList,
  deleteTodo,
  findFile,
} from './utils/files.js';

const PORT = 9898;
const app = express();
createStorage();

app.use(
  cors({
    origin: 'http://localhost:5173',
  })
);
app.use(express.json()); // middleware

app.get('/api/todos', (_req, res) => {
  console.log('test');
  getTodoList()
    .then((data) => res.json(data))
    .catch((error) => res.status(500).end('data fetching error', error));
});

app.post('/api/todos', (req, res) => {
  const todo = req.body;
  console.log('so sieht das todo aus:', todo);
  saveTodo(todo);
  res.end();
});

app.delete('/api/todos', (req, res) => {
  const id = req.body.id;
  deleteTodo(id)
    // .then(() => res.json({ message: 'Todo wurde gelöscht' }))
    // ? warum war der res hier json? macht keinen sinn bei delete
    .then(() => res.end('todo wurde gelöscht'))
    .catch((error) => res.status(500).end('fehler beim löschen', error));
});

// app.put('/api/todos', (req, res) => {
//   const id = req.body.id;
//   const done = req.body.done;
//   findFile(id)
//   .then()
// });
// kein Plan wie man done auf true setzen soll

app.listen(PORT, () => console.log('express läuft auf port', PORT));
