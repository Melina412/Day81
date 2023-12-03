import { useState, useEffect } from 'react';
import './App.scss';
import Form from './components/Form';
import List from './components/List';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);
  // useEffect ausgelagern sonst geht Weitergabe der Funktion nicht

  const fetchData = () => {
    fetch('http://localhost:9898/api/todos')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return setTodos(data);
      })
      .catch((error) => console.error(error));
  };

  console.log({ todos });

  return (
    <>
      <h1>Todo-App</h1>
      <Form fetchData={fetchData} />
      <List todos={todos} fetchData={fetchData} />
    </>
  );
}

export default App;
