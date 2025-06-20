/**
 * Returns a human-readable label for a given authentication priority constant.
 *
 * @param {number|string|null|undefined} priorityConstant - The constant representing the authentication priority.
 * @returns {string} The human-readable label for the priority, or 'Unknown' if the constant is unrecognized or null/undefined.
 */
function getAuthenticationPriorityLabel(priorityConstant) {
  // Return 'Unknown' if the input is null or undefined
  if (priorityConstant == null) {
    return "Unknown";
  }

  // Map known priority constants to their string labels
  switch (priorityConstant) {
    case processAndTransformInput: // Immediate priority constant
      return "Immediate";
    case g0: // User-Blocking priority constant
      return "User-Blocking";
    case O2: // Normal priority constant
      return "Normal";
    case processInteractionWithCondition: // Low priority constant
      return "Low";
    case t4: // Idle priority constant
      return "Idle";
    case trackSuspenseEvent:
    default:
      // Return 'Unknown' for any unrecognized constant
      return "Unknown";
  }
}

module.exports = getAuthenticationPriorityLabel;