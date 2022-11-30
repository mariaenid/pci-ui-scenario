import { useState } from "react";
import { MenuActionBar } from "./components/MenuActionBar";
import { DataGrid } from "./components/DataGrid";

const NeoGrid = (): JSX.Element => {
  const [isClearState, setClearState] = useState<boolean>(false);

  return (
    <div className="ag-theme-alpine" style={{ height: 900, width: 1920 }}>
      <MenuActionBar clearState={setClearState} />
      <DataGrid isClearState={isClearState} setClearState={setClearState} />
    </div>
  );
};

export default NeoGrid;
