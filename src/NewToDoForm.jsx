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

import {useState} from "react";

import PropTypes from 'prop-types';

export function NewToDoForm({onSubmit}) {
    const [newToDoItem, setNewToDoItem] = useState("");

    function handleSubmit(e) {
        e.preventDefault();     // Prevents immediate submission; allows for validation

        if (newToDoItem === "")
            return;

        onSubmit(newToDoItem);  // Passed by the App component

        setNewToDoItem("");
    }

    // The onChange listener invokes the lambda with a ChangeEvent<HTMLInputElement>

    return (
        <form className="new-item-form" onSubmit={handleSubmit}>
            <div className="form-row">
                <label htmlFor="item">New To-Do Item</label>
                <input
                    value={newToDoItem}
                    onChange={e => setNewToDoItem(e.target.value)}
                    type="text"
                    id="item"
                />
            </div>
            <button className="btn">Add New To-Do Item</button>
        </form>
    )
}

NewToDoForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};