// $ ==================== L I S T ==================== //
import { useState, useEffect } from 'react';
import Item from './Item';
import { v4 } from 'uuid';

export default function List({ todos, fetchData }) {
  console.log('liste props:', todos);

  return (
    <section className='todo-list'>
      <div>
        {todos?.map((todo) => (
          <Item todo={todo} key={todo.id} fetchData={fetchData} />
        ))}
      </div>
      <h4>Aktuelle Features</h4>
      <p>
        // man kann Todos hinzufügen indem man etwas ins Inputfeld schreibt und
        Enter drückt
      </p>
      <p>
        // wenn man auf das Todo klickt, kann man es als erledigt markieren
        (funktioniert bisher leider nur im Front-end)
      </p>
      <p>
        // wenn ein Todo als erledigt markiert ist, erscheint ein Button mit dem
        man es löschen kann
      </p>
    </section>
  );
}
