import { DataGridPremium } from "@mui/x-data-grid-premium";
import debounce from "@mui/utils/debounce";
import { coursesPageStore } from "app/store";
import type { GridFilterModel } from "app/types";

import { columns, columnVisibilityModel, columnGroupingModel } from "./CourseSectionsGridColumns";
import { slotProps } from "./CourseSectionsGridSlotProps";
import CourseSectionsGridToolbar from "./CourseSectionsGridToolbar";
import useCourseSections from "./useCourseSectionsGrid";

export function CourseSectionsGrid() {
  const { status, rowCount, rows, filterModel, paginationModel, rowSelectionModel, sortModel, dispatch } =
    useCourseSections();

  if (status === "notLoggedIn") {
    window.location.replace(`${import.meta.env.VITE_API_URL}/auth/login`);
    return null;
  } else if (status === "error") {
    throw new Error(status);
  }

  return (
    <div style={{ minHeight: 398, height: "49.01vh", width: "100%" }}>
      <DataGridPremium
        // columns
        columns={columns}
        disableColumnPinning={true}
        disableColumnSelector={true}
        columnVisibilityModel={columnVisibilityModel}
        columnGroupHeaderHeight={36}
        columnGroupingModel={columnGroupingModel}
        // data
        loading={status === "loading"}
        rowCount={rowCount}
        rows={rows}
        rowHeight={40}
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
        pageSizeOptions={[5, 10, 25, 50, 100]}
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
