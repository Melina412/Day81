// $ ==================== L I S T ==================== //
import Item from './Item';

export default function List({ todos, fetchData }) {
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
        // wenn man auf das Todo klickt, kann man es als erledigt markieren.
        Funktioniert jetzt auch im Backend :)
      </p>
      <p>
        // wenn ein Todo als erledigt markiert ist, erscheint ein Button mit dem
        man es löschen kann
      </p>
      <p>
        // advanced input: man kann vor dem Erstellen eines Todos die Priorität
        und eine Kategorie festlegen. Diese Eigenschaften werden dann zum
        Todo-item hinzugefügt und im Backend gespeichert
      </p>
    </section>
  );
}
