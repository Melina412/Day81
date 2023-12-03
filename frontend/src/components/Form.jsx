// $ ==================== F O R M ==================== //
import { useState, useRef } from 'react';

export default function Form({ fetchData }) {
  const inputRef = useRef();

  const addTodo = () => {
    const newTodo = {
      task: inputRef.current.value,
      done: false,
    };

    fetch('http://localhost:9898/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newTodo),
    })
      .then((response) => {
        if (response.ok) {
          // hier MUSS man erst prüfen ob res ok ist bevor man fetchData() aufruft,
          // mit .then(() => fetchData()) bekommt man immer einen leeren response und
          // "SyntaxError: Unexpected end of JSON input" 😩
          fetchData();
          inputRef.current.value = '';
        }
      })
      .catch((error) => console.error('Error adding todo:', error));
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <>
      <section className='todo-form'>
        <input
          ref={inputRef}
          onKeyDown={handleKeyDown}
          type='text'
          placeholder='enter you task...'
        />
      </section>
    </>
  );
}
