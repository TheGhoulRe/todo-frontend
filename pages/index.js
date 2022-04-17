import { useState, useEffect } from 'react';
import TodoItem from '../components/TodoItem';


export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    update();
  }, []);

  function update() {
    fetch(`${process.env.NEXT_PUBLIC_BACKEND}api/todos`)
      .then(res => res.json())
      .then(todo => {
        setTodos(todo.data);
      })
  }

  function addTodo(e) {
    e.preventDefault();
    let item = newTodo;
    let body = {
      data: {
        item
      }
    };
  
    fetch(`${process.env.NEXT_PUBLIC_BACKEND}api/todos`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(() => {
        setNewTodo("");
        update();
      })
  }

  return (
    <div>
      <main>

        <form onSubmit={addTodo}>
          <input type="text" placeholder="Enter new todo" value={newTodo} onChange={e => setNewTodo(e.currentTarget.value) }/>
          <button type="submit">Add todo</button>
        </form>

        <div>
          {
            todos.map((todo, i) => {
              return <TodoItem todo={todo} key={i} update={update} />
            })
          }
        </div>

      </main>
    </div>
  )
}
