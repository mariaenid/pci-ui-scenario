import { ActionBar } from "./ActionButton";

interface IMenuActionBar {
  clearState: (arg: boolean) => void;
}

export const MenuActionBar = ({ clearState }: IMenuActionBar) => {
  return (
    <h1 style={{ display: "flex", alignItems: "center" }}>
      Near-Earth Object Overview
      {<ActionBar clearState={clearState} />}
    </h1>
  );
};
