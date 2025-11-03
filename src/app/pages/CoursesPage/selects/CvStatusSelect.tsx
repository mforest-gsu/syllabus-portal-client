import SelectFormControl from "app/components/SelectFormControl";
import { useAppDispatch, useAppSelector, coursesPageStore } from "app/store";

export function CvStatusSelect() {
  const cvStatus = useAppSelector((state) => state.coursesPage.filters.cvStatus);
  const dispatch = useAppDispatch();

  return (
    <SelectFormControl
      label="CV Status"
      items={cvStatus.items}
      onChange={(event) => {
        dispatch(
          coursesPageStore.setFilter({
            name: "cvStatus",
            value: {
              defaultValue: event.target.value,
            },
          })
        );
      }}
      defaultValue={cvStatus.defaultValue}
    />
  );
}
