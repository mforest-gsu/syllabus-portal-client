import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import PageLayout from "app/components/PageLayout";
import Typography from "@mui/material/Typography";

import { FilterSelect, SyllabusStatusSelect } from "app/pages/CoursesPage/selects";
import { CourseSectionsGrid } from "app/pages/CoursesPage/grids";
import { UploadSyllabusModal } from "app/pages/CoursesPage/modals";

export default function CoursesPage() {
  return (
    <PageLayout>
      <Paper elevation={2} sx={{ padding: "12px 16px" }}>
        <Grid container spacing={{ xs: 12, md: 3 }} justifyContent="center">
          <Grid size={{ xs: 12 }}>
            <Typography component="h2" variant="h5" style={{ textAlign: "center" }}>
              Course Syllabus Portal
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <FilterSelect name="termCode" label="Term *" />
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <FilterSelect name="collegeCode" label="College *" />
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <FilterSelect name="departmentCode" label="Department *" />
          </Grid>
          <Grid size={{ xs: 12, sm: 3 }}>
            <SyllabusStatusSelect />
          </Grid>
          <Grid size={12}>
            <CourseSectionsGrid />
          </Grid>
        </Grid>
      </Paper>
      <UploadSyllabusModal />
    </PageLayout>
  );
}
