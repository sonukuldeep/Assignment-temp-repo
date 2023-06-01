import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: IContactState[] = []

const contactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        addContact(state, action: PayloadAction<IContactState>) {
            state.push(action.payload)
        },
        updateContact(state, action: PayloadAction<IContactState>) {
            return state.map(contact => {
                if (contact.id === action.payload.id) {
                    return { ...contact, ...action.payload }
                }
                return contact
            })
        },
        deleteContact(state, action: PayloadAction<string>) {
            return state.filter(contact => contact.id !== action.payload)
        },
    },
});

export const { addContact, updateContact, deleteContact } = contactSlice.actions;
export default contactSlice.reducer;