/**
 * Renders a list of todo items using React elements. If the todo list is empty, displays a placeholder message.
 *
 * @param {Object} params - The parameters for rendering the todo list.
 * @param {Array<Object>} params.todos - An array of todo item objects to render.
 * @param {boolean} params.verbose - Whether to render the todos in verbose mode.
 * @returns {React.ReactElement} The rendered todo list as a React element.
 */
function renderTodoList({
  todos,
  verbose
}) {
  // If there are no todos, render a placeholder message
  if (todos.length === 0) {
    return tV.createElement(ConditionalRowContainer, {
      height: 1
    },
      tV.createElement(_, {
        dimColor: true
      }, "(Todo list is empty)")
    );
  }

  // Render the list of todos, sorted and mapped to components
  return tV.createElement(ConditionalRowContainer, {
    height: todos.length
  },
    tV.createElement(g, {
      flexDirection: "column"
    },
      // Sort todos using the provided sorting function and map each to a todo component
      todos.sort(compareByStatusAndPriority).map((todoItem, index) =>
        tV.createElement(renderTodoListItem, {
          key: `completed-${index}`,
          todo: todoItem,
          isCurrent: false,
          verbose: verbose
        })
      )
    )
  );
}

module.exports = renderTodoList;