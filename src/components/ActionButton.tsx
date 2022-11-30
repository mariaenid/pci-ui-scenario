interface IActionBar {
  clearState: (arg: boolean) => void;
}

const styles = {
  padding: "15px",
};

export const ActionBar = ({ clearState }: IActionBar) => {
  return (
    <div style={styles}>
      <button onClick={() => clearState(true)}>
        Clear Filters and Sorters
      </button>
    </div>
  );
};
