import { AfegirTodo } from "./AfegirTodo";
import { useState, useEffect, useRef } from "react";
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
  onlyUncompletedFilter,
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
  const onOnlyUncompletedChanged = (e) => {
    dispatch(onlyUncompletedFilter(e.target.checked));
  };

  const onSearch = (e) => {
    e.preventDefault();
    onFilterTodos(searchInputRef.current.value);
    setSearching(() => searchInputRef.current.value !== "");
  };
  const searchInputRef = useRef();
  const caseSensitiveSearchChechbox = useRef();
  const onlyUncompletedCheckbox = useRef();
  const [searching, setSearching] = useState(false);
  return (
    <div className="App">
      {/*  <button onClick={loadTodos}>Refresh</button> */}
      <aside>
        <Filters
          onSearch={onSearch}
          searchInputRef={searchInputRef}
          searching={searching}
          caseSensitiveSearchChechbox={caseSensitiveSearchChechbox}
          onCaseSensitiveChanged={onCaseSensitiveChanged}
          defaultCaseSensitiveChecked={filters.casesensitive}
          onlyUncompletedCheckbox={onlyUncompletedCheckbox}
          onOnlyUncompletedChanged={onOnlyUncompletedChanged}
        />
        <AfegirTodo onAddTodo={onAddTodo} />
      </aside>
      <main>
        <TodoList
          todos={todos}
          onTodoUpdated={onTodoUpdated}
          onTodoDeleted={onTodoDeleted}
          searching={searching}
          filters={filters}
        />
      </main>
    </div>
  );
}