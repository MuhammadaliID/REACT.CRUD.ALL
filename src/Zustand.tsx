
import React, { useEffect, useState } from "react";
import { useData } from "./Store/Zustand";

function Zustand() {
    let { users, loading, error, getUsers, deleteUser, addUser, editUser } = useData();

    let [name, setName] = useState("");
    let [description, setDescription] = useState("");
    let [editId, setEditId] = useState(null);

    useEffect(() => {
        getUsers();
    }, []);

    // ADD
    function handleAdd(e) {
        e.preventDefault();

        addUser({ name, description });

        setName("");
        setDescription("");
    }

    // EDIT
    function handleEdit(user) {
        setEditId(user.id);
        setName(user.name);
        setDescription(user.description);
    }

    function handleSave(e) {
        e.preventDefault();

        editUser(editId, {
            name,
            description,
            isCompleted: users.find((user) => user.id === editId)?.isCompleted ?? false
        });

        setEditId(null);
        setName("");
        setDescription("");
    }

    return (
        <div>
            <h1>My To-Do List</h1>

            <form onSubmit={editId ? handleSave : handleAdd}>
                <input
                    type="text"
                    placeholder="Task name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
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

            {users.map((user) => (
                <div key={user.id}>
                    <h3>{user.name}</h3>
                    <p>{user.description}</p>

                    <button onClick={() => deleteUser(user.id)}>
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

export default Zustand;
