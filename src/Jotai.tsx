
import React, { useEffect, useState } from "react";
import { useAtomValue, useSetAtom } from "jotai";

import {
    usersAtom,
    loadingAtom,
    errorAtom,
    getUsersAtom,
    deleteUserAtom,
    addUserAtom,
    editUserAtom
} from "./Store/Jotai";

function Jotai() {
    let users = useAtomValue(usersAtom);
    let loading = useAtomValue(loadingAtom);
    let error = useAtomValue(errorAtom);

    let getUsers = useSetAtom(getUsersAtom);
    let deleteUser = useSetAtom(deleteUserAtom);
    let addUser = useSetAtom(addUserAtom);
    let editUser = useSetAtom(editUserAtom);

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

        let user = users.find((item) => item.id === editId);

        editUser({
            id: editId,
            user: {
                name,
                description,
                isCompleted: user?.isCompleted ?? false
            }
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

export default Jotai;
