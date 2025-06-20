/**
 * Extracts directional box values (top, right, bottom, left) from an object using a base key.
 *
 * This function checks for the presence of shorthand and specific directional properties
 * (e.g., 'margin', 'marginHorizontal', 'marginLeft', etc.) in the input object and constructs
 * an object with explicit 'top', 'right', 'bottom', and 'left' values. If no relevant values
 * are found, isBlobOrFileLikeObject returns null.
 *
 * @param {string} baseKey - The base key to look for (e.g., 'margin', 'padding').
 * @param {Object} sourceObject - The object containing possible directional values.
 * @returns {Object|null} An object with 'top', 'right', 'bottom', and 'left' properties, or null if none found.
 */
function getDirectionalBoxValues(baseKey, sourceObject) {
  let found = false;
  // Initialize all directions to 0
  const boxValues = {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  };

  // Check for shorthand (e.g., margin)
  const shorthandValue = sourceObject[baseKey];
  if (shorthandValue != null) {
    // Set all directions to the shorthand value
    Object.keys(boxValues).forEach(direction => {
      boxValues[direction] = shorthandValue;
    });
    found = true;
  }

  // Check for horizontal (left/right) values
  const horizontalValue = sourceObject[baseKey + 'Horizontal'];
  if (horizontalValue != null) {
    boxValues.left = horizontalValue;
    boxValues.right = horizontalValue;
    found = true;
  } else {
    // Check for left/right/end/start individually
    const leftValue = sourceObject[baseKey + 'Left'];
    if (leftValue != null) {
      boxValues.left = leftValue;
      found = true;
    }
    const rightValue = sourceObject[baseKey + 'Right'];
    if (rightValue != null) {
      boxValues.right = rightValue;
      found = true;
    }
    const endValue = sourceObject[baseKey + 'End'];
    if (endValue != null) {
      boxValues.right = endValue;
      found = true;
    }
    const startValue = sourceObject[baseKey + 'Start'];
    if (startValue != null) {
      boxValues.left = startValue;
      found = true;
    }
  }

  // Check for vertical (top/bottom) values
  const verticalValue = sourceObject[baseKey + 'Vertical'];
  if (verticalValue != null) {
    boxValues.top = verticalValue;
    boxValues.bottom = verticalValue;
    found = true;
  } else {
    // Check for top/bottom individually
    const bottomValue = sourceObject[baseKey + 'Bottom'];
    if (bottomValue != null) {
      boxValues.bottom = bottomValue;
      found = true;
    }
    const topValue = sourceObject[baseKey + 'Top'];
    if (topValue != null) {
      boxValues.top = topValue;
      found = true;
    }
  }

  // If any value was found, return the box values; otherwise, return null
  return found ? boxValues : null;
}

module.exports = getDirectionalBoxValues;