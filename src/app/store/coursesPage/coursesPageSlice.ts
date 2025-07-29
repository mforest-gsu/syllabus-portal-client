import { createSlice } from "@reduxjs/toolkit";
import initialState from "app/store/coursesPage/initialState";
import setFilter from "app/store/coursesPage/setFilter";
import openModal from "app/store/coursesPage/openModal";
import setCourseSections from "app/store/coursesPage/setCourseSections";

export const coursesPageSlice = createSlice({
  name: "coursesPage",
  initialState,
  reducers: {
    setFilter,
    openModal,
    setCourseSections,
  },
});

export default coursesPageSlice;
