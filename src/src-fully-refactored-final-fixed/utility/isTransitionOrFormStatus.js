/**
 * Determines if the normalized status matches a specific status or, in the case of 'HostTransitionStatus',
 * also matches 'FormStatus'.
 *
 * @param {string} status - The status value to be normalized and checked.
 * @param {string} targetStatus - The status to compare against. If 'HostTransitionStatus', will also match 'FormStatus'.
 * @returns {boolean} True if the normalized status matches the target status, or if the target is 'HostTransitionStatus' and the normalized status is 'FormStatus'.
 */
function isTransitionOrFormStatus(status, targetStatus) {
  // Normalize the status using the external F1 function
  const normalizedStatus = F1(status);

  // If the target is 'HostTransitionStatus', allow a match with either 'HostTransitionStatus' or 'FormStatus'
  if (targetStatus === "HostTransitionStatus") {
    return normalizedStatus === targetStatus || normalizedStatus === "FormStatus";
  }

  // Otherwise, only match if normalized status equals the target status
  return normalizedStatus === targetStatus;
}

module.exports = isTransitionOrFormStatus;