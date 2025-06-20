/**
 * Reports an error to the monitoring service with Hapi-specific context.
 *
 * @param {Error} error - The error object to be reported.
 * @returns {void}
 *
 * This function sends the provided error to the monitoring service ($processCssDeclarations.captureException),
 * attaching metadata that specifies the error originated from the Hapi error plugin.
 */
function reportHapiErrorToMonitoring(error) {
  $processCssDeclarations.captureException(error, {
    mechanism: {
      type: "hapi", // Indicates the error originated from Hapi
      handled: false, // Specifies that the error was not handled
      data: {
        function: "hapiErrorPlugin" // Identifies the function where the error occurred
      }
    }
  });
}

module.exports = reportHapiErrorToMonitoring;
