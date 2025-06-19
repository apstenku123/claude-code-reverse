/**
 * Creates a sandboxed command wrapper if sandbox mode is available.
 * Throws an error if sandbox mode is not supported on this system.
 *
 * @param {any} command - The command to be wrapped for sandbox execution.
 * @returns {{ finalCommand: any, cleanup: function }} An object containing the wrapped command and a cleanup function.
 * @throws {Error} If sandbox mode is not available or initialization fails.
 */
function createSandboxedCommand(command) {
  // Check if sandbox mode is available
  if (!Vy1()) {
    throw new Error("Sandbox mode requested but not available on this system");
  }
  try {
    // Initialize the sandbox environment
    const sandboxInstance = new A30();
    return {
      // Wrap the provided command for sandbox execution
      finalCommand: sandboxInstance.wrapCommand(command),
      // Provide a cleanup function to release resources
      cleanup: () => sandboxInstance.cleanup()
    };
  } catch (error) {
    // If initialization fails, throw a descriptive error
    throw new Error("Sandbox mode requested but not available on this system");
  }
}

module.exports = createSandboxedCommand;
