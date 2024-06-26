
import React, { useState, useEffect, useCallback } from 'react';
import Favorite from './Favorite';
import NarrowDown from './NarrowDown';
import appearSound from './../sound/bird_using_taskAppeared.mp3';
import openMenuSound from './../sound/umbrellaOpen_using_menuOpen.mp3';
import closeMenuSound from './../sound/umbrellaClose_using_menuClose.mp3';


export const Sidebar = ({ todo, todos, favoriteTodos, setFavoriteTodos, setTodo, setTodos, openSettingsPopup, selectedCategory, setSelectedCategory }) => {

  // Menu bar が開いているかどうか
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const addFavoriteTodo = useCallback((newFavoriteTodo) => {
    setFavoriteTodos(prevFavoriteTodos => [...prevFavoriteTodos, newFavoriteTodo]);
  }, []);

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prevState => !prevState);
    const audio = new Audio(isMenuOpen ? closeMenuSound : openMenuSound);
    audio.play();
  }, [isMenuOpen]);

  const addTodo = useCallback((e) => {
    e.preventDefault();
    if (!todo.title || !todo.date) return;
    setTodos(prevTodos => [...prevTodos, todo]);
    setTodo({
      title: '',
      category: '',
      contents: '',
      date: '',
      duration: '',
      position: { x: 0, y: 0 }
    });
    const audio = new Audio(appearSound);
    audio.play();
  }, [todo]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setTodo(prevTodo => ({
      ...prevTodo,
      [name]: value
    }));
  }, []);


  return (
    <div className={`menu ${isMenuOpen ? 'open' : ''}`}>
      <button type="button" className={"setting-button"} onClick={openSettingsPopup}>
        Settings
      </button>
      <NarrowDown todos={todos} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} onChange={(category) => setSelectedCategory(category)} /> {/* NarrowDown コンポーネントで選択されたカテゴリを渡す */}

      <hr></hr>
      <button type="button" className={"toggle-button"} onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </button>
      <form onSubmit={addTodo}>
        <input value={todo.title} type="text" name="title" onChange={handleChange} placeholder="Title" />
        <input value={todo.category} type="text" name="category" onChange={handleChange} placeholder="Category" />
        <textarea value={todo.contents} type="text" name="contents" onChange={handleChange} placeholder="Contents" />
        <input value={todo.date} type="datetime-local" name="date" onChange={handleChange} />
        <input value={todo.duration} type='time' name="duration" onChange={handleChange} />
        <button type="submit">Add ToDo</button>
      </form>

      <Favorite
        favoriteTodos={favoriteTodos}
        setFavoriteTodos={setFavoriteTodos}
        isMenuOpen={isMenuOpen}
        onDragStart={(event, todo) => {
          event.dataTransfer.setData('text/plain', JSON.stringify(todo));
          toggleMenu();
        }}
      />


    </div>
  );
}