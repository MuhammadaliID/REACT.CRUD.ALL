
import { createSlice, createAsyncThunk, configureStore } from "@reduxjs/toolkit";
import axios from "axios";

const API = "https://to-dos-api.softclub.tj/api/to-dos";

// GET
export const getUsers = createAsyncThunk(
    "users/getUsers",
    async () => {
        let { data } = await axios.get(API);
        return data.data;
    }
);

// DELETE
export const deleteUser = createAsyncThunk(
    "users/deleteUser",
    async (id) => {
        await axios.delete(`${API}?id=${id}`);
        return id;
    }
);

// ADD
export const addUser = createAsyncThunk(
    "users/addUser",
    async (user) => {
        await axios.post(API, {
            name: user.name,
            description: user.description,
            isCompleted: false
        });

        return user;
    }
);

// EDIT
export const editUser = createAsyncThunk(
    "users/editUser",
    async ({ id, user }) => {
        await axios.put(`${API}?id=${id}`, {
            name: user.name,
            description: user.description,
            isCompleted: user.isCompleted
        });

        return { id, user };
    }
);

// SLICE
const userSlice = createSlice({
    name: "users",

    initialState: {
        data: [],
        loading: false,
        error: null
    },

    reducers: {},

    extraReducers: (builder) => {
        builder

            // GET
            .addCase(getUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(getUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })

            .addCase(getUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })

            // DELETE
            .addCase(deleteUser.fulfilled, (state, action) => {
                state.data = state.data.filter(
                    (user) => user.id !== action.payload
                );
            })

            // ADD
            .addCase(addUser.fulfilled, (state) => {
                
            })

            // EDIT
            .addCase(editUser.fulfilled, (state) => {
                
            });
    }
});

export default userSlice.reducer;

export const store = configureStore({
    reducer: {
        users: userReducer
    }
});
