import VisibilityIcon from "@mui/icons-material/Visibility";
import Button from "app/components/Button";
import { useAppSelector } from "app/store";
import type { CourseSection } from "app/types";
import type { CSSProperties } from "react";

export function DownloadSyllabusButton(props: { style?: CSSProperties }) {
  const rows = useAppSelector((state) => state.coursesPage.courseSections.rows);
  const rowSelectionModel = useAppSelector((state) => state.coursesPage.courseSections.rowSelectionModel);
  const courseSection: CourseSection | null = rows.find((value) => value.id === rowSelectionModel[0]) ?? null;
  const disabled = courseSection === null || courseSection.syllabusUrl === null;

  return (
    <Button
      variant="outlined"
      color="default"
      startIcon={<VisibilityIcon />}
      href={courseSection?.syllabusUrl ?? "#empty"}
      target={!disabled ? "_blank" : undefined}
      disableRipple={true}
      disabled={disabled}
      aria-disabled={disabled}
      style={props.style}
      sx={{ textTransform: "none" }}
    >
      View Syllabus
    </Button>
  );
}
