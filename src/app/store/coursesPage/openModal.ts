import type { CoursesPageOpenModalPayload, CoursesPageState } from "app/types";

export default function setButton(state: CoursesPageState, action: CoursesPageOpenModalPayload) {
  const { name, value } = action.payload;
  switch (name) {
    case "uploadSyllabusModal":
      if (value.open !== undefined) {
        state.modals.uploadSyllabusModal.open = value.open;
      }
      break;
  }
}
