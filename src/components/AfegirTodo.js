import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { InputBase } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";

import AddCircleIcon from "@mui/icons-material/AddCircle";
import { TextField } from "@mui/material";
import { useRef, useState } from "react";
export function AfegirTodo({ onAddTodo }) {
  const [newTodoTitle, setNewTodoTitle] = useState("");
  const titleInputRef = useRef();
  const detailsInputRef = useRef();
  const checkTodoTitle = (e) => {
    setNewTodoTitle(e.target.value);
  };
  return (
    <>
      {/* <h2>New todo</h2> */}
      <Paper
        style={{ padding: 10, marginTop: 20 }}
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          const title = titleInputRef.current.value;
          const details = detailsInputRef.current.value;
          titleInputRef.current.value = "";
          detailsInputRef.current.value = "";
          //postNewTodo(title).then((json) => onTodoAdded(json));
          onAddTodo({ title, details });
          setNewTodoTitle((t) => "");
        }}
      >
        <h2 style={{ margin: "4px 0px" }}>Add new todo</h2>

        <InputBase
          type="text"
          placeholder="New todo title"
          inputRef={titleInputRef}
          onChange={(e) => checkTodoTitle(e)}
        ></InputBase>
        <InputBase placeholder="new todo details" inputRef={detailsInputRef} />
        {newTodoTitle !== "" && (
          <Button type="submit" variant="contained" value="add">
            Add
          </Button>
        )}
      </Paper>
    </>
  );
}
