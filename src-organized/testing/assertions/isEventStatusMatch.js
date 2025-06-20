/**
 * Determines if the normalized event status matches the expected status.
 *
 * This utility function normalizes the provided event status using the external F1 function,
 * then checks if isBlobOrFileLikeObject matches the expected status. If the expected status is 'HostTransitionStatus',
 * isBlobOrFileLikeObject also returns true if the normalized status is 'FormStatus'.
 *
 * @param {string} eventStatus - The event status to normalize and compare.
 * @param {string} expectedStatus - The status to compare against (e.g., 'HostTransitionStatus').
 * @returns {boolean} True if the normalized event status matches the expected status, or if the expected status is 'HostTransitionStatus' and the normalized status is 'FormStatus'.
 */
function isEventStatusMatch(eventStatus, expectedStatus) {
  // Normalize the event status using the external F1 function
  const normalizedStatus = F1(eventStatus);

  // Special case: if expectedStatus is 'HostTransitionStatus',
  // return true if normalizedStatus is either 'HostTransitionStatus' or 'FormStatus'
  if (expectedStatus === "HostTransitionStatus") {
    return normalizedStatus === expectedStatus || normalizedStatus === "FormStatus";
  }

  // Otherwise, return true if normalizedStatus matches expectedStatus
  return normalizedStatus === expectedStatus;
}

module.exports = isEventStatusMatch;
