import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {

    const [todos, setTodos] = useState([]);
    const [todoEditing, setTodoEditing] = useState(null);

    useEffect(() => {
        // Retrieving todos from local storage
        const json = localStorage.getItem("todos");
        const loadedTodos = JSON.parse(json); 

        if (loadedTodos) {
            setTodos(loadedTodos);
        }

    }, []);

    useEffect(() => { 
        if (todos.length > 0) {
             // Storing todos to local storage
            const json = JSON.stringify(todos);
            localStorage.setItem("todos", json);
        }
        // Dependecy is todos 
    }, [todos]);

    // Add the handlesubmit code here
    function handleSubmit(e) {
        // Prevent default action of the form
        e.preventDefault();

        let todo = document.getElementById("todoAdd").value

        // Attribute for new todo 
        const newTodo = {
            id: new Date().getTime(),
            text: todo.trim(),
            completed: false,
        };

        if (newTodo.text.length > 0) {
            setTodos(
                [...todos].concat(newTodo));
        }
        else {
            alert("Enter Valid Task");
        }
        document.getElementById('todoAdd').value = "";

    }

    // Add the deleteToDo code here
    function deleteTodo(id) {

        if ([...todos].filter((todo) => todo.id === id)) {
            // Search todos and return values that is not equal to the id passed
            let updatedTodos = [...todos].filter((todo) => todo.id !== id);
            setTodos(updatedTodos);
            alert("Task Deleted Successfull");
            return;
        }

        alert("This Task Does Not Exist");
    }

    // Add the toggleComplete code here
    function toggleComplete(id) {
        let updatedTodos = [...todos].map((todo) => {

            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    // Add the submitEdits code here
    function submitEdits(newtodo) {
        const updatedTodos = [...todos].map((todo) => {
        
        if (todo.id === newtodo.id){
            todo.text = document.getElementById(newtodo.id).value;
        }
        return todo;
        });

        setTodos(updatedTodos);
        setTodoEditing(null);
    }


    return (
        <div id="todo-list">
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>
                <input
                type="text"
                id = 'todoAdd'
                />
                <button type="submit">Add Todo</button>
            </form>
            {todos.map((todo) => (
                <div key={todo.id} className="todo">
                    <div className="todo-text">
                        {/* Add checkbox for toggle complete */}
                        <input 
                            type="checbox" 
                            id="complete" 
                            checked={todo.complete} 
                            onChange={() => toggleComplete(todo.id)} 
                        />
                        {/* if it is edit mode, display input box, else display text */}
                        {todo.id === todoEditing ?
                            (<input
                                type="text"
                                id={todo.id}
                                defaultValue={todo.text}
                            />) :
                            (<div>{todo.text}</div>)
                        }
                    </div>
                    <div className="todo-action">
                        {/* if it is edit mode, allow submit edit, else allow edit */}
                        {todo.id === todoEditing ?
                        (
                            <button onClick={() => submitEdits(todo)}>Submit Edit</button>
                        ) :
                        (
                            <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
                        )}
                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </div>
                </div>
             ))}  {/* End todo mapping */}
        </div>
    );
};
export default App;
