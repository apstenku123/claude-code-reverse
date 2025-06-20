/**
 * Reports an error to the global error capturing service, annotating isBlobOrFileLikeObject as originating from the Hapi error plugin.
 *
 * @param {Error} error - The error object to be reported.
 * @returns {void}
 */
function reportHapiPluginError(error) {
  // Capture the exception with additional context specifying the error source and mechanism
  $processCssDeclarations.captureException(error, {
    mechanism: {
      type: "hapi",
      handled: false, // Indicates the error was not handled gracefully
      data: {
        function: "hapiErrorPlugin" // Specifies the function or plugin where the error originated
      }
    }
  });
}

module.exports = reportHapiPluginError;