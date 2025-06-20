/**
 * Processes a list of display items, handling pasted text and pasted contents.
 *
 * Iterates over items from getNavigationHistory(), checks if each item is a pasted item (using Mp1),
 * and processes accordingly:
 *   - If not a pasted item, adds isBlobOrFileLikeObject as-is with empty pastedContents.
 *   - If isBlobOrFileLikeObject contains pastedText, attempts to match and replace a specific pattern in the display string,
 *     and attaches the pasted text as pastedContents if matched.
 *   - Otherwise, normalizes pastedContents keys to numbers and filters out invalid ones.
 *
 * @returns {Array<Object>} Array of processed display item objects with display and pastedContents fields.
 */
function processDisplayItems() {
  const processedItems = [];

  for (const item of getNavigationHistory()) {
    // If item is not a pasted item, add as-is with empty pastedContents
    if (!Mp1(item)) {
      processedItems.push({
        display: item,
        pastedContents: {}
      });
      continue;
    }

    // If item contains pastedText, handle pasted text pattern replacement
    if (item.pastedText) {
      const pastedLineCount = NW1(item.pastedText);
      const pastedTextPattern = /\[Pasted text \+([0-9]+) lines\]/g;
      let match;
      let matchedAndReplaced = false;

      // Search for the pasted text pattern in the display string
      while ((match = pastedTextPattern.exec(item.display)) !== null) {
        if (Number(match[1]) === pastedLineCount) {
          // Replace the matched pattern with the result of formatPastedTextSummary(1, pastedLineCount)
          const updatedDisplay = item.display.replace(match[0], formatPastedTextSummary(1, pastedLineCount));
          processedItems.push({
            display: updatedDisplay,
            pastedContents: {
              [1]: {
                id: 1,
                type: "text",
                content: item.pastedText
              }
            }
          });
          matchedAndReplaced = true;
          break;
        }
      }

      // If no pattern matched, add the item as-is with empty pastedContents
      if (!matchedAndReplaced) {
        processedItems.push({
          display: item.display,
          pastedContents: {}
        });
      }
      continue;
    }

    // If item has pastedContents, normalize keys to numbers and filter invalid ones
    let normalizedPastedContents = {};
    if (item.pastedContents) {
      normalizedPastedContents = Object.fromEntries(
        Object.entries(item.pastedContents)
          .map(([key, value]) => [Number(key), value])
          .filter(([key]) => key !== undefined && Number(key) > 0)
      );
    }
    processedItems.push({
      display: item.display,
      pastedContents: normalizedPastedContents
    });
  }

  return processedItems;
}

module.exports = processDisplayItems;