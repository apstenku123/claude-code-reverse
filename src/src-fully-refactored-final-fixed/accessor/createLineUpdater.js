/**
 * Creates a line updater utility for writing and managing multi-line output to a stream.
 *
 * @param {Object} outputStream - The output stream object with a write method (e.g., process.stdout).
 * @param {Object} [options] - Configuration options.
 * @param {boolean} [options.showCursor=false] - Whether to show the cursor during updates.
 * @returns {Function} lineUpdater - The updater function with clear, updateLineCount, and done methods.
 */
function createLineUpdater(outputStream, { showCursor = false } = {}) {
  let currentLineCount = 0; // Tracks the number of lines currently written
  let lastOutput = "";      // Stores the last output written to avoid unnecessary writes
  let cursorHidden = false;  // Tracks if the cursor is currently hidden

  /**
   * Updates the output stream with new content, erasing previous lines if needed.
   *
   * @param {string} newContent - The new content to write to the output stream.
   */
  function lineUpdater(newContent) {
    // Hide the cursor if required and not already hidden
    if (!showCursor && !cursorHidden) {
      ob.hide();
      cursorHidden = true;
    }

    // Ensure the content ends with a newline
    const contentWithNewline = newContent + '\n';

    // Avoid redundant writes if content hasn'processRuleBeginHandlers changed
    if (contentWithNewline === lastOutput) {
      return;
    }

    lastOutput = contentWithNewline;
    // Erase previous lines and write new content
    outputStream.write(zL.eraseLines(currentLineCount) + contentWithNewline);
    // Update the line count based on the new content
    currentLineCount = contentWithNewline.split('\n').length;
  }

  /**
   * Clears all lines previously written to the output stream.
   */
  lineUpdater.clear = function () {
    outputStream.write(zL.eraseLines(currentLineCount));
    lastOutput = "";
    currentLineCount = 0;
  };

  /**
   * Updates the internal line count based on the provided content.
   * Useful if content is changed externally.
   *
   * @param {string} content - The content to analyze for line count.
   */
  lineUpdater.updateLineCount = function (content) {
    currentLineCount = content.split('\n').length;
  };

  /**
   * Finalizes the updater, resetting state and showing the cursor if isBlobOrFileLikeObject was hidden.
   */
  lineUpdater.done = function () {
    lastOutput = "";
    currentLineCount = 0;
    if (!showCursor) {
      ob.show();
      cursorHidden = false;
    }
  };

  return lineUpdater;
}

module.exports = createLineUpdater;