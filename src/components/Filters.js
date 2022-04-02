import Paper from "@mui/material/Paper";

import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import CancelIcon from "@mui/icons-material/Cancel";
import FormatSizeIcon from "@mui/icons-material/FormatSize";
import FontDownloadSharpIcon from "@mui/icons-material/FontDownloadSharp";
import FontDownloadOutlinedIcon from "@mui/icons-material/FontDownloadOutlined";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { Check, FormatSize } from "@mui/icons-material";
import { InputBase, Tooltip } from "@mui/material";
import { fontSize } from "@mui/system";
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
      {/* <h2>Filter todos</h2> */}
      <div className="filters-wrapper">
        <div className="search-input-wrapper">
          <InputBase
            fullWidth
            sx={{ p: "10px", fontSize: "1.5rem" }}
            size="medium"
            type="text"
            inputRef={searchInputRef}
            onChange={onSearch}
            placeholder={"search"}
            className="searchInput"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                searchInputRef.current.value = "";
                onSearch();
              }
            }}
          ></InputBase>{" "}
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
              <Tooltip title="case sensitive">
                <Checkbox
                  defaultChecked={filters.casesensitive}
                  value="aA"
                  inputRef={seeUncompletedTodosCheckbox}
                  onChange={(e) => onCaseSensitiveChanged(e)}
                  color="default"
                  icon={<FontDownloadOutlinedIcon />}
                  checkedIcon={<FontDownloadSharpIcon />}
                />
              </Tooltip>
            </>
          )}
        </div>

        <div className="completed-checkoxes-wrapper">
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
