import SelectFormControl from "app/components/SelectFormControl";
import { useAppDispatch, useAppSelector, coursesPageStore } from "app/store";

export function SyllabusStatusSelect() {
  const syllabusStatus = useAppSelector((state) => state.coursesPage.filters.syllabusStatus);
  const dispatch = useAppDispatch();

  return (
    <SelectFormControl
      label="Syllabus Status"
      items={syllabusStatus.items}
      onChange={(event) => {
        dispatch(
          coursesPageStore.setFilter({
            name: "syllabusStatus",
            value: {
              defaultValue: event.target.value,
            },
          })
        );
      }}
      defaultValue={syllabusStatus.defaultValue}
    />
  );
}
