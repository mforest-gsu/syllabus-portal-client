import SelectFormControl from "app/components/SelectFormControl";
import { useAppDispatch, useAppSelector, coursesPageStore } from "app/store";

export function SyllabusRequiredSelect() {
  const syllabusIsRequired = useAppSelector((state) => state.coursesPage.filters.syllabusIsRequired);
  const dispatch = useAppDispatch();

  return (
    <SelectFormControl
      label="Syllabus Required?"
      items={syllabusIsRequired.items}
      onChange={(event) => {
        dispatch(
          coursesPageStore.setFilter({
            name: "syllabusIsRequired",
            value: {
              defaultValue: event.target.value,
            },
          })
        );
      }}
      defaultValue={syllabusIsRequired.defaultValue}
    />
  );
}
