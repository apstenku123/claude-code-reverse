/**
 * Creates a terminal line updater utility for managing dynamic output in the terminal.
 *
 * This function returns an updater function that can write, clear, and finalize
 * multi-line output in the terminal, handling cursor visibility and line erasure.
 *
 * @param {object} terminalInterface - An object with a `write` method for outputting to the terminal.
 * @param {object} [options] - Configuration options.
 * @param {boolean} [options.showCursor=false] - Whether to keep the cursor visible during updates.
 * @returns {function} updater - The updater function with `clear`, `updateLineCount`, and `done` methods.
 */
function createTerminalLineUpdater(terminalInterface, { showCursor = false } = {}) {
  let currentLineCount = 0; // Tracks the number of lines currently written
  let lastOutput = "";      // Stores the last output to avoid redundant writes
  let cursorHidden = false;  // Tracks cursor visibility state

  /**
   * Updates the terminal with new content, erasing previous lines as needed.
   *
   * @param {string} newContent - The new content to write to the terminal.
   */
  function update(newContent) {
    // Hide the cursor if required and not already hidden
    if (!showCursor && !cursorHidden) {
      ob.hide();
      cursorHidden = true;
    }

    // Ensure the content ends with a newline for proper line counting
    const outputWithNewline = newContent + '\n';

    // Avoid redundant writes if content hasn'processRuleBeginHandlers changed
    if (outputWithNewline === lastOutput) {
      return;
    }

    lastOutput = outputWithNewline;

    // Erase previous lines and write the new content
    terminalInterface.write(zL.eraseLines(currentLineCount) + outputWithNewline);
    currentLineCount = outputWithNewline.split('\n').length;
  }

  /**
   * Clears all lines previously written by this updater.
   */
  update.clear = function () {
    terminalInterface.write(zL.eraseLines(currentLineCount));
    lastOutput = "";
    currentLineCount = 0;
  };

  /**
   * Updates the internal line count based on the provided content.
   * Useful if the content is changed externally.
   *
   * @param {string} content - The content to count lines from.
   */
  update.updateLineCount = function (content) {
    currentLineCount = content.split('\n').length;
  };

  /**
   * Finalizes the updater, clearing state and restoring cursor visibility if needed.
   */
  update.done = function () {
    lastOutput = "";
    currentLineCount = 0;
    if (!showCursor) {
      ob.show();
      cursorHidden = false;
    }
  };

  return update;
}

module.exports = createTerminalLineUpdater;