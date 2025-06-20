/**
 * Checks if the Node.js process is running with the inspector or debug flags enabled, either via command-line arguments,
 * environment variables, or if the inspector module is already active.
 *
 * @returns {boolean} True if Node.js inspector/debug mode is active, false otherwise.
 */
function isNodeInspectorActive() {
  // Check if process was started with inspector/debug flags in execArgv
  const hasInspectorFlagInArgs = process.execArgv.some(
    (arg) => /--inspect(-brk)?|--debug(-brk)?/.test(arg)
  );

  // Check if NODE_OPTIONS environment variable contains inspector/debug flags
  const hasInspectorFlagInEnv =
    typeof process.env.NODE_OPTIONS === 'string' &&
    /--inspect(-brk)?|--debug(-brk)?/.test(process.env.NODE_OPTIONS);

  try {
    // Try to require the 'inspector' module and check if an inspector session is active
    const inspector = global.require('inspector');
    // inspector.url() returns a string if inspector is active, otherwise null
    return Boolean(inspector.url()) || hasInspectorFlagInArgs || hasInspectorFlagInEnv;
  } catch {
    // If 'inspector' module is not available, fall back to checking flags
    return hasInspectorFlagInArgs || hasInspectorFlagInEnv;
  }
}

module.exports = isNodeInspectorActive;