import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { FilterPanelTrigger, GridFilterListIcon, Toolbar, ToolbarButton } from "@mui/x-data-grid-premium";
import { DownloadSyllabusButton, RemoveSyllabusButton, UploadSyllabusButton } from "../buttons";

export default function CourseSectionsGridToolbar() {
  return (
    <Toolbar>
      <Stack direction="row" sx={{ width: "100%", gap: 0.5, flex: 1 }}>
        <FilterPanelTrigger
          render={
            <ToolbarButton
              render={
                <Button
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
        <DownloadSyllabusButton style={{ marginRight: "auto" }} />
        <UploadSyllabusButton />
        <RemoveSyllabusButton />
      </Stack>
    </Toolbar>
  );
}
