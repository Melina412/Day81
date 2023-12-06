// $ ==================== I T E M ==================== //
import { useState } from 'react';

export default function Item({ todo, fetchData }) {
  // --- D O N E ---
  const [done, setDone] = useState(todo.done);

  const changeDone = () => {
    fetch(`http://localhost:9898/api/todos/done`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: todo.id, done: todo.done }),
    })
      .then((response) =>
        response.ok
          ? console.log('done status changed')
          : console.log('done change ERROR')
      )
      // ? wie kann man sich den response/preview von dem delete in der konsole anzeigen lassen
      .then(() => fetchData())
      .catch((error) => console.error(error));
  };

  const handleDone = () => {
    changeDone();
    todo.done = !todo.done;
    setDone(todo.done);
    console.log({ done });
  };

  // --- D E L E T E ---

  const deleteTodo = () => {
    fetch(`http://localhost:9898/api/todos`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: todo.id }),
    })
      // .then((response) => response.json()) // ? warum hatte ich hier json
      .then((response) =>
        response.ok ? console.log('delete ok') : console.log('delete not ok')
      )
      // ? wie kann man sich den response/preview von dem delete in der konsole anzeigen lassen
      .then(() => fetchData())
      .catch((error) => console.error(error));
  };

  const handleDelete = () => {
    deleteTodo();
  };

  return (
    <section onClick={handleDone} className={'todo-item ' + todo.prio}>
      <div className='category'>😫</div>
      {/* es gibt noch keine Kategorien */}
      <div className={'item-container '}>
        <p className={'task-name ' + (todo.done ? 'line-through' : '')}>
          {todo.task}
        </p>
        {/* <p>{todo.id}</p> */}
      </div>
      {done && (
        <button onClick={handleDelete} className='delete-button'>
          X
        </button>
      )}
    </section>
  );
}
