import { useRef, useState } from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import TextField from "@mui/material/TextField";
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
    <Card>
      <li className={todo.completed ? "completed" : "pending"}>
        {!editing ? (
          <span
            onClick={() => {
              onTodoUpdated({ ...todo, completed: !todo.completed });
            }}
          >
            {filters.searchquery !== "" ? (
              <>
                {highlightText(todo.title)}
                {highlightText(todo.details)}
              </>
            ) : (
              <>
                <p>{todo.title}</p>
                <p>{todo.details}</p>
              </>
            )}
          </span>
        ) : (
          <>
            <TextField
              type="text"
              defaultValue={todo.title}
              ref={titleInputRef}
            />

            <textarea
              cols={50}
              rows={3}
              defaultValue={todo.details}
              ref={detailsInputRef}
            />
          </>
        )}
      </li>

      {!editing ? (
        <>
          <Button
            variant="outlined"
            onClick={() => {
              setEditing((e) => true);
            }}
          >
            Edit
          </Button>
          <Button variant="outlined" onClick={() => onTodoDeleted(todo)}>
            delete
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              onTodoUpdated({ ...todo, completed: !todo.completed });
            }}
          >
            {todo.completed ? "mark as uncompleted" : "mark as completed"}
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="outlined"
            onClick={() => {
              setEditing((e) => false);
            }}
          >
            cancel
          </Button>
          <Button
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
            confirm edit
          </Button>
        </>
      )}
    </Card>
  );
}
