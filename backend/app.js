import express from 'express';
import cors from 'cors';
import {
  createStorage,
  saveTodo,
  getTodoList,
  deleteTodo,
  findFile,
  editItem,
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

// allgemeine änderungen
app.put('/api/todos', (req, res) => {
  console.log('id:', req.body.id);
  console.log('body:', req.body);
  console.log('done:', req.body.done);
  editItem(req.body)
    .then(() => res.end('item status wurde geändert'))
    .catch((error) => {
      console.log(error);
      res.status(500).end('message');
    });
});

// - setzt automatisch done auf true/false
app.put('/api/todos/done', (req, res) => {
  console.log('body:', req.body);
  req.body.done = !req.body.done;
  editItem(req.body)
    .then(() => res.end('item status wurde geändert'))
    .catch((error) => {
      console.log(error);
      res.status(500).end('item konnte nicht geändert werden');
    });
});

app.listen(PORT, () => console.log('express läuft auf port', PORT));
