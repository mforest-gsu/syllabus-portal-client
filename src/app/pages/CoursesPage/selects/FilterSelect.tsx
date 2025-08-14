import SelectFormControl from "app/components/SelectFormControl";
import useSelect from "./useFilterSelect";
import { useEffect } from "react";

export function FilterSelect(props: { name: "termCode" | "collegeCode" | "departmentCode"; label: string }) {
  const { setDefaultValue, error, defaultValue, items } = useSelect(props.name);
  useEffect(() => {
    if (items !== null && items.length === 1 && defaultValue === "") {
      setDefaultValue(items[0].value);
    }
  }, [defaultValue, items, setDefaultValue]);

  if (error === "notLoggedIn") {
    window.location.replace(`${import.meta.env.VITE_API_URL}/auth/login`);
    return null;
  } else if (error !== null) {
    throw new Error(error);
  }

  return (
    <SelectFormControl
      label={props.label}
      items={items}
      onChange={(event) => setDefaultValue(event.target.value)}
      defaultValue={defaultValue}
    />
  );
}
