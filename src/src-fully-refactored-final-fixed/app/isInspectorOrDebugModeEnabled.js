/**
 * Checks if the Node.js process is running with inspector or debug mode enabled.
 * This includes checking process arguments, NODE_OPTIONS, and the inspector module.
 *
 * @returns {boolean} True if inspector or debug mode is enabled, false otherwise.
 */
function isInspectorOrDebugModeEnabled() {
  // Check if process arguments contain --inspect, --inspect-brk, --debug, or --debug-brk
  const hasDebugFlagInArgv = process.execArgv.some(
    (argument) => /--inspect(-brk)?|--debug(-brk)?/.test(argument)
  );

  // Check if NODE_OPTIONS environment variable contains debug/inspect flags
  const hasDebugFlagInNodeOptions =
    typeof process.env.NODE_OPTIONS === 'string' &&
    /--inspect(-brk)?|--debug(-brk)?/.test(process.env.NODE_OPTIONS);

  try {
    // Try to require the inspector module and check if an inspector session is active
    const inspector = global.require('inspector');
    // inspector.url() returns a string if inspector is active, otherwise null
    return Boolean(inspector.url()) || hasDebugFlagInArgv || hasDebugFlagInNodeOptions;
  } catch {
    // If inspector module is not available, fall back to checking flags only
    return hasDebugFlagInArgv || hasDebugFlagInNodeOptions;
  }
}

module.exports = isInspectorOrDebugModeEnabled;