import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import DefaultImg from "../../assets/person/newUser.jpg";

type Person = {
  _id: string;
  username: string;
  profilePicture: string;
  followers: [];
};

type People = {
  people: Person[];
  person: Person;
};

const initialState: People = {
  people: [],
  person: {
    _id: "",
    username: "",
    profilePicture: "",
    followers: [],
  },
};

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    loadPeople(state, action: PayloadAction<Person[]>) {
      const people = action.payload;

      state.people = people.map((person) => {
        return {
          ...person,
          profilePicture: person.profilePicture || DefaultImg,
        };
      });
    },
    removePerson(state, action: PayloadAction<{ _id: string }>) {
      state.people = state.people.filter(
        (person) => person._id !== action.payload._id
      );
    },
    selectPerson(state, action: PayloadAction<{ _id: string }>) {
      state.person._id = action.payload._id;
    },
  },
});

export const peopleActions = peopleSlice.actions;
export default peopleSlice.reducer;
