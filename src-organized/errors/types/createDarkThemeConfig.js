/**
 * Factory function to create a configuration object for the dark theme.
 * Parses the input JSON string and applies defaults for missing or invalid values.
 *
 * @param {string} configJson - JSON string representing the configuration options.
 * @returns {Object} Configuration object for the dark theme.
 * @property {boolean} appendComponentStack - Whether to append the component stack to errors (default: true).
 * @property {boolean} breakOnConsoleErrors - Whether to break on console errors (default: false).
 * @property {boolean} showInlineWarningsAndErrors - Whether to show inline warnings and errors (default: true).
 * @property {boolean} hideConsoleLogsInStrictMode - Whether to hide console logs in strict mode (default: false).
 * @property {string} browserTheme - The browser theme to use (default: 'dark').
 */
function createDarkThemeConfig(configJson) {
  // Parse the JSON string, defaulting to an empty object if input is null or undefined
  const parsedConfig = JSON.parse(configJson !== null && configJson !== undefined ? configJson : "{}" );

  // Extract raw values from the parsed config
  const rawAppendComponentStack = parsedConfig.appendComponentStack;
  const rawBreakOnConsoleErrors = parsedConfig.breakOnConsoleErrors;
  const rawShowInlineWarningsAndErrors = parsedConfig.showInlineWarningsAndErrors;
  const rawHideConsoleLogsInStrictMode = parsedConfig.hideConsoleLogsInStrictMode;
  const rawBrowserTheme = parsedConfig.browserTheme;

  return {
    // Use createEventQueueNode to validate/normalize boolean values, fallback to defaults if undefined
    appendComponentStack: (typeof createEventQueueNode(rawAppendComponentStack) !== 'undefined' && createEventQueueNode(rawAppendComponentStack) !== null) ? createEventQueueNode(rawAppendComponentStack) : true,
    breakOnConsoleErrors: (typeof createEventQueueNode(rawBreakOnConsoleErrors) !== 'undefined' && createEventQueueNode(rawBreakOnConsoleErrors) !== null) ? createEventQueueNode(rawBreakOnConsoleErrors) : false,
    showInlineWarningsAndErrors: (typeof createEventQueueNode(rawShowInlineWarningsAndErrors) !== 'undefined' && createEventQueueNode(rawShowInlineWarningsAndErrors) !== null) ? createEventQueueNode(rawShowInlineWarningsAndErrors) : true,
    hideConsoleLogsInStrictMode: (typeof createEventQueueNode(rawHideConsoleLogsInStrictMode) !== 'undefined' && createEventQueueNode(rawHideConsoleLogsInStrictMode) !== null) ? createEventQueueNode(rawHideConsoleLogsInStrictMode) : false,
    // Use enqueueUpdate to validate/normalize the browser theme, fallback to 'dark' if undefined
    browserTheme: (typeof enqueueUpdate(rawBrowserTheme) !== 'undefined' && enqueueUpdate(rawBrowserTheme) !== null) ? enqueueUpdate(rawBrowserTheme) : 'dark'
  };
}

module.exports = createDarkThemeConfig;