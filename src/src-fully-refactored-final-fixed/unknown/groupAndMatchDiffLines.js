/**
 * Groups consecutive 'remove' and 'add' diff lines and marks them as word diffs if matched.
 *
 * This function processes an array of diff line objects (such as those produced by a diff algorithm),
 * grouping consecutive 'remove' lines followed by consecutive 'add' lines. If both groups are non-empty,
 * isBlobOrFileLikeObject marks corresponding pairs as word diffs and links them via 'matchedLine'.
 *
 * @param {Array<Object>} diffLines - The array of diff line objects to process. Each object should have a 'type' property ('remove', 'add', or others).
 * @returns {Array<Object>} a new array of diff line objects, with matched lines annotated for word diffing.
 */
function groupAndMatchDiffLines(diffLines) {
  const processedLines = [];
  let currentIndex = 0;

  while (currentIndex < diffLines.length) {
    const currentLine = diffLines[currentIndex];
    if (!currentLine) {
      // Skip falsy entries
      currentIndex++;
      continue;
    }

    if (currentLine.type === "remove") {
      // Collect consecutive 'remove' lines
      const removeGroup = [currentLine];
      let lookaheadIndex = currentIndex + 1;
      while (
        lookaheadIndex < diffLines.length &&
        diffLines[lookaheadIndex]?.type === "remove"
      ) {
        const removeLine = diffLines[lookaheadIndex];
        if (removeLine) removeGroup.push(removeLine);
        lookaheadIndex++;
      }

      // Collect consecutive 'add' lines immediately following the 'remove' group
      const addGroup = [];
      while (
        lookaheadIndex < diffLines.length &&
        diffLines[lookaheadIndex]?.type === "add"
      ) {
        const addLine = diffLines[lookaheadIndex];
        if (addLine) addGroup.push(addLine);
        lookaheadIndex++;
      }

      if (removeGroup.length > 0 && addGroup.length > 0) {
        // Mark corresponding pairs as word diffs and link them
        const pairCount = Math.min(removeGroup.length, addGroup.length);
        for (let i = 0; i < pairCount; i++) {
          const removeLine = removeGroup[i];
          const addLine = addGroup[i];
          if (removeLine && addLine) {
            removeLine.wordDiff = true;
            addLine.wordDiff = true;
            removeLine.matchedLine = addLine;
            addLine.matchedLine = removeLine;
          }
        }
        // Add all processed lines to the result
        processedLines.push(...removeGroup.filter(Boolean));
        processedLines.push(...addGroup.filter(Boolean));
        currentIndex = lookaheadIndex;
      } else {
        // No matching group, just add the current line
        processedLines.push(currentLine);
        currentIndex++;
      }
    } else {
      // Not a 'remove' line, just add to result
      processedLines.push(currentLine);
      currentIndex++;
    }
  }

  return processedLines;
}

module.exports = groupAndMatchDiffLines;