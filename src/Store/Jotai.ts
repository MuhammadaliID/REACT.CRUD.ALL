
import { atom } from "jotai";
import axios from "axios";

const API = "https://to-dos-api.softclub.tj/api/to-dos";


export const usersAtom = atom([]);

// Loading
export const loadingAtom = atom(false);

// Error
export const errorAtom = atom(null);

// GET
export const getUsersAtom = atom(
    null,
    async (get, set) => {
        set(loadingAtom, true);
        set(errorAtom, null);

        try {
            let { data } = await axios.get(API);

            set(usersAtom, data.data);
        } catch (error) {
            set(errorAtom, error.message);
        } finally {
            set(loadingAtom, false);
        }
    }
);

// DELETE
export const deleteUserAtom = atom(
    null,
    async (get, set, id) => {
        try {
            await axios.delete(`${API}?id=${id}`);

            set(usersAtom, get(usersAtom).filter(
                (user) => user.id !== id
            ));
        } catch (error) {
            set(errorAtom, error.message);
        }
    }
);

// ADD
export const addUserAtom = atom(
    null,
    async (get, set, user) => {
        try {
            await axios.post(API, {
                name: user.name,
                description: user.description,
                isCompleted: false
            });

            set(getUsersAtom);
        } catch (error) {
            set(errorAtom, error.message);
        }
    }
);

// EDIT
export const editUserAtom = atom(
    null,
    async (get, set, { id, user }) => {
        try {
            await axios.put(`${API}?id=${id}`, {
                name: user.name,
                description: user.description,
                isCompleted: user.isCompleted
            });

            set(getUsersAtom);
        } catch (error) {
            set(errorAtom, error.message);
        }
    }
);
