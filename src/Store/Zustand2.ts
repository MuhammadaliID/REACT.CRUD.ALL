
import { create } from "zustand";

export const useData = create((set) => ({
    users: [
        { id: 1, name: "Muhammadali", age: 19 },
        { id: 2, name: "Munishvar", age: 20 },
        { id: 3, name: "Ibrohim", age: 21 }
    ],

    // GET
    getUsers: () => {},

    // ADD
    addUser: (user) => set((state) => ({
        users: [
            ...state.users,
            { id: Date.now(), ...user }
        ]
    })),

    // DELETE
    deleteUser: (id) => set((state) => ({
        users: state.users.filter((user) => user.id !== id)
    })),

    // EDIT
    editUser: (id, updatedUser) => set((state) => ({
        users: state.users.map((user) =>
            user.id === id
                ? { ...user, ...updatedUser }
                : user
        )
    }))
}));
