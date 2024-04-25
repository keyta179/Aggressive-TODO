// App.js
import React, { useState, useEffect } from 'react';
<<<<<<< HEAD
import './style/App.css';
import TodoItem from './components/TodoItem';
import { Tabs } from './components/CreateTab';

=======
import './App.css';
import TodoItem from './TodoItem';
import { Tabs } from './CreateTab';
import Favorite from './Favorite';
>>>>>>> 34b74d1ce516413e733d43da8dc38c16be0a524a
function App() {
  const [todo, setTodo] = useState({
    title: '',
    contents: '',
    date: '',
    duration: '',
    position: { x: 0, y: 0 }
  });
  const [todos, setTodos] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [favoriteTodos, setFavoriteTodos] = useState([]);
  // ローカルストレージから todos を取得してセットする関数
  const loadTodosFromLocalStorage = () => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  };

  // ローカルストレージに todos を保存する関数
  const saveTodosToLocalStorage = (todos) => {
    localStorage.setItem('todos', JSON.stringify(todos));
  };
  const addFavoriteTodo = (favoriteTodo) => {
    setFavoriteTodos([...favoriteTodos, favoriteTodo]);
  };
  useEffect(() => {
    loadTodosFromLocalStorage(); // コンポーネントがマウントされたときにローカルストレージから読み込み
  }, []);

  useEffect(() => {
    saveTodosToLocalStorage(todos); // todos が変更されるたびにローカルストレージに保存
  }, [todos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo(prevTodo => ({
      ...prevTodo,
      [name]: value
    }));
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (!todo.title) return;
    setTodos([...todos, todo]);
    setTodo({
      title: '',
      contents: '',
      date: '',
      duration: '',
      position: { x: 0, y: 0 }
    });
  };

  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  const clearTodos = () => {
    setTodos([]);
  };


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="App">
      <h1>ToDo List</h1>

      <Tabs onChange={(tab) => console.log(tab)} />

      <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
        {/* メニューの中身 */}
        <button type="button" className={"toggle-button"} onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </button>
        
        {/* ここにメニューの内容を追加 */}
        <form onSubmit={addTodo}>
          <input value={todo.title} type="text" name="title" onChange={handleChange} placeholder="Title" />
          <input value={todo.contents} type="text" name="contents" onChange={handleChange} placeholder="Contents" />
          <input value={todo.date} type="datetime-local" name="date" onChange={handleChange} />
          <input value={todo.duration} type='time' name="duration" onChange={handleChange} />
          <button type="submit">Add ToDo</button>
          {/* <button type="button" onClick={clearTodos}>Clear All ToDos</button> */}
        </form>
        {favoriteTodos.length > 0 && (
        <Favorite favoriteTodos={favoriteTodos} /> 
      )}
      </div>
      

      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          index={index}
          todo={todo}
          todos={todos}
          setTodos={setTodos}
          onDelete={() => deleteTodo(index)}
          onAddFavorite={() => addFavoriteTodo(todo)}
        />
      ))}
    </div> 

  );
}

export default App;
