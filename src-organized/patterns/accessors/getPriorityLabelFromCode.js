/**
 * Returns a human-readable priority label based on the provided priority code.
 *
 * @param {any} priorityCode - The code representing a specific priority level. Can be one of several known constants or null/undefined.
 * @returns {string} The corresponding priority label (e.g., 'Immediate', 'User-Blocking', etc.), or 'Unknown' if the code is not recognized or is null/undefined.
 */
function getPriorityLabelFromCode(priorityCode) {
  // Return 'Unknown' if the input is null or undefined
  if (priorityCode == null) {
    return "Unknown";
  }

  // Map known priority codes to their human-readable labels
  switch (priorityCode) {
    case processAndTransformInput: // Immediate priority
      return "Immediate";
    case g0: // User-Blocking priority
      return "User-Blocking";
    case O2: // Normal priority
      return "Normal";
    case processInteractionWithCondition: // Low priority
      return "Low";
    case t4: // Idle priority
      return "Idle";
    case trackSuspenseEvent:
    default:
      // Return 'Unknown' for any unrecognized code
      return "Unknown";
  }
}

module.exports = getPriorityLabelFromCode;