import { GridLogicOperator } from "@mui/x-data-grid-premium";
import type { FilterColumnsArgs, GetColumnForNewFilterArgs, GridSlotsComponentsProps } from "app/types";

export const slotProps: GridSlotsComponentsProps = {
  filterPanel: {
    logicOperators: [GridLogicOperator.And],
    filterFormProps: {
      filterColumns,
    },
    getColumnForNewFilter,
  },
  toolbar: {
    showQuickFilter: false,
    csvOptions: {
      disableToolbarButton: true,
    },
    excelOptions: {
      disableToolbarButton: true,
    },
    printOptions: {
      disableToolbarButton: true,
    },
  },
};

function filterColumns({ field, columns, currentFilters }: FilterColumnsArgs) {
  // remove already filtered fields from list of columns
  const filteredFields = currentFilters?.map((item) => item.field);
  return columns
    .filter((colDef) => colDef.filterable && (colDef.field === field || !filteredFields.includes(colDef.field)))
    .map((column) => column.field);
}

function getColumnForNewFilter({ currentFilters, columns }: GetColumnForNewFilterArgs) {
  const filteredFields = currentFilters?.map(({ field }) => field);
  const columnForNewFilter = columns
    .filter((colDef) => colDef.filterable && !filteredFields.includes(colDef.field))
    .find((colDef) => colDef.filterOperators?.length);
  return columnForNewFilter?.field ?? null;
}
