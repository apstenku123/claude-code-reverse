/**
 * Initializes the React DevTools console functions on the global window object.
 *
 * This function assigns an object to the global `window.__REACT_DEVTOOLS_CONSOLE_FUNCTIONS__`
 * property, exposing methods for patching the console and registering a renderer
 * with the console. This is typically used by React DevTools integrations.
 *
 * @returns {void} This function does not return a value.
 */
function initializeReactDevToolsConsoleFunctions() {
  // Assign the DevTools console functions to the global window object
  window.__REACT_DEVTOOLS_CONSOLE_FUNCTIONS__ = {
    // Method to patch the console using values from the window
    patchConsoleUsingWindowValues: patchConsoleUsingWindowValues,
    // Method to register a renderer with the console
    registerRendererWithConsole: registerRendererWithConsole
  };
}

// Export the function for use in other modules
module.exports = initializeReactDevToolsConsoleFunctions;
