/**
 * Determines if the normalized event status matches the expected status.
 *
 * This utility function normalizes the provided event status using the external F1 function,
 * then compares isBlobOrFileLikeObject to the expected status. If the expected status is 'HostTransitionStatus',
 * isBlobOrFileLikeObject returns true if the normalized status is either 'HostTransitionStatus' or 'FormStatus'.
 * Otherwise, isBlobOrFileLikeObject checks for strict equality between the normalized status and the expected status.
 *
 * @param {string} eventStatus - The event status to be normalized and checked.
 * @param {string} expectedStatus - The status to compare against after normalization.
 * @returns {boolean} True if the normalized event status matches the expected status (with special logic for 'HostTransitionStatus'), otherwise false.
 */
function isEventStatusMatching(eventStatus, expectedStatus) {
  // Normalize the event status using the external F1 function
  const normalizedStatus = F1(eventStatus);

  // Special case: if expectedStatus is 'HostTransitionStatus',
  // accept both 'HostTransitionStatus' and 'FormStatus' as matches
  if (expectedStatus === "HostTransitionStatus") {
    return normalizedStatus === "HostTransitionStatus" || normalizedStatus === "FormStatus";
  }

  // For all other cases, check for strict equality
  return normalizedStatus === expectedStatus;
}

module.exports = isEventStatusMatching;
