import { useState, type FormEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import * as api from "app/api";
import { useAppDispatch, useAppSelector, coursesPageStore } from "app/store";
import LoadingSpinner from "app/components/LoadingSpinner";

const defaultError = { subjectCode: false, courseNumber: false, crn: false, syllabusFile: false };

export function UploadSyllabusModal() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const open = useAppSelector((state) => state.coursesPage.modals.uploadSyllabusModal.open);
  const rows = useAppSelector((state) => state.coursesPage.courseSections.rows);
  const rowSelectionModel = useAppSelector((state) => state.coursesPage.courseSections.rowSelectionModel);
  const courseSectionIndex: number = rows.findIndex((value) => value.id === rowSelectionModel[0]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(defaultError);

  const handleClose = () => {
    if (!loading) {
      dispatch(coursesPageStore.openModal({ name: "uploadSyllabusModal", value: { open: false } }));
      setError(defaultError);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    const { submitter } = event.nativeEvent as SubmitEvent;
    if (submitter) {
      submitter.blur();
    }

    event.preventDefault();
    if (loading) {
      return;
    }

    setLoading(true);

    const formData = Object.fromEntries(new FormData(event.currentTarget).entries()) as {
      subjectCode: string;
      courseNumber: string;
      crn: string;
      syllabusFile: File;
    };
    const error = {
      subjectCode: formData.subjectCode.toUpperCase() !== rows[courseSectionIndex].subjectCode.toUpperCase(),
      courseNumber: formData.courseNumber.toUpperCase() !== rows[courseSectionIndex].courseNumber.toUpperCase(),
      crn: formData.crn.toUpperCase() !== rows[courseSectionIndex].crn.toUpperCase(),
      syllabusFile: false,
    };

    if (error.subjectCode || error.courseNumber || error.crn) {
      setError(error);
    } else {
      const response = await api.uploadSyllabus({
        auth,
        id: rows[courseSectionIndex].id,
        syllabus: formData.syllabusFile,
      });

      if (response.error) {
        error.syllabusFile = true;
        setError(error);
      } else if (response.result) {
        const newRows = [...rows];
        newRows[courseSectionIndex] = response.result;
        dispatch(
          coursesPageStore.setCourseSections({
            rows: newRows,
          })
        );
        handleClose();
      }
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Upload Syllabus File</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <DialogContentText>
          Please verify the subject code, course number, and CRN to upload a syllabus. Syllabus files must be in PDF
          format and cannot be more than 5 MB in size.
        </DialogContentText>
        {loading ? <LoadingSpinner /> : null}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={{ xs: 1 }} justifyContent="center">
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                required
                margin="dense"
                id="subjectCode"
                name="subjectCode"
                label="Subject"
                type="text"
                fullWidth
                variant="outlined"
                disabled={loading}
                error={error.subjectCode}
                helperText={error.subjectCode ? "Does not match selected course." : undefined}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                required
                margin="dense"
                id="courseNumber"
                name="courseNumber"
                label="Course"
                type="text"
                fullWidth
                variant="outlined"
                disabled={loading}
                error={error.courseNumber}
                helperText={error.courseNumber ? "Does not match selected course." : undefined}
              />
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                required
                margin="dense"
                id="crn"
                name="crn"
                label="CRN"
                type="text"
                fullWidth
                variant="outlined"
                disabled={loading}
                error={error.crn}
                helperText={error.crn ? "Does not match selected course." : undefined}
              />
            </Grid>
          </Grid>
          <TextField
            required
            margin="dense"
            id="syllabusFile"
            name="syllabusFile"
            label=""
            type="file"
            fullWidth
            variant="outlined"
            disabled={loading}
            error={error.syllabusFile}
            helperText={error.syllabusFile ? "Unable to upload selected file." : undefined}
          />
          <DialogActions>
            <Button onClick={handleClose} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              Upload
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
}
