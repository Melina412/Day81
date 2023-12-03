import fs from 'fs/promises';
import fssync from 'fs';
import { v4 } from 'uuid';

export function createStorage() {
  fs.access('./storage/')
    .then(() => console.log('storage ist bereits vorhanden'))
    .catch(() => {
      fs.mkdir('./storage');
      console.log('storage wurde erstellt');
    });
}

export function getTodoList() {
  return fs.readdir('./storage').then((files) => {
    const fileArray = [];
    for (const file of files) {
      fileArray.push(JSON.parse(fssync.readFileSync('./storage/' + file)));
    }
    console.log({ fileArray });
    return fileArray;
  });
}

export function saveTodo(todo = { task: inputTask, done: false }) {
  todo.id = v4();
  fs.writeFile('./storage/' + todo.id, JSON.stringify(todo));
}

export function deleteTodo(id) {
  return fs.rm('./storage/' + id);
}

export function findFile(id) {
  const filePath = `./storage/${id}`;
  return fs
    .readFile(filePath, 'utf8')
    .then((data) => JSON.parse(data))
    .catch((error) => console.log('datei nicht gefunden', error));
}
