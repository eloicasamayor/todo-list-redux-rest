import Paper from "@mui/material/Paper";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import CancelIcon from "@mui/icons-material/Cancel";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Check } from "@mui/icons-material";
import { InputBase, Tooltip } from "@mui/material";
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
    <Paper
      className="filters-form"
      onSubmit={onSearch}
      component="form"
      sx={{
        p: "5px 0px",
        display: "flex",
        alignItems: "center",
        width: "100%",
      }}
    >
      <h2>Filter todos</h2>
      <div className="filters-wrapper">
        <div className="search-input-wrapper">
          <IconButton
            sx={{ p: "10px" }}
            aria-label="toggle password visibility"
            onClick={() => {}}
            onMouseDown={() => {}}
            edge="end"
          >
            <SearchIcon />
          </IconButton>

          {/* <form onSubmit={onSearch}> */}
          <InputBase
            fullWidth
            sx={{ p: "10px" }}
            type="text"
            inputRef={searchInputRef}
            onChange={onSearch}
            placeholder="search todos"
          ></InputBase>
        </div>

        {filters.searchquery !== "" && (
          <>
            <Tooltip title="clear search">
              <IconButton
                type="button"
                variant="contained"
                onClick={() => {
                  searchInputRef.current.value = "";
                  onSearch();
                }}
              >
                <CancelIcon />
              </IconButton>
            </Tooltip>
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
        <div>
          <Tooltip title="See uncompleted todos">
            <label className="filterCheckboxLabel">
              <Checkbox
                defaultChecked={filters.seeUncompleted}
                value="see uncompleted todos"
                ref={seeUncompletedTodosCheckbox}
                onChange={(e) => onSeeUncompletedChanged(e)}
                color="default"
              />
              uncompleted
            </label>
          </Tooltip>
          <Tooltip title="See completed todos">
            <label className="filterCheckboxLabel">
              <Checkbox
                defaultChecked={filters.seeCompleted}
                value="see completed todos"
                inputRef={seeCompletedTodosCheckbox}
                onChange={(e) => onSeeCompletedChanged(e)}
                color="default"
              />
              completed
            </label>
          </Tooltip>
        </div>
      </div>
    </Paper>
  );
}
