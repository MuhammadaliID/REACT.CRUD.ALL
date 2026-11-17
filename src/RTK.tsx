
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    getUsers,
    deleteUser,
    addUser,
    editUser
} from "./Store/Redux";

function RTK() {
    let dispatch = useDispatch();

    let { data, loading, error } = useSelector(
        (state) => state.users
    );

    let [name, setName] = useState("");
    let [description, setDescription] = useState("");
    let [editId, setEditId] = useState(null);

    useEffect(() => {
        dispatch(getUsers());
    }, [dispatch]);

    // ADD
    function handleAdd(e) {
        e.preventDefault();

        dispatch(addUser({ name, description }));

        setName("");
        setDescription("");
    }

    // EDIT
    function handleEdit(user) {
        setEditId(user.id);
        setName(user.name);
        setDescription(user.description);
    }

    // SAVE
    function handleSave(e) {
        e.preventDefault();

        let user = data.find((item) => item.id === editId);

        dispatch(editUser({
            id: editId,
            user: {
                name,
                description,
                isCompleted: user?.isCompleted ?? false
            }
        }));

        setEditId(null);
        setName("");
        setDescription("");
    }

    return (
        <div>
            <h1>My To-Do List</h1>

            <form onSubmit={editId ? handleSave : handleAdd}>
                <input
                    placeholder="Task name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit">
                    {editId ? "Save" : "Add"}
                </button>

                {editId && (
                    <button
                        type="button"
                        onClick={() => {
                            setEditId(null);
                            setName("");
                            setDescription("");
                        }}
                    >
                        Cancel
                    </button>
                )}
            </form>

            {loading && <h2>Loading...</h2>}

            {error && <h2>{error}</h2>}

            {data.map((user) => (
                <div key={user.id}>
                    <h3>{user.name}</h3>
                    <p>{user.description}</p>

                    <button onClick={() => dispatch(deleteUser(user.id))}>
                        Delete
                    </button>

                    <button onClick={() => handleEdit(user)}>
                        Edit
                    </button>
                </div>
            ))}
        </div>
    );
}

export default RTK;
