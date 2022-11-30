import "ag-grid-enterprise";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

import { useCallback, useEffect, useMemo, useRef } from "react";
import { ColDef } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

import { formatDate, getDateFilterParams } from "../helpers";

import data from "../near-earth-asteroids.json";

export interface IDataGrid {
  isClearState: boolean;
  setClearState: (arg: boolean) => void;
}

export const DataGrid = ({ isClearState, setClearState }: IDataGrid) => {
  const gridStyle = useMemo(() => ({ height: "93%", width: "100%" }), []);
  const gridRef = useRef<AgGridReact>(null);

  const defaultColDef = {
    sortable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  const columnDefs: ColDef[] = [
    {
      field: "designation",
      headerName: "Designation",
      filter: "agTextColumnFilter",
    },
    {
      field: "discovery_date",
      headerName: "Discovery Date",
      filterParams: getDateFilterParams(),
      filter: "agDateColumnFilter",
      valueGetter: (val) => formatDate(val.data.discovery_date),
    },
    { field: "h_mag", headerName: "H (mag)", filter: "agNumberColumnFilter" },
    {
      field: "moid_au",
      headerName: "MOID (au)",
      filter: "agNumberColumnFilter",
    },
    { field: "q_au_1", headerName: "q (au)", filter: "agNumberColumnFilter" },
    { field: "q_au_2", headerName: "Q (au)", filter: "agNumberColumnFilter" },
    {
      field: "period_yr",
      headerName: "Period (yr)",
      filter: "agNumberColumnFilter",
    },
    {
      field: "i_deg",
      headerName: "Inclination (deg)",
      filter: "agNumberColumnFilter",
    },
    {
      field: "pha",
      headerName: "Potentially Hazardous",
      filter: "agTextColumnFilter",
      valueGetter: (a) => {
        const pha = a.data.pha;
        if (pha === "n/a") {
          return "";
        }
        return pha === "N" ? "No" : "Yes";
      },
    },
    {
      field: "orbit_class",
      headerName: "Orbit Class",
      enableRowGroup: true,
      filter: "agTextColumnFilter",
    },
  ];

  const resetFilters = useCallback(() => {
    if (gridRef.current) {
      const { api } = gridRef.current;
      api!.setFilterModel(null);
    }
  }, []);

  const resetState = useCallback(() => {
    gridRef.current!.columnApi.resetColumnState();
  }, []);

  useEffect(() => {
    if (isClearState === true) {
      resetState();
      resetFilters();
      setClearState(false);
    }
  }, [isClearState, resetState, resetFilters, setClearState]);

  return (
    <div style={gridStyle}>
      <AgGridReact
        ref={gridRef}
        className="ag-theme-alpine"
        defaultColDef={defaultColDef}
        rowData={data}
        columnDefs={columnDefs}
        rowGroupPanelShow={"always"}
        enableRangeSelection={true}
      />
    </div>
  );
};
