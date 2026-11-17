
import React, { useState } from "react";
import { useData } from "./Store/Zustand";

function Zustand2() {
    let { users, addUser, deleteUser, editUser } = useData();

    let [name, setName] = useState("");
    let [age, setAge] = useState("");
    let [editId, setEditId] = useState(null);

    // ADD
    function handleAdd(e) {
        e.preventDefault();

        addUser({
            name,
            age: Number(age)
        });

        setName("");
        setAge("");
    }

    // EDIT
    function handleEdit(user) {
        setEditId(user.id);
        setName(user.name);
        setAge(user.age);
    }

    // SAVE
    function handleSave(e) {
        e.preventDefault();

        editUser(editId, {
            name,
            age: Number(age)
        });

        setEditId(null);
        setName("");
        setAge("");
    }

    return (
        <div>
            <h1>Zustand Sync CRUD</h1>

            <form onSubmit={editId ? handleSave : handleAdd}>
                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    placeholder="Age"
                    type="number"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                />

                <button type="submit">
                    {editId ? "Save" : "Add"}
                </button>
            </form>

            {users.map((user) => (
                <div key={user.id}>
                    <h3>{user.name}</h3>
                    <p>{user.age}</p>

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

export default Zustand2;
