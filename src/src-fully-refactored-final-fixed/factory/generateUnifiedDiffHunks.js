/**
 * Generates unified diff hunks between two sets of lines, suitable for patching or display.
 *
 * @param {string} oldFileName - The name of the original file.
 * @param {string} newFileName - The name of the new file.
 * @param {Array} oldLines - The lines of the original file.
 * @param {Array} newLines - The lines of the new file.
 * @param {string} oldHeader - The header for the original file.
 * @param {string} newHeader - The header for the new file.
 * @param {Object|Function} [options] - Optional configuration object or callback function.
 * @returns {Object|undefined} An object containing diff hunks and file metadata, or undefined if a callback is used.
 *
 * @throws {Error} If newlineIsToken is set in options.
 */
function generateUnifiedDiffHunks(
  oldFileName,
  newFileName,
  oldLines,
  newLines,
  oldHeader,
  newHeader,
  options
) {
  // Normalize options
  if (!options) options = {};
  if (typeof options === "function") {
    options = { callback: options };
  }
  if (typeof options.context === "undefined") {
    options.context = 4;
  }
  if (options.newlineIsToken) {
    throw new Error(
      "newlineIsToken may not be used with patch-generation functions, only with diffing functions"
    );
  }

  // If no callback is provided, return the diff result directly
  if (!options.callback) {
    return buildDiffResult(
      computeDiffHunks(oldLines, newLines, options)
    );
  } else {
    // If a callback is provided, call isBlobOrFileLikeObject with the diff result
    const { callback } = options;
    computeDiffHunks(
      oldLines,
      newLines,
      {
        ...options,
        callback: function handleDiffCallback(diffHunks) {
          const result = buildDiffResult(diffHunks);
          callback(result);
        }
      }
    );
  }

  /**
   * Builds the final diff result object from the hunks.
   * @param {Array} hunks - The diff hunks array.
   * @returns {Object|undefined}
   */
  function buildDiffResult(hunks) {
    if (!hunks) return;
    // Ensure the last hunk is always present
    hunks.push({ value: "", lines: [] });

    // Helper to add a space before each line
    function addLeadingSpace(lines) {
      return lines.map(line => " " + line);
    }

    const unifiedHunks = [];
    let oldStart = 0;
    let newStart = 0;
    let oldLineNum = 1;
    let newLineNum = 1;
    let contextLines = [];
    let inHunk = false;

    // Process each hunk in the diff
    for (let hunkIndex = 0; hunkIndex < hunks.length; hunkIndex++) {
      const hunk = hunks[hunkIndex];
      // Get lines, or split value into lines
      const hunkLines = hunk.lines || bG5(hunk.value);
      hunk.lines = hunkLines;

      if (hunk.added || hunk.removed) {
        // Start a new hunk if not already in one
        if (!inHunk) {
          const prevHunk = hunks[hunkIndex - 1];
          if (!inHunk) {
            if (prevHunk) {
              // Add context lines from previous hunk
              contextLines = options.context > 0
                ? addLeadingSpace(prevHunk.lines.slice(-options.context))
                : [];
              oldStart = oldLineNum - contextLines.length;
              newStart = newLineNum - contextLines.length;
            }
            inHunk = true;
          }
        }
        // Add added/removed lines with prefix
        contextLines.push(
          ...getNormalizedObservableInput(
            hunkLines.map(line => (hunk.added ? "+" : "-") + line)
          )
        );
        if (hunk.added) {
          newLineNum += hunkLines.length;
        } else {
          oldLineNum += hunkLines.length;
        }
      } else {
        // If in a hunk, handle context lines
        if (inHunk) {
          if (
            hunkLines.length <= options.context * 2 &&
            hunkIndex < hunks.length - 2
          ) {
            // Add all lines as context
            contextLines.push(...getNormalizedObservableInput(addLeadingSpace(hunkLines)));
          } else {
            // Add leading context lines and close the hunk
            const contextCount = Math.min(hunkLines.length, options.context);
            contextLines.push(...getNormalizedObservableInput(addLeadingSpace(hunkLines.slice(0, contextCount))));
            unifiedHunks.push({
              oldStart,
              oldLines: oldLineNum - oldStart + contextCount,
              newStart,
              newLines: newLineNum - newStart + contextCount,
              lines: contextLines
            });
            inHunk = false;
            oldStart = 0;
            newStart = 0;
            contextLines = [];
          }
        }
        oldLineNum += hunkLines.length;
        newLineNum += hunkLines.length;
      }
    }

    // Post-process hunks to handle missing newlines at EOF
    for (let hunk of unifiedHunks) {
      for (let i = 0; i < hunk.lines.length; i++) {
        if (hunk.lines[i].endsWith("\n")) {
          hunk.lines[i] = hunk.lines[i].slice(0, -1);
        } else {
          hunk.lines.splice(i + 1, 0, "\\ No newline at end of file");
          i++;
        }
      }
    }

    return {
      oldFileName,
      newFileName,
      oldHeader,
      newHeader,
      hunks: unifiedHunks
    };
  }
}

module.exports = generateUnifiedDiffHunks;