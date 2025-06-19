/**
 * Returns a human-readable label for a given priority constant.
 *
 * @param {string|number|null|undefined} priorityConstant - The priority constant to be mapped to a label.
 * @returns {string} The corresponding priority label, or "Unknown" if the constant is not recognized or is null/undefined.
 */
function getPriorityLabel(priorityConstant) {
  // Return 'Unknown' if the input is null or undefined
  if (priorityConstant == null) {
    return "Unknown";
  }

  // Map known priority constants to their human-readable labels
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
    case trackSuspenseEvent: // Unknown or fallback priority constant
    default:
      return "Unknown";
  }
}

module.exports = getPriorityLabel;