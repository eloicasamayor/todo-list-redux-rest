import { TodoItem } from "./TodoItem";
import List from "@mui/material/List";

export function TodoList({ todos, onTodoUpdated, onTodoDeleted, filters }) {
  return (
    <>
      {filters.searchquery !== "" ? (
        <h2>
          Search results for "<mark>{filters.searchquery}</mark>"
        </h2>
      ) : (
        <>
          <h2>All todos</h2>
        </>
      )}
      {filters.onlyUncompleted && <h2>(showing only uncompleted)</h2>}
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        {todos.map((todo, i) => (
          <TodoItem
            key={i}
            todo={todo}
            onTodoUpdated={onTodoUpdated}
            onTodoDeleted={onTodoDeleted}
            filters={filters}
          />
        ))}
      </List>
    </>
  );
}
