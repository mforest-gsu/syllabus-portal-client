import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import PageLayout from "app/components/PageLayout";
import Typography from "@mui/material/Typography";

import {
  FilterSelect,
  SyllabusRequiredSelect,
  SyllabusStatusSelect,
  CvStatusSelect,
} from "app/pages/CoursesPage/selects";
import { CourseSectionsGrid } from "app/pages/CoursesPage/grids";
import { UploadCvModal, UploadSyllabusModal } from "app/pages/CoursesPage/modals";

export default function CoursesPage() {
  return (
    <PageLayout>
      <Paper elevation={2} sx={{ padding: "16px 16px" }}>
        <Grid container spacing={2} justifyContent="center">
          <Grid size={{ xs: 12 }}>
            <Typography component="h2" variant="h5" style={{ textAlign: "center" }}>
              Course Syllabus Portal
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 4, xl: 2}}>
            <FilterSelect name="termCode" label="Term *" />
          </Grid>
          <Grid size={{ xs: 12, sm: 4, xl: 2 }}>
            <FilterSelect name="collegeCode" label="College *" />
          </Grid>
          <Grid size={{ xs: 12, sm: 4, xl: 2 }}>
            <FilterSelect name="departmentCode" label="Department *" />
          </Grid>
          <Grid size={{ xs: 12, sm: 4, xl: 2 }}>
            <SyllabusRequiredSelect />
          </Grid>
          <Grid size={{ xs: 12, sm: 4, xl: 2 }}>
            <SyllabusStatusSelect />
          </Grid>
          <Grid size={{ xs: 12, sm: 4, xl: 2 }}>
            <CvStatusSelect />
          </Grid>
          <Grid size={12}>
            <CourseSectionsGrid />
          </Grid>
        </Grid>
      </Paper>
      <UploadSyllabusModal />
      <UploadCvModal />
    </PageLayout>
  );
}
