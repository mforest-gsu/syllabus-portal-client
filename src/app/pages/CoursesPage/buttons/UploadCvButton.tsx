import AddIcon from "@mui/icons-material/Add";
import Button from "app/components/Button";
import { useAppDispatch, useAppSelector, coursesPageStore } from "app/store";
import type { CourseSection } from "app/types";

export function UploadCvButton() {
  const dispatch = useAppDispatch();
  const rows = useAppSelector((state) => state.coursesPage.courseSections.rows);
  const rowSelectionModel = useAppSelector((state) => state.coursesPage.courseSections.rowSelectionModel);
  const courseSection: CourseSection | null = rows.find((value) => value.id === rowSelectionModel[0]) ?? null;
  const disabled = courseSection === null || courseSection.instructorId === "STAFF";
  const onClick = () => {
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur(); // Remove focus from the button
    dispatch(coursesPageStore.openModal({ name: "uploadCvModal", value: { open: true } }));
  };

  return (
    <Button
      size="small"
      variant="outlined"
      color="default"
      startIcon={<AddIcon color={!disabled ? "primary" : undefined} />}
      onClick={onClick}
      disableRipple={true}
      disabled={disabled}
      aria-disabled={disabled}
      sx={{ textTransform: "none" }}
      className="uploadCvButton"
    >
      Add CV
    </Button>
  );
}
