/**
 * Formats a string with ANSI open/close wrappers based on the provided context object.
 * Handles nested wrappers, line breaks, and ensures proper opening/closing of ANSI codes.
 *
 * @param {Object} context - The context object containing formatting level and wrapper info.
 * @param {string} input - The string to format with ANSI wrappers.
 * @returns {string} The formatted string with appropriate ANSI wrappers applied.
 */
function formatWithAnsiWrappers(context, input) {
  // If formatting level is zero or less, or input is falsy, return early
  if (context.level <= 0 || !input) {
    // If a reset index property exists, return empty string, else return input as-is
    return context[Ri] ? "" : input;
  }

  // Retrieve the wrapper object from the context
  let wrapper = context[wv];
  if (wrapper === undefined) {
    // If no wrapper is defined, return input as-is
    return input;
  }

  // Destructure openAll and closeAll from the wrapper
  const { openAll, closeAll } = wrapper;

  // If the input contains any ANSI escape characters, process all parent wrappers
  if (input.includes("\x1B")) {
    let currentWrapper = wrapper;
    while (currentWrapper !== undefined) {
      input = replaceAllWithInsertion(input, currentWrapper.close, currentWrapper.open);
      currentWrapper = currentWrapper.parent;
    }
  }

  // Check for the first line break in the input
  const firstLineBreakIndex = input.indexOf("\n");
  if (firstLineBreakIndex !== -1) {
    // If a line break exists, process the input accordingly
    input = insertStringAfterEachLine(input, closeAll, openAll, firstLineBreakIndex);
  }

  // Wrap the input with openAll and closeAll wrappers
  return openAll + input + closeAll;
}

module.exports = formatWithAnsiWrappers;