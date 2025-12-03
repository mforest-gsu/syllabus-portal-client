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

type ModalError = {
  instructorEmail: boolean;
  cvFile: boolean;
  cvFileMessage?: string | undefined;
};

const defaultError = { instructorEmail: false, cvFile: false } as ModalError;

export function UploadCvModal() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const open = useAppSelector((state) => state.coursesPage.modals.uploadCvModal.open);
  const rows = useAppSelector((state) => state.coursesPage.courseSections.rows);
  const rowSelectionModel = useAppSelector((state) => state.coursesPage.courseSections.rowSelectionModel);
  const sortModel = useAppSelector((state) => state.coursesPage.courseSections.sortModel);
  const courseSectionIndex: number = rows.findIndex((value) => value.id === rowSelectionModel[0]);
  const selectedRow = rows[courseSectionIndex];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(defaultError);

  const handleClose = () => {
    if (!loading) {
      dispatch(coursesPageStore.openModal({ name: "uploadCvModal", value: { open: false } }));
      setError(defaultError);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    if (!selectedRow) {
      return;
    }

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
      instructorEmail: string;
      cvFile: File;
    };
    const error = {
      instructorEmail: formData.instructorEmail.toUpperCase() !== selectedRow.instructorEmail?.toUpperCase(),
      cvFile: formData.cvFile.size < 1024 || formData.cvFile.size > 2097152,
    } as ModalError;

    if (error.instructorEmail || error.cvFile) {
      error.cvFileMessage = error.cvFile ? "File must be less than 2MB in size" : undefined;
      setError(error);
    } else {
      const response = await api.uploadCv({
        auth,
        id: selectedRow.id,
        cv: formData.cvFile,
      });

      if (response.error) {
        setError({
          ...error,
          cvFile: true,
        });
      } else if (response.result) {
        dispatch(coursesPageStore.setCourseSections({ sortModel: [...sortModel] }));
        handleClose();
      }
    }

    setLoading(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Upload CV File</DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <DialogContentText>
          Please verify the instructor email to upload a CV. CV files must be in PDF format and cannot be more than 2 MB
          in size.
        </DialogContentText>
        {loading ? <LoadingSpinner /> : null}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={{ xs: 1 }} justifyContent="center">
            <Grid size={{ xs: 12 }}>
              <TextField
                required
                margin="dense"
                id="instructorEmail"
                name="instructorEmail"
                label="Instructor Email"
                type="email"
                fullWidth
                variant="outlined"
                disabled={loading}
                error={error.instructorEmail}
                helperText={error.instructorEmail ? "Does not match selected course." : undefined}
              />
            </Grid>
          </Grid>
          <TextField
            required
            margin="dense"
            id="cvFile"
            name="cvFile"
            label=""
            type="file"
            fullWidth
            variant="outlined"
            disabled={loading}
            error={error.cvFile}
            helperText={error.cvFile ? (error.cvFileMessage ?? "Unable to upload selected file.") : undefined}
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
