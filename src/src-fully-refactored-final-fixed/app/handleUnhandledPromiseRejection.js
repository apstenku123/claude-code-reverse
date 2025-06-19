/**
 * Handles unhandled promise rejections by logging warnings and errors based on the provided mode.
 *
 * @param {Error} rejectionReason - The reason (error object or value) for the promise rejection.
 * @param {Object} options - Configuration options for handling the rejection.
 * @param {string} options.mode - Determines the handling strategy: 'warn' or 'strict'.
 * @returns {void}
 */
function handleUnhandledPromiseRejection(rejectionReason, options) {
  const unhandledRejectionMessage =
    "This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). The promise rejected with the reason:";

  // Handle 'warn' mode: log warning and error stack (if available)
  if (options.mode === "warn") {
    SZA.consoleSandbox(() => {
      console.warn(unhandledRejectionMessage);
      console.error(rejectionReason && rejectionReason.stack ? rejectionReason.stack : rejectionReason);
    });
  }
  // Handle 'strict' mode: log warning, then log and exit process
  else if (options.mode === "strict") {
    SZA.consoleSandbox(() => {
      console.warn(unhandledRejectionMessage);
    });
    BI9.logAndExitProcess(rejectionReason);
  }
}

module.exports = handleUnhandledPromiseRejection;