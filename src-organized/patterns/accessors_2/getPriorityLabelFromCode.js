/**
 * Returns a human-readable label for a given priority code.
 *
 * @param {string|number|null|undefined} priorityCode - The code representing a priority level.
 * @returns {string} The human-readable label for the priority, or "Unknown" if the code is unrecognized or null/undefined.
 */
function getPriorityLabelFromCode(priorityCode) {
  // Return 'Unknown' if the input is null or undefined
  if (priorityCode == null) {
    return "Unknown";
  }

  // Map known priority codes to their corresponding labels
  switch (priorityCode) {
    case IMMEDIATE_PRIORITY_CODE: // Highest priority
      return "Immediate";
    case USER_BLOCKING_PRIORITY_CODE: // User-blocking priority
      return "User-Blocking";
    case NORMAL_PRIORITY_CODE: // Normal priority
      return "Normal";
    case LOW_PRIORITY_CODE: // Low priority
      return "Low";
    case IDLE_PRIORITY_CODE: // Idle priority
      return "Idle";
    case UNKNOWN_PRIORITY_CODE:
    default:
      // Return 'Unknown' for unrecognized codes
      return "Unknown";
  }
}

module.exports = getPriorityLabelFromCode;