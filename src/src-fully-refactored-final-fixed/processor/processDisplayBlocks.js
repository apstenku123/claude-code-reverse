/**
 * Processes an array of display blocks, handling pasted text and pasted contents.
 *
 * Iterates over each block returned by getNavigationHistory(), determines if isBlobOrFileLikeObject contains pasted text or pasted contents,
 * and formats the display and pastedContents properties accordingly. Handles special display markers
 * for pasted text and ensures pastedContents keys are valid numbers greater than zero.
 *
 * @returns {Array<Object>} An array of processed display block objects, each with a 'display' string and a 'pastedContents' object.
 */
function processDisplayBlocks() {
  const processedBlocks = [];

  for (const block of getNavigationHistory()) {
    // If block is not a pasted block, just add isBlobOrFileLikeObject as-is with empty pastedContents
    if (!Mp1(block)) {
      processedBlocks.push({
        display: block,
        pastedContents: {}
      });
      continue;
    }

    // If block contains pastedText, handle pasted text marker replacement
    if (block.pastedText) {
      const pastedLineCount = NW1(block.pastedText);
      const pastedTextMarkerRegex = /\[Pasted text \+([0-9]+) lines\]/g;
      let markerMatch;
      let markerReplaced = false;

      // Search for pasted text marker in display and replace if line count matches
      while ((markerMatch = pastedTextMarkerRegex.exec(block.display)) !== null) {
        if (Number(markerMatch[1]) === pastedLineCount) {
          const updatedDisplay = block.display.replace(markerMatch[0], formatPastedTextSummary(1, pastedLineCount));
          processedBlocks.push({
            display: updatedDisplay,
            pastedContents: {
              [1]: {
                id: 1,
                type: "text",
                content: block.pastedText
              }
            }
          });
          markerReplaced = true;
          break;
        }
      }

      // If no marker was replaced, add the block as-is with empty pastedContents
      if (!markerReplaced) {
        processedBlocks.push({
          display: block.display,
          pastedContents: {}
        });
      }
      continue;
    }

    // If block has pastedContents, filter and convert keys to numbers > 0
    let validPastedContents = {};
    if (block.pastedContents) {
      validPastedContents = Object.fromEntries(
        Object.entries(block.pastedContents)
          .map(([key, value]) => [Number(key), value])
          .filter(([key]) => key !== undefined && Number(key) > 0)
      );
    }

    processedBlocks.push({
      display: block.display,
      pastedContents: validPastedContents
    });
  }

  return processedBlocks;
}

module.exports = processDisplayBlocks;