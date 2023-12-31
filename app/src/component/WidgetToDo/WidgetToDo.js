import React, { useEffect, useState } from "react";

const getToDoes = async () => {
  try {
    const res = await fetch("http://localhost:7007/api/v1/todos");
    return res.json();
  } catch (error) {
    console.log(error);
  }
};
// /todos
// /todos/:id
// /todos/:id/toggle-complete
function WidgetToDo() {
  const [toDoes, setToDoes] = useState([]);

  const addTodoHandler = async (e) => {
    if (e.keyCode === 13) {
      try {
        const res = await fetch("http://localhost:7007/api/v1/todos", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: e.target.value,
            description: "",
            checked: false,
          }),
        });
        const data = await res.json();
        setToDoes([...toDoes, data]);
        e.target.value = "";
      } catch (error) {
        console.log(error);
      }
    }
  };

  const onCheckedToggleHandler = async (taskId) => {
    const res = await fetch(
      `http://localhost:7007/api/v1/todos/${taskId}/toggle-complete`,
      {
        method: "PUT",
      }
    );
    const data = await res.json();

    const changedTasks = toDoes.map((task) => {
      if (task.id === data.id) {
        task.checked = data.checked;
      }
      return task;
    });

    setToDoes(changedTasks);
  };

  useEffect(() => {
    getToDoes().then((allTodo) => {
      if (allTodo) {
        setToDoes(allTodo);
      }
    });
  }, []);

  const completeCounter = toDoes.filter((task) => task.checked);

  return (
    <div className="mb-3">
      <label htmlFor="exampleInput" className="form-label">
        What do you want to do today?
      </label>
      <input
        onKeyDown={addTodoHandler}
        type="text"
        className="form-control"
        id="exampleInput"
        aria-describedby="tasks"
      />

      <ul className="list-group">
        {toDoes.map((task) => {
            return (
              <li className="list-group-item">
                <label>
                  <input
                    className="form-check-input me-1"
                    type="checkbox"
                    onChange={() => onCheckedToggleHandler(task.id)}
                    checked={task.checked}
                    aria-label="..."
                  ></input>
                  {task.title}
                </label>
              </li>
            );
          })}
      </ul>
      <p>Ilość: {completeCounter.length}</p>
    </div>
  );
}

export default WidgetToDo;
