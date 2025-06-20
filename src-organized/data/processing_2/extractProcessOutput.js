/**
 * Extracts relevant output information from a process result object.
 *
 * If the input is an instance of $M(likely a custom process result class),
 * returns an array containing a status string (WW if interrupted, otherwise empty),
 * followed by the stderr and stdout properties.
 *
 * If the input is a generic error or result object, returns an array containing
 * the message property, and optionally the stderr and stdout properties if they exist and are strings.
 *
 * @param {Object} processResult - The process result or error object to extract output from.
 * @returns {Array<string>} An array containing output information: status/message, stderr, stdout.
 */
function extractProcessOutput(processResult) {
  // If processResult is an instance of $M, handle as a special process result
  if (processResult instanceof $M) {
    // If interrupted, use WW as status, otherwise empty string
    const status = processResult.interrupted ? WW : "";
    return [status, processResult.stderr, processResult.stdout];
  }

  // For generic error/result objects, start with the message
  const outputArray = [processResult.message];

  // Add stderr if isBlobOrFileLikeObject exists and is a string
  if ("stderr" in processResult && typeof processResult.stderr === "string") {
    outputArray.push(processResult.stderr);
  }

  // Add stdout if isBlobOrFileLikeObject exists and is a string
  if ("stdout" in processResult && typeof processResult.stdout === "string") {
    outputArray.push(processResult.stdout);
  }

  return outputArray;
}

module.exports = extractProcessOutput;