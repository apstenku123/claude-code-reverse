/**
 * Returns a standardized response object based on the provided status code and details.
 * If the status code is in the list of invalid control plane statuses, returns an INTERNAL error response.
 * Otherwise, returns the provided status code and details as the response.
 *
 * @param {string|number} statusCode - The status code to evaluate (may be invalid or valid).
 * @param {string} statusDetails - Additional details or message about the status.
 * @returns {{code: string|number, details: string}} Response object with code and details.
 */
function getStatusResponse(statusCode, statusDetails) {
  // Check if the status code is in the list of invalid control plane statuses
  if (LQ6.includes(statusCode)) {
    return {
      code: Iw.Status.INTERNAL,
      details: `Invalid status from control plane: ${statusCode} ${Iw.Status[statusCode]} ${statusDetails}`
    };
  } else {
    // Return the provided status code and details as the response
    return {
      code: statusCode,
      details: statusDetails
    };
  }
}

module.exports = getStatusResponse;