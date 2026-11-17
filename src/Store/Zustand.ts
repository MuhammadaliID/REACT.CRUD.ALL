
import { create } from "zustand";
import axios from "axios";

const API = "https://to-dos-api.softclub.tj/api/to-dos";

export const useData = create((set, get) => ({
    users: [],
    loading: false,
    error: null,

    // GET
    getUsers: async () => {
        set({ loading: true, error: null });

        try {
            let { data } = await axios.get(API);

            set({
                users: data.data,
                loading: false
            });
        } catch (error) {
            set({
                error: error.message,
                loading: false
            });
        }
    },

    // DELETE
    deleteUser: async (id) => {
        try {
            await axios.delete(`${API}?id=${id}`);

            set({
                users: get().users.filter((user) => user.id !== id)
            });
        } catch (error) {
            set({ error: error.message });
        }
    },

    // ADD
    addUser: async (user) => {
        try {
            await axios.post(API, {
                name: user.name,
                description: user.description,
                isCompleted: false
            });

            get().getUsers();
        } catch (error) {
            set({ error: error.message });
        }
    },

    // EDIT
    editUser: async (id, user) => {
        try {
            await axios.put(`${API}?id=${id}`, {
                name: user.name,
                description: user.description,
                isCompleted: user.isCompleted
            });

            get().getUsers();
        } catch (error) {
            set({ error: error.message });
        }
    }
}));
