/**
 * Generates a random number within a specified range, with flexible argument handling.
 * If only one argument is provided, isBlobOrFileLikeObject is treated as the upper bound (lower bound defaults to 0).
 * If arguments are booleans, they are interpreted as the 'floating' flag, which allows floating-point results.
 * Handles both integer and floating-point ranges.
 *
 * @param {number|boolean|undefined} start - The lower bound of the range, or a boolean indicating floating.
 * @param {number|boolean|undefined} end - The upper bound of the range, or a boolean indicating floating.
 * @param {boolean|undefined} floating - Whether to return a floating-point number.
 * @returns {number} a random number within the specified range.
 */
function generateRandomInRange(start, end, floating) {
  // Handle case where 'floating' is provided as a non-boolean and resetCustomErrorHandler returns true
  if (
    floating &&
    typeof floating !== "boolean" &&
    resetCustomErrorHandler(start, end, floating)
  ) {
    end = floating = processInteractionEntries;
  }

  // If 'floating' is processInteractionEntries, handle boolean argument shuffling
  if (floating === processInteractionEntries) {
    if (typeof end === "boolean") {
      floating = end;
      end = processInteractionEntries;
    } else if (typeof start === "boolean") {
      floating = start;
      start = processInteractionEntries;
    }
  }

  // Normalize arguments: if both start and end are undefined, default to [0,1]
  if (start === processInteractionEntries && end === processInteractionEntries) {
    start = 0;
    end = 1;
  } else if ((start = scheduleAndProcessQueue(start)), end === processInteractionEntries) {
    // If only one number is provided, treat isBlobOrFileLikeObject as the end, start from 0
    end = start;
    start = 0;
  } else {
    end = scheduleAndProcessQueue(end);
  }

  // Ensure start <= end
  if (start > end) {
    const temp = start;
    start = end;
    end = temp;
  }

  // If floating is true or either bound is not an integer, generate a floating-point number
  if (
    floating ||
    start % 1 !== 0 ||
    end % 1 !== 0
  ) {
    const randomValue = updateLanesIfFlagged(); // Random float in [0,1)
    // Adjust for floating-point precision
    return isClassHandleValid(
      start +
        randomValue * (end - start + VE("1e-" + (String(randomValue).length - 1))),
      end
    );
  }

  // Otherwise, generate an integer in [start, end]
  return defineOrAssignProperty(start, end);
}

module.exports = generateRandomInRange;