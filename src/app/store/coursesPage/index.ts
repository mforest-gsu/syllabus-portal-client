import coursesPageSlice from "app/store/coursesPage/coursesPageSlice";

export const { setFilter, openModal, setCourseSections } = coursesPageSlice.actions;
export default coursesPageSlice.reducer;
