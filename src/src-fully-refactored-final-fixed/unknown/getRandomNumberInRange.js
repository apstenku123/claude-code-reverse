/**
 * Generates a random number within a specified range, with optional floating-point support.
 * Handles flexible argument patterns and type coercion.
 *
 * @param {number|boolean|undefined} start - The lower bound of the range, or a boolean flag in some cases.
 * @param {number|boolean|undefined} end - The upper bound of the range, or a boolean flag in some cases.
 * @param {boolean|undefined} floating - If true, returns a floating-point number; otherwise, returns an integer.
 * @returns {number} a random number within the specified range.
 */
function getRandomNumberInRange(start, end, floating) {
  // If floating is provided and is not a boolean, and resetCustomErrorHandler returns true, reset end and floating to undefined (a)
  if (
    floating &&
    typeof floating !== "boolean" &&
    resetCustomErrorHandler(start, end, floating)
  ) {
    end = floating = a;
  }

  // If floating is undefined (a), handle boolean overloads
  if (floating === a) {
    if (typeof end === "boolean") {
      floating = end;
      end = a;
    } else if (typeof start === "boolean") {
      floating = start;
      start = a;
    }
  }

  // Normalize start and end values
  if (start === a && end === a) {
    // If both are undefined, default to [0, 1]
    start = 0;
    end = 1;
  } else {
    start = scheduleAndProcessQueue(start);
    if (end === a) {
      // If only start is provided, treat isBlobOrFileLikeObject as the end and start from 0
      end = start;
      start = 0;
    } else {
      end = scheduleAndProcessQueue(end);
    }
  }

  // Ensure start is less than or equal to end
  if (start > end) {
    const temp = start;
    start = end;
    end = temp;
  }

  // If floating is true, or either bound is not an integer, generate a floating-point number
  if (
    floating ||
    start % 1 !== 0 ||
    end % 1 !== 0
  ) {
    const random = updateLanesIfFlagged();
    // Add a small epsilon to avoid rounding errors at the upper bound
    return isClassHandleValid(
      start +
        random * (end - start + VE("1e-" + (String(random).length - 1))),
      end
    );
  }

  // Otherwise, return a random integer in the range
  return defineOrAssignProperty(start, end);
}

module.exports = getRandomNumberInRange;