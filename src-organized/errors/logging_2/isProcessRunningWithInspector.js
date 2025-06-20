/**
 * Checks if the current Node.js process is running with an inspector/debugger attached.
 * This includes checking for '--inspect', '--inspect-brk', '--debug', or '--debug-brk' flags
 * in process.execArgv or NODE_OPTIONS, and also attempts to detect if the inspector module is active.
 *
 * @returns {boolean} True if the process is running with an inspector/debugger, otherwise false.
 */
function isProcessRunningWithInspector() {
  // Regular expression to match Node.js inspector/debug flags
  const inspectorFlagRegex = /--inspect(-brk)?|--debug(-brk)?/;

  // Check if any execArgv argument enables the inspector/debugger
  const hasInspectorFlagInExecArgv = process.execArgv.some(arg => inspectorFlagRegex.test(arg));

  // Check if NODE_OPTIONS environment variable enables the inspector/debugger
  const hasInspectorFlagInNodeOptions =
    typeof process.env.NODE_OPTIONS === 'string' &&
    inspectorFlagRegex.test(process.env.NODE_OPTIONS);

  try {
    // Try to require the 'inspector' module and check if an inspector URL is available
    // If so, the inspector is active
    const inspector = global.require("inspector");
    const inspectorUrl = inspector.url();
    return Boolean(inspectorUrl) || hasInspectorFlagInExecArgv || hasInspectorFlagInNodeOptions;
  } catch {
    // If requiring 'inspector' fails, fall back to checking flags only
    return hasInspectorFlagInExecArgv || hasInspectorFlagInNodeOptions;
  }
}

module.exports = isProcessRunningWithInspector;