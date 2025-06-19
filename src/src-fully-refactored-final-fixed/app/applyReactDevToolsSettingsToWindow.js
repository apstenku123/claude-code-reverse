/**
 * Applies React DevTools configuration settings to the global window object.
 *
 * This function sets specific properties on the window object that are used by React DevTools
 * to control debugging and display behaviors in the browser environment.
 *
 * @param {Object} devToolsSettings - An object containing React DevTools configuration options.
 * @param {boolean} devToolsSettings.appendComponentStack - Whether to append component stack traces to warnings/errors.
 * @param {boolean} devToolsSettings.breakOnConsoleErrors - Whether to break on console errors in DevTools.
 * @param {boolean} devToolsSettings.showInlineWarningsAndErrors - Whether to show inline warnings and errors in the UI.
 * @param {boolean} devToolsSettings.hideConsoleLogsInStrictMode - Whether to hide console logs when React Strict Mode is enabled.
 * @param {string} devToolsSettings.browserTheme - The theme to use for DevTools (e.g., 'light' or 'dark').
 * @returns {void} This function does not return a value.
 */
function applyReactDevToolsSettingsToWindow(devToolsSettings) {
  // Set React DevTools configuration flags on the global window object
  window.__REACT_DEVTOOLS_APPEND_COMPONENT_STACK__ = devToolsSettings.appendComponentStack;
  window.__REACT_DEVTOOLS_BREAK_ON_CONSOLE_ERRORS__ = devToolsSettings.breakOnConsoleErrors;
  window.__REACT_DEVTOOLS_SHOW_INLINE_WARNINGS_AND_ERRORS__ = devToolsSettings.showInlineWarningsAndErrors;
  window.__REACT_DEVTOOLS_HIDE_CONSOLE_LOGS_IN_STRICT_MODE__ = devToolsSettings.hideConsoleLogsInStrictMode;
  window.__REACT_DEVTOOLS_BROWSER_THEME__ = devToolsSettings.browserTheme;
}

module.exports = applyReactDevToolsSettingsToWindow;