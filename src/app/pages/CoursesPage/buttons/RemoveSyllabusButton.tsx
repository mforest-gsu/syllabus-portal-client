import { useState } from "react";
import ClearIcon from "@mui/icons-material/Clear";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import * as api from "app/api";
import Button from "app/components/Button";
import { useAppDispatch, useAppSelector, coursesPageStore } from "app/store";
import type { CourseSection } from "app/types";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";

export function RemoveSyllabusButton() {
  const { loading, disabled, error, onClick, handleClose } = useRemoveSyllabusButton();

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        color="default"
        startIcon={loading ? <PendingOutlinedIcon /> : <ClearIcon color={!disabled ? "error" : undefined} />}
        onClick={onClick}
        disableRipple={true}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        sx={{ textTransform: "none" }}
        className="removeSyllabusButton"
      >
        {loading ? "Removing..." : "Remove Syllabus"}
      </Button>
      <Dialog open={error} onClose={handleClose}>
        <DialogTitle>An error occurred</DialogTitle>
        <DialogContent>
          <DialogContentText>
            An error occurred while attempting to remove the syllabus from the selected course. If this error continues,
            please contact support.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

function useRemoveSyllabusButton() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const rows = useAppSelector((state) => state.coursesPage.courseSections.rows);
  const rowSelectionModel = useAppSelector((state) => state.coursesPage.courseSections.rowSelectionModel);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const courseSectionIndex: number = rows.findIndex((value) => value.id === rowSelectionModel[0]);
  const courseSection: CourseSection | null = courseSectionIndex > -1 ? (rows[courseSectionIndex] ?? null) : null;
  const disabled = courseSection === null || courseSection.syllabusUrl === null;

  const onClick = async () => {
    if (loading || disabled || courseSection === null) {
      return;
    }
  
    const buttonElement = document.activeElement as HTMLElement; // Get the currently focused element
    buttonElement.blur(); // Remove focus from the button
  
    setLoading(true);

    const response = await api.removeSyllabus({
      auth,
      id: courseSection.id,
    });

    if (response.error) {
      setError(true);
    } else if (response.result) {
      const newRows = [...rows];
      newRows[courseSectionIndex] = response.result;
      dispatch(
        coursesPageStore.setCourseSections({
          rows: newRows,
        })
      );
    }

    setLoading(false);
  };

  const handleClose = () => {
    setError(false);
  };

  return {
    loading,
    disabled,
    error,
    onClick,
    handleClose,
  };
}
