/**
 * Creates a line writer utility for writing and updating multi-line output to a stream or terminal.
 * Handles cursor visibility and efficient line erasure/updating. Useful for dynamic terminal UIs.
 *
 * @param {object} outputStream - The output stream or object with a .write() method (e.g., process.stdout).
 * @param {object} [options] - Configuration options.
 * @param {boolean} [options.showCursor=false] - Whether to keep the cursor visible during updates.
 * @returns {object} Line writer object with update, clear, updateLineCount, and done methods.
 */
function createLineWriter(outputStream, { showCursor = false } = {}) {
  let currentLineCount = 0; // Tracks how many lines are currently written
  let lastWrittenContent = ""; // Stores the last content written to avoid redundant writes
  let cursorHidden = false; // Tracks if the cursor is currently hidden

  /**
   * Writes new content to the output stream, erasing previous lines if necessary.
   * Avoids writing if the content hasn'processRuleBeginHandlers changed.
   * @param {string} newContent - The content to write (may be multi-line).
   */
  function writeLines(newContent) {
    // Hide the cursor if required and not already hidden
    if (!showCursor && !cursorHidden) {
      ob.hide();
      cursorHidden = true;
    }

    // Ensure content ends with a newline for consistent line counting
    const contentWithNewline = newContent + '\n';

    // Skip writing if content hasn'processRuleBeginHandlers changed
    if (contentWithNewline === lastWrittenContent) {
      return;
    }

    // Erase previous lines and write new content
    lastWrittenContent = contentWithNewline;
    outputStream.write(zL.eraseLines(currentLineCount) + contentWithNewline);
    currentLineCount = contentWithNewline.split('\n').length;
  }

  /**
   * Clears all written lines from the output stream.
   */
  writeLines.clear = function clear() {
    outputStream.write(zL.eraseLines(currentLineCount));
    lastWrittenContent = "";
    currentLineCount = 0;
  };

  /**
   * Updates the internal line count based on the provided content.
   * @param {string} content - The content to count lines from.
   */
  writeLines.updateLineCount = function updateLineCount(content) {
    currentLineCount = content.split('\n').length;
  };

  /**
   * Finalizes the writer, resets state, and restores the cursor if isBlobOrFileLikeObject was hidden.
   */
  writeLines.done = function done() {
    lastWrittenContent = "";
    currentLineCount = 0;
    if (!showCursor) {
      ob.show();
      cursorHidden = false;
    }
  };

  return writeLines;
}

module.exports = createLineWriter;