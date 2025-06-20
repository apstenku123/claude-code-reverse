/**
 * Dynamically manages multi-line console output, allowing updates, clearing, and cursor visibility control.
 *
 * @param {object} outputStream - The writable stream to output text to (must have a .write() method).
 * @param {object} [options] - Configuration options.
 * @param {boolean} [options.showCursor=false] - Whether to show the cursor while updating output.
 * @returns {object} Console output controller with methods: update, clear, updateLineCount, done.
 */
function createDynamicConsoleOutput(outputStream, { showCursor = false } = {}) {
  let currentLineCount = 0; // Tracks the number of lines currently output
  let lastOutput = "";      // Stores the last output string (with trailing newline)
  let cursorHidden = false;  // Tracks if the cursor is currently hidden

  /**
   * Updates the console output with new content, erasing previous lines.
   * @param {string} newContent - The new content to display.
   */
  function update(newContent) {
    // Hide cursor if required and not already hidden
    if (!showCursor && !cursorHidden) {
      ob.hide();
      cursorHidden = true;
    }
    // Ensure output ends with a newline
    const outputWithNewline = newContent + '\n';
    // Avoid redundant updates
    if (outputWithNewline === lastOutput) return;
    lastOutput = outputWithNewline;
    // Erase previous lines and write new output
    outputStream.write(zL.eraseLines(currentLineCount) + outputWithNewline);
    // Update line count
    currentLineCount = outputWithNewline.split('\n').length;
  }

  /**
   * Clears all output from the console.
   */
  update.clear = function clear() {
    outputStream.write(zL.eraseLines(currentLineCount));
    lastOutput = "";
    currentLineCount = 0;
  };

  /**
   * Updates the internal line count based on new content (without writing to output).
   * @param {string} content - The content to count lines from.
   */
  update.updateLineCount = function updateLineCount(content) {
    currentLineCount = content.split('\n').length;
  };

  /**
   * Finalizes the output, resets state, and restores cursor if hidden.
   */
  update.done = function done() {
    lastOutput = "";
    currentLineCount = 0;
    if (!showCursor) {
      ob.show();
      cursorHidden = false;
    }
  };

  return update;
}

module.exports = createDynamicConsoleOutput;