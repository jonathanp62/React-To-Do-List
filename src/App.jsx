{/*
MIT License

Copyright (c) 2024 Jonathan M. Parker

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/}

import {useEffect, useState} from 'react';

import {Footer} from "./Footer.jsx";
import {Header} from "./Header.jsx";
import {NewToDoForm} from "./NewToDoForm.jsx";
import {TodoList} from "./ToDoList.jsx";

import packageJson from "../package.json";

import './styles.css';

export default function App() {
    const [todos, setTodos] = useState(() => {
        const localValue = localStorage.getItem("TODOS");

        if (localValue == null)
            return [];

        return JSON.parse(localValue);
    });

    // Executed after the component is rendered

    useEffect(() => {
        localStorage.setItem("TODOS", JSON.stringify(todos));
    });

    function addToDoItem(newToDoItem) {
        setTodos(currentTodos => {
            // Return the current list with a new todo added

            return [
                ...currentTodos,    // Destructure into distinct variables
                { id: crypto.randomUUID(), newToDoItem, completed: false },
            ];
        });
    }

    function deleteToDoItem(id) {
        setTodos(currentTodos => {
            // The filter keeps items that do not match the id

            return currentTodos.filter(todo => todo.id !== id)
        });
    }

    function toggleToDoCompleted(id, completed) {
        setTodos(currentTodos => {
            return currentTodos.map(todo => {
                if (todo.id === id) {
                    return { ...todo, completed }
                }

                return todo
            })
        })
    }

    return (
        <>
            <NewToDoForm onSubmit={addToDoItem} />
            <Header />
            <TodoList
                todos={todos}
                toggleToDoCompleted={toggleToDoCompleted}
                deleteToDo={deleteToDoItem}
            />
            <Footer version={packageJson.version} />
        </>
    );
}
