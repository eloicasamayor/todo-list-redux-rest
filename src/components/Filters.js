import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Check } from "@mui/icons-material";
export function Filters({
  onSearch,
  searchInputRef,
  filters,
  caseSensitiveCheckbox,
  onCaseSensitiveChanged,
  seeUncompletedTodosCheckbox,
  onSeeUncompletedChanged,
  seeCompletedTodosCheckbox,
  onSeeCompletedChanged,
}) {
  return (
    <>
      <h2>Filter todos</h2>
      <form onSubmit={onSearch}>
        <TextField
          type="text"
          inputRef={searchInputRef}
          onChange={onSearch}
          placeholder="search todos"
        />
        {filters.searchquery !== "" && (
          <>
            <Button
              type="button"
              variant="contained"
              onClick={() => {
                searchInputRef.current.value = "";
                onSearch();
              }}
              title="clear search"
            >
              X
            </Button>
            <label>
              <input
                type="checkbox"
                defaultChecked={filters.casesensitive}
                value="aA"
                title="case sensitive?"
                ref={caseSensitiveCheckbox}
                onChange={(e) => onCaseSensitiveChanged(e)}
              />
              aA
            </label>
          </>
        )}
        <label>
          <Checkbox
            defaultChecked={filters.seeUncompleted}
            value="only uncompleted todos"
            ref={seeUncompletedTodosCheckbox}
            onChange={(e) => onSeeUncompletedChanged(e)}
          />
          See uncompleted todos
        </label>
        <label>
          <Checkbox
            defaultChecked={filters.seeCompleted}
            value="only uncompleted todos"
            inputRef={seeCompletedTodosCheckbox}
            onChange={(e) => onSeeCompletedChanged(e)}
          />
          See completed todos
        </label>
      </form>
    </>
  );
}
