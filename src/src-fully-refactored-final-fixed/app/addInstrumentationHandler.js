/**
 * Registers an instrumentation handler for a specified source type.
 *
 * Depending on the provided source type (e.g., 'console', 'dom', 'xhr'),
 * this function delegates to the appropriate module to add the corresponding
 * instrumentation handler with the given handler function or configuration.
 *
 * @param {string} sourceType - The type of instrumentation source (e.g., 'console', 'dom', 'xhr', etc.).
 * @param {Function|Object} handler - The handler function or configuration object to register.
 * @returns {any} The result of the instrumentation handler registration, or undefined if the type is unknown.
 */
function addInstrumentationHandler(sourceType, handler) {
  switch (sourceType) {
    case "console":
      // Register a handler for console instrumentation events
      return a6A.addConsoleInstrumentationHandler(handler);
    case "dom":
      // Register a handler for DOM click and keypress events
      return s6A.addClickKeypressInstrumentationHandler(handler);
    case "xhr":
      // Register a handler for XMLHttpRequest events
      return sE1.addXhrInstrumentationHandler(handler);
    case "fetch":
      // Register a handler for fetch API events
      return r6A.addFetchInstrumentationHandler(handler);
    case "history":
      // Register a handler for browser history events
      return e6A.addHistoryInstrumentationHandler(handler);
    case "error":
      // Register a handler for global error events
      return o6A.addGlobalErrorInstrumentationHandler(handler);
    case "unhandledrejection":
      // Register a handler for unhandled promise rejection events
      return t6A.addGlobalUnhandledRejectionInstrumentationHandler(handler);
    default:
      // Warn if the instrumentation type is unknown (only in debug builds)
      if (Fu2.DEBUG_BUILD) {
        Ju2.logger.warn("unknown instrumentation type:", sourceType);
      }
      return undefined;
  }
}

module.exports = addInstrumentationHandler;