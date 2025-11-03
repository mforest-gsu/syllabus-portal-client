import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { FilterPanelTrigger, GridFilterListIcon, Toolbar, ToolbarButton } from "@mui/x-data-grid-premium";
import {
  DownloadSyllabusButton,
  DownloadCvButton,
  RemoveCvButton,
  RemoveSyllabusButton,
  UploadCvButton,
  UploadSyllabusButton,
} from "../buttons";

export default function CourseSectionsGridToolbar() {
  return (
    <Toolbar>
      <Stack direction="row" sx={{ width: "100%", gap: 0.5, flex: 1 }}>
        <FilterPanelTrigger
          render={
            <ToolbarButton
              render={
                <Button
                  size="small"
                  variant="outlined"
                  color="default"
                  startIcon={<GridFilterListIcon />}
                  sx={{ textTransform: "none" }}
                >
                  Filters
                </Button>
              }
            />
          }
        />
        <DownloadCvButton />
        <DownloadSyllabusButton style={{ marginRight: "auto" }} />
        <UploadCvButton />
        <RemoveCvButton  />
        <div style={{ margin: "0 10px" }}>&nbsp;</div>
        <UploadSyllabusButton />
        <RemoveSyllabusButton />
      </Stack>
    </Toolbar>
  );
}
