// $ ==================== F O R M ==================== //
import { useState, useRef } from 'react';

export default function Form({ fetchData }) {
  const [advanced, setAdvanced] = useState(false);
  const [prio, setPrio] = useState('none');
  const [category, setCategory] = useState('');

  const inputRef = useRef();
  const prioRef = useRef();
  const catRef = useRef();

  console.log({ prio });
  console.log({ category });

  const addTodo = () => {
    const newTodo = {
      task: inputRef.current.value,
      done: false,
      prio: prioRef.current.value,
      category: catRef.current.value,
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

  function sortPriority(event) {
    if (event.target.checked) {
      //   console.log("prio test");
      props.setToDos((prev) => {
        return [...prev.sort((a, b) => a.prio.localeCompare(b.prio))];
      });
    }
  }

  return (
    <>
      <section className='todo-form'>
        <input
          ref={inputRef}
          onKeyDown={handleKeyDown}
          type='text'
          placeholder='enter you task...'
        />

        {/* ------------------ advanced input options ------------------- */}

        <input
          type='checkbox'
          name='advanced'
          id='advanced'
          checked={advanced}
          onChange={() => setAdvanced(!advanced)}
        />
        <label htmlFor='advanced'>advanced input</label>
        {advanced && (
          <article className='advanced-options'>
            <h2>advanced task options</h2>

            {/* ------------------ priority ------------------- */}

            <label htmlFor='prio'>select priority</label>
            <select ref={prioRef} name='prio' id='prio'>
              <option value='none'>none</option>
              <option value='low'>low</option>
              <option value='medium'>medium</option>
              <option value='high'>high</option>
            </select>

            <input type='checkbox' name='sort' id='sort' />
            {/* onClick={sortPriority} */}
            <label htmlFor='sort'>sort by priority</label>
            <br />

            {/* ------------------ category ------------------- */}

            <label htmlFor='cat'>select category</label>
            <select ref={catRef} name='cat' id='cat'>
              <option value=''>none</option>
              <option value='🌚'>private</option>
              <option value='👩🏻‍💻'>job</option>
              <option value='📚'>studies</option>
              <option value='🧹'>chores</option>
              <option value='🛒'>shopping</option>
              <option value='👩‍👧‍👦'>family</option>
            </select>
          </article>
        )}
      </section>
    </>
  );
}
