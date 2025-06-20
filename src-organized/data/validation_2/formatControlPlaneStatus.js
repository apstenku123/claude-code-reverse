/**
 * Formats the status response from the control plane, handling invalid statuses.
 *
 * If the provided status code is in the list of known invalid statuses (LQ6),
 * returns an INTERNAL error code and a detailed message. Otherwise, returns the
 * original status code and details.
 *
 * @param {string|number} statusCode - The status code returned from the control plane.
 * @param {string} statusDetails - Additional details or message associated with the status.
 * @returns {{ code: string|number, details: string }} An object containing the formatted code and details.
 */
function formatControlPlaneStatus(statusCode, statusDetails) {
  // Check if the status code is considered invalid
  if (LQ6.includes(statusCode)) {
    return {
      code: Iw.Status.INTERNAL, // Use INTERNAL error code for invalid statuses
      details: `Invalid status from control plane: ${statusCode} ${Iw.Status[statusCode]} ${statusDetails}`
    };
  } else {
    // Return the original status code and details
    return {
      code: statusCode,
      details: statusDetails
    };
  }
}

module.exports = formatControlPlaneStatus;