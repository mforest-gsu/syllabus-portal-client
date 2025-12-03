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
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";

type ModalError = {
  subjectCode: boolean;
  courseNumber: boolean;
  crn: boolean;
  syllabusFile: boolean;
  syllabusFileMessage?: string | undefined;
};

const defaultError = {
  subjectCode: false,
  courseNumber: false,
  crn: false,
  syllabusFile: false,
} as ModalError;

export function UploadSyllabusModal() {
  const dispatch = useAppDispatch();
  const auth = useAppSelector((state) => state.auth);
  const open = useAppSelector((state) => state.coursesPage.modals.uploadSyllabusModal.open);
  const rows = useAppSelector((state) => state.coursesPage.courseSections.rows);
  const rowSelectionModel = useAppSelector((state) => state.coursesPage.courseSections.rowSelectionModel);
  const courseSectionIndex: number = rows.findIndex((value) => value.id === rowSelectionModel[0]);
  const selectedRow = rows[courseSectionIndex];
  const subjectCodes = [...new Set(rows.map((row) => row.subjectCode))];

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(defaultError);
  const [subjectCode, setSubjectCode] = useState(subjectCodes.length === 1 ? subjectCodes[0] : "");

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
      subjectCode: formData.subjectCode.toUpperCase() !== selectedRow.subjectCode.toUpperCase(),
      courseNumber: formData.courseNumber.toUpperCase() !== selectedRow.courseNumber.toUpperCase(),
      crn: formData.crn.toUpperCase() !== selectedRow.crn.toUpperCase(),
      syllabusFile: formData.syllabusFile.size < 1024 || formData.syllabusFile.size > 2097152,
    } as ModalError;

    if (error.subjectCode || error.courseNumber || error.crn || error.syllabusFile) {
      error.syllabusFileMessage = error.syllabusFile ? "File must be less than 2 MB in size" : undefined;
      setError(error);
    } else {
      const response = await api.uploadSyllabus({
        auth,
        id: selectedRow.id,
        syllabus: formData.syllabusFile,
      });

      if (response.error) {
        setError({
          ...error,
          syllabusFile: true
        });
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
      <DialogTitle>
        Upload Syllabus File
        {selectedRow?.courseTitle ? (
          <>
            <br />
            {selectedRow.courseTitle}
          </>
        ) : null}
      </DialogTitle>
      <DialogContent sx={{ paddingBottom: 0 }}>
        <DialogContentText>
          Please verify the subject code, course number, and CRN of the selected course to upload a syllabus. Syllabus
          files must be in PDF format and cannot be more than 2 MB in size.
        </DialogContentText>
        {loading ? <LoadingSpinner /> : null}
        <form onSubmit={handleSubmit}>
          <Grid container spacing={{ xs: 1 }} justifyContent="center">
            <Grid size={{ xs: 12, sm: 4 }}>
              <FormControl fullWidth margin="dense" variant="outlined">
                <InputLabel component="div" sx={{ backgroundColor: "#fff" }}>
                  Subject Code
                </InputLabel>
                <Select
                  required
                  onChange={(event) => setSubjectCode(typeof event.target.value === "string" ? event.target.value : "")}
                  value={subjectCode}
                  margin="dense"
                  name="subjectCode"
                  label="Subject Code"
                  type="text"
                  fullWidth
                  variant="outlined"
                  disabled={loading}
                  error={error.subjectCode}
                  inputProps={{
                    id: "subjectCode",
                    title: "Subject Code",
                    style: {
                      display: "none",
                    },
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {subjectCodes?.map((subjectCode) => (
                    <MenuItem key={`subjectCode_${subjectCode}`} value={subjectCode}>
                      {subjectCode}
                    </MenuItem>
                  ))}
                </Select>
                <FormHelperText>{error.subjectCode ? "Does not match selected course." : "e.g., ENGL"}</FormHelperText>
              </FormControl>
            </Grid>
            <Grid size={{ xs: 12, sm: 4 }}>
              <TextField
                required
                margin="dense"
                id="courseNumber"
                name="courseNumber"
                label="Course Number"
                type="text"
                fullWidth
                variant="outlined"
                disabled={loading}
                error={error.courseNumber}
                helperText={error.courseNumber ? "Does not match selected course." : "e.g., 1101"}
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
                helperText={error.crn ? "Does not match selected course." : "e.g., 20100"}
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
            helperText={error.syllabusFile ? (error.syllabusFileMessage ?? "Unable to upload selected file.") : undefined}
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
