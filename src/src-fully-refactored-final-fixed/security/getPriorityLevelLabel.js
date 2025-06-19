/**
 * Returns a human-readable label for a given priority level constant.
 *
 * @param {string|number|null|undefined} priorityLevel - The priority level constant to be converted to a label.
 * @returns {string} The corresponding label for the priority level, or 'Unknown' if the input is null, undefined, or unrecognized.
 */
function getPriorityLevelLabel(priorityLevel) {
  // Return 'Unknown' if the input is null or undefined
  if (priorityLevel == null) {
    return "Unknown";
  }

  // Map known priority level constants to their human-readable labels
  switch (priorityLevel) {
    case processAndTransformInput:
      return "Immediate";
    case g0:
      return "User-Blocking";
    case O2:
      return "Normal";
    case processInteractionWithCondition:
      return "Low";
    case t4:
      return "Idle";
    case trackSuspenseEvent:
    default:
      return "Unknown";
  }
}

module.exports = getPriorityLevelLabel;