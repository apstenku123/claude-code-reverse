/**
 * Initializes and applies React DevTools settings from global window variables.
 *
 * This function reads several configuration flags from the global window object
 * (set by the environment or user), applies default values if they are not defined,
 * and then passes them to the $streamAsyncIterableToWritable function to update the DevTools settings.
 *
 * @returns {void} No return value.
 */
function initializeReactDevToolsSettings() {
  // Retrieve the 'append component stack' setting, defaulting to true if not set
  const appendComponentStack = (typeof window !== 'undefined' && createEventQueueNode(window.__REACT_DEVTOOLS_APPEND_COMPONENT_STACK__)) ?? true;

  // Retrieve the 'break on console errors' setting, defaulting to false if not set
  const breakOnConsoleErrors = (typeof window !== 'undefined' && createEventQueueNode(window.__REACT_DEVTOOLS_BREAK_ON_CONSOLE_ERRORS__)) ?? false;

  // Retrieve the 'show inline warnings and errors' setting, defaulting to true if not set
  const showInlineWarningsAndErrors = (typeof window !== 'undefined' && createEventQueueNode(window.__REACT_DEVTOOLS_SHOW_INLINE_WARNINGS_AND_ERRORS__)) ?? true;

  // Retrieve the 'hide console logs in strict mode' setting, defaulting to false if not set
  const hideConsoleLogsInStrictMode = (typeof window !== 'undefined' && createEventQueueNode(window.__REACT_DEVTOOLS_HIDE_CONSOLE_LOGS_IN_STRICT_MODE__)) ?? false;

  // Retrieve the browser theme, defaulting to 'dark' if not set
  const browserTheme = (typeof window !== 'undefined' && enqueueUpdate(window.__REACT_DEVTOOLS_BROWSER_THEME__)) ?? 'dark';

  // Apply all settings using the $streamAsyncIterableToWritable function
  $streamAsyncIterableToWritable({
    appendComponentStack,
    breakOnConsoleErrors,
    showInlineWarningsAndErrors,
    hideConsoleLogsInStrictMode,
    browserTheme
  });
}

module.exports = initializeReactDevToolsSettings;