import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-hot-toast";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (newContact, { rejectWithValue }) => {
    try {
      const response = await axios.post("/contacts", newContact);
      toast.success(`Contact "${newContact.name}" added successfully!`);
      return response.data;
    } catch (error) {
      toast.error(`Failed to add contact "${newContact.name}"`);
      return rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (contactId, { rejectWithValue, getState }) => {
    try {
      const { contacts } = getState();
      const contactToDelete = contacts.items.find(
        (contact) => contact.id === contactId
      );

      if (!contactToDelete) {
        throw new Error("Contact not found");
      }

      await axios.delete(`/contacts/${contactId}`);
      toast.success(
        `Contact "${contactToDelete.name}" has been deleted successfully!`
      );
      return contactId;
    } catch (error) {
      const contactName =
        getState().contacts.items.find((contact) => contact.id === contactId)
          ?.name || "";

      toast.error(`Failed to delete contact "${contactName}"`);
      return rejectWithValue(error.message);
    }
  }
);

export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async ({ id, updatedData }, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/contacts/${id}`, updatedData);
      toast.success(`Contact "${updatedData.name}" updated successfully!`);
      return response.data;
    } catch (error) {
      toast.error(`Failed to update contact "${updatedData.name}"`);
      return rejectWithValue(error.message);
    }
  }
);
