import { AfegirTodo } from "./AfegirTodo";
import { useEffect, useRef } from "react";
import { TodoList } from "./TodoList";
import {
  requestUpdateTodo,
  requestAddTodo,
  requestTodos,
  requestDeleteTodo,
  selectTodos,
  selectFilters,
} from "../redux/todos";
import { useDispatch, useSelector } from "react-redux";
import {
  caseSensitiveSearchFilter,
  searchQueryFilter,
  seeUncompletedFilter,
  seeCompletedFilter,
} from "../redux/filters/actions";
import { Filters } from "./Filters";

export function Todos() {
  const todos = useSelector(selectTodos);
  const filters = useSelector(selectFilters);

  const dispatch = useDispatch();
  useEffect(() => {
    const intervalID = setInterval(() => loadTodos(), 60000);
    return () => clearInterval(intervalID);
  }, []);

  const loadTodos = () => dispatch(requestTodos());
  const onAddTodo = (todo) => dispatch(requestAddTodo(todo));
  const onTodoUpdated = (updatedTodo) =>
    dispatch(requestUpdateTodo(updatedTodo));
  const onTodoDeleted = (todo) => dispatch(requestDeleteTodo(todo));
  const onFilterTodos = (query) => dispatch(searchQueryFilter(query));
  const onCaseSensitiveChanged = (e) => {
    dispatch(caseSensitiveSearchFilter(e.target.checked));
  };
  const onSeeUncompletedChanged = (e) => {
    dispatch(seeUncompletedFilter(e.target.checked));
  };
  const onSeeCompletedChanged = (e) => {
    dispatch(seeCompletedFilter(e.target.checked));
  };

  const onSearch = (e) => {
    onFilterTodos(searchInputRef.current.value);
  };
  const searchInputRef = useRef();
  const caseSensitiveSearchChechbox = useRef();
  const seeUncompletedCheckbox = useRef();
  const seeCompletedCheckbox = useRef();
  return (
    <div className="App">
      {/*  <button onClick={loadTodos}>Refresh</button> */}
      <header>
        <h1>Todo list</h1>
      </header>
      <aside>
        <Filters
          filters={filters}
          onSearch={onSearch}
          searchInputRef={searchInputRef}
          caseSensitiveSearchChechbox={caseSensitiveSearchChechbox}
          onCaseSensitiveChanged={onCaseSensitiveChanged}
          seeUncompletedCheckbox={seeUncompletedCheckbox}
          onSeeUncompletedChanged={onSeeUncompletedChanged}
          seeCompletedCheckbox={seeCompletedCheckbox}
          onSeeCompletedChanged={onSeeCompletedChanged}
        />
        <AfegirTodo onAddTodo={onAddTodo} />
      </aside>
      <main>
        <TodoList
          todos={todos}
          onTodoUpdated={onTodoUpdated}
          onTodoDeleted={onTodoDeleted}
          filters={filters}
        />
      </main>
      <footer>
        <p>Això és el footer</p>
      </footer>
    </div>
  );
}
