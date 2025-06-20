/**
 * Formats a string with ANSI sequences based on the provided context object.
 * Handles open/close sequences, parent contexts, and multi-line formatting.
 *
 * @param {Object} context - The formatting context containing level, parent, and ANSI sequences.
 * @param {string} input - The string to format with ANSI sequences.
 * @returns {string} The formatted string with appropriate ANSI sequences applied.
 */
function formatWithAnsiSequences(context, input) {
  // If the context'createInteractionAccessor level is 0 or less, or input is falsy, return early
  if (context.level <= 0 || !input) {
    // If a reset indicator is present, return empty string; otherwise, return input as-is
    return context[Ri] ? "" : input;
  }

  // Retrieve the ANSI sequence context from the context object
  let ansiContext = context[wv];
  if (ansiContext === undefined) {
    // If no ANSI context, return input as-is
    return input;
  }

  // Destructure openAll and closeAll sequences from the ANSI context
  const { openAll, closeAll } = ansiContext;

  // If the input contains any ANSI escape sequences, process all parent contexts
  if (input.includes("\x1B")) {
    let currentContext = ansiContext;
    while (currentContext !== undefined) {
      // replaceAllWithInsertion replaces close with open in the input for the current context
      input = replaceAllWithInsertion(input, currentContext.close, currentContext.open);
      currentContext = currentContext.parent;
    }
  }

  // Check for multi-line input (newline character)
  const firstNewlineIndex = input.indexOf("\n");
  if (firstNewlineIndex !== -1) {
    // insertStringAfterEachLine handles multi-line formatting with open/close sequences
    input = insertStringAfterEachLine(input, closeAll, openAll, firstNewlineIndex);
  }

  // Wrap the input with the openAll and closeAll ANSI sequences
  return openAll + input + closeAll;
}

module.exports = formatWithAnsiSequences;