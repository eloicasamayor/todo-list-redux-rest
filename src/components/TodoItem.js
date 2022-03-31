import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ListItemText from "@mui/material/ListItemText";
import ImageIcon from "@mui/icons-material/Image";
import { useRef, useState } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import TextField from "@mui/material/TextField";
import CancelIcon from "@mui/icons-material/Cancel";
import CheckIcon from "@mui/icons-material/Check";

export const ENDPOINT = "https://tc-todo-2022.herokuapp.com/todos";
export function TodoItem({ todo, onTodoUpdated, onTodoDeleted, filters }) {
  const [editing, setEditing] = useState(false);
  let titleInputRef = useRef();
  let detailsInputRef = useRef();

  const highlightText = (text) => {
    let highlight = filters.searchquery;
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    let partsToCompare = [...parts];
    if (!filters.casesensitive) {
      partsToCompare = parts.map((p) => p.toLowerCase());
      highlight = highlight.toLowerCase();
    }
    return (
      <p>
        {partsToCompare.map((part, i) =>
          part === highlight ? <mark>{parts[i]}</mark> : parts[i]
        )}
      </p>
    );
  };
  return (
    <ListItem>
      {!editing ? (
        <ListItemText
          className={todo.completed ? "completed" : "pending"}
          primary={
            filters.searchquery !== "" ? highlightText(todo.title) : todo.title
          }
          secondary={
            filters.searchquery !== ""
              ? highlightText(todo.details)
              : todo.details
          }
          onClick={() => {
            onTodoUpdated({ ...todo, completed: !todo.completed });
          }}
        />
      ) : (
        <ListItemText>
          <TextField
            label="todo title"
            type="text"
            variant="filled"
            size="small"
            defaultValue={todo.title}
            inputRef={titleInputRef}
          />

          <TextField
            label="todo details"
            type="text"
            variant="filled"
            size="small"
            defaultValue={todo.details}
            inputRef={detailsInputRef}
          />
        </ListItemText>
      )}

      {!editing ? (
        <>
          <Tooltip title="Edit">
            <IconButton
              onClick={() => {
                setEditing((e) => true);
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton onClick={() => onTodoDeleted(todo)}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip
            title={todo.completed ? "Mark as uncompleted" : "Mark as completed"}
          >
            <IconButton
              onClick={() => {
                onTodoUpdated({ ...todo, completed: !todo.completed });
              }}
            >
              {todo.completed ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon />}
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <>
          <Tooltip title="Cancel">
            <IconButton
              variant="outlined"
              onClick={() => {
                setEditing((e) => false);
              }}
            >
              <CancelIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Confirm">
            <IconButton
              variant="outlined"
              onClick={() => {
                onTodoUpdated({
                  ...todo,
                  title: titleInputRef.current.value,
                  details: detailsInputRef.current.value,
                });
                setEditing((e) => false);
              }}
            >
              <CheckIcon />
            </IconButton>
          </Tooltip>
        </>
      )}
    </ListItem>
  );
}
