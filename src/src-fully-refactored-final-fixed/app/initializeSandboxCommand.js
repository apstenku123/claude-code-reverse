/**
 * Initializes a sandboxed command execution environment if supported.
 * Throws an error if sandbox mode is unavailable.
 *
 * @param {any} command - The command or configuration to be wrapped for sandboxed execution.
 * @returns {{ finalCommand: any, cleanup: function }} An object containing the wrapped command and a cleanup function.
 * @throws {Error} If sandbox mode is not available or initialization fails.
 */
function initializeSandboxCommand(command) {
  // Check if sandbox mode is available on this system
  if (!Vy1()) {
    throw new Error("Sandbox mode requested but not available on this system");
  }
  try {
    // Create a new sandbox environment
    const sandboxEnvironment = new A30();
    return {
      // Wrap the provided command for sandboxed execution
      finalCommand: sandboxEnvironment.wrapCommand(command),
      // Provide a cleanup function to release resources
      cleanup: () => sandboxEnvironment.cleanup()
    };
  } catch (error) {
    // If any error occurs during initialization, throw a consistent error message
    throw new Error("Sandbox mode requested but not available on this system");
  }
}

module.exports = initializeSandboxCommand;