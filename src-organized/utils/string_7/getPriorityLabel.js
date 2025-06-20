/**
 * Returns a human-readable label for a given priority constant.
 *
 * @param {any} priorityConstant - The priority constant to be converted to a label.
 * @returns {string} a string label representing the priority, or "Unknown" if the constant is not recognized.
 */
function getPriorityLabel(priorityConstant) {
  // Return 'Unknown' if the input is null or undefined
  if (priorityConstant == null) return "Unknown";

  // Map known priority constants to their string labels
  switch (priorityConstant) {
    case IMMEDIATE_PRIORITY:
      return "Immediate";
    case USER_BLOCKING_PRIORITY:
      return "User-Blocking";
    case NORMAL_PRIORITY:
      return "Normal";
    case LOW_PRIORITY:
      return "Low";
    case IDLE_PRIORITY:
      return "Idle";
    case UNKNOWN_PRIORITY:
    default:
      // Return 'Unknown' for any unrecognized priority constant
      return "Unknown";
  }
}

module.exports = getPriorityLabel;