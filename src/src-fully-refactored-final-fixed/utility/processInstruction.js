/**
 * Processes a given instruction code and performs the corresponding action.
 *
 * @param {number} instructionType - The type of instruction to process (e.g., 1, 2, 4, 5, -1).
 * @param {string} instructionValue - The value associated with the instruction (e.g., tag name, comment text).
 * @param {*} userContext - Additional user context or data required for processing.
 * @param {*} processingArgs - Additional arguments required for processing.
 * @returns {void}
 */
function processInstruction(instructionType, instructionValue, userContext, processingArgs) {
  switch (instructionType) {
    case 1:
      // Remove unwanted patterns from instructionValue using Q1A regex and process if not empty
      {
        const sanitizedValue = instructionValue.replace(Q1A, "");
        if (sanitizedValue.length > 0) {
          restoreStateFromStacks(instructionType, sanitizedValue, userContext, processingArgs);
        }
      }
      return;
    case 4:
      // Create and append a comment node with the instructionValue
      MA._appendChild(MA.createComment(instructionValue));
      return;
    case 5:
      // Directly process the instruction
      restoreStateFromStacks(instructionType, instructionValue, userContext, processingArgs);
      return;
    case -1:
      // Special case: perform AQ cleanup or reset
      AQ();
      return;
    case 2:
      // Handle specific tag names for instructionValue
      switch (instructionValue) {
        case "html":
          // Process 'html' tag
          restoreStateFromStacks(instructionType, instructionValue, userContext, processingArgs);
          return;
        case "noframes":
          // Special handling for 'noframes' tag
          saveAndSwapContext(instructionType, instructionValue, userContext, processingArgs);
          return;
      }
      break;
    default:
      // No action for other instruction types
      break;
  }
}

module.exports = processInstruction;