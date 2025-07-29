import { DataGridPremium } from "@mui/x-data-grid-premium";
import debounce from "@mui/utils/debounce";
import { Navigate } from "@tanstack/react-router";
import { coursesPageStore } from "app/store";
import type { GridFilterModel } from "app/types";

import { columns, columnVisibilityModel } from "./CourseSectionsGridColumns";
import { slotProps } from "./CourseSectionsGridSlotProps";
import CourseSectionsGridToolbar from "./CourseSectionsGridToolbar";
import useCourseSections from "./useCourseSectionsGrid";

export function CourseSectionsGrid() {
  const { status, rowCount, rows, filterModel, paginationModel, rowSelectionModel, sortModel, dispatch } =
    useCourseSections();

  if (status === "notLoggedIn") {
    return <Navigate to="/login" />;
  } else if (status === "error") {
    throw new Error(status);
  }

  return (
    <div style={{ height: 417, width: "100%" }}>
      <DataGridPremium
        // columns
        columns={columns}
        disableColumnSelector={true}
        columnVisibilityModel={columnVisibilityModel}
        // data
        loading={status === "loading"}
        rowCount={rowCount}
        rows={rows}
        // selection
        cellSelection={false}
        disableMultipleRowSelection={true}
        checkboxSelection={true}
        disableRowSelectionOnClick={false}
        keepNonExistentRowsSelected={false}
        rowSelectionModel={rowSelectionModel}
        onRowSelectionModelChange={(rowSelectionModel) => {
          dispatch(
            coursesPageStore.setCourseSections({
              rowSelectionModel: Array.from(rowSelectionModel.ids.values()),
            })
          );
        }}
        // pagination
        pagination
        paginationMode="server"
        paginationModel={paginationModel}
        onPaginationModelChange={(p) => {
          if (status === "complete") {
            dispatch(coursesPageStore.setCourseSections({ paginationModel: p }));
          }
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        // filtering
        filterMode="server"
        filterModel={filterModel}
        onFilterModelChange={debounce<(model: GridFilterModel) => void>(({ items }) => {
          dispatch(
            coursesPageStore.setCourseSections({
              filterModel: { items },
            })
          );
        }, 200)}
        // sorting
        sortModel={sortModel}
        onSortModelChange={(s) => {
          dispatch(coursesPageStore.setCourseSections({ sortModel: s }));
        }}
        // toolbar
        showToolbar={true}
        slots={{ toolbar: CourseSectionsGridToolbar }}
        slotProps={slotProps}
        disablePivoting={true}
      />
    </div>
  );
}
