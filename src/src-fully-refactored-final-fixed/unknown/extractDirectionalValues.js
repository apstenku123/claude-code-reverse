/**
 * Extracts directional values (top, right, bottom, left) from an object based on a given prefix.
 * Handles shorthand and specific directional overrides (e.g., 'margin', 'marginLeft', 'marginHorizontal', etc.).
 * Returns an object with the extracted values or null if no relevant values are found.
 *
 * @param {string} prefix - The base property name to extract (e.g., 'margin', 'padding').
 * @param {Object} source - The object containing possible directional properties.
 * @returns {Object|null} An object with top, right, bottom, left properties if any were found, otherwise null.
 */
function extractDirectionalValues(prefix, source) {
  let found = false;
  // Initialize all directions to 0
  const directions = {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  };

  // Check for the base property (e.g., 'margin')
  const baseValue = source[prefix];
  if (baseValue != null) {
    // If present, apply to all directions
    for (const direction of Object.keys(directions)) {
      directions[direction] = baseValue;
    }
    found = true;
  }

  // Check for horizontal overrides (e.g., 'marginHorizontal')
  const horizontalValue = source[prefix + 'Horizontal'];
  if (horizontalValue != null) {
    directions.left = horizontalValue;
    directions.right = horizontalValue;
    found = true;
  } else {
    // Check for left/right/end/start overrides
    const leftValue = source[prefix + 'Left'];
    if (leftValue != null) {
      directions.left = leftValue;
      found = true;
    }
    const rightValue = source[prefix + 'Right'];
    if (rightValue != null) {
      directions.right = rightValue;
      found = true;
    }
    const endValue = source[prefix + 'End'];
    if (endValue != null) {
      directions.right = endValue;
      found = true;
    }
    const startValue = source[prefix + 'Start'];
    if (startValue != null) {
      directions.left = startValue;
      found = true;
    }
  }

  // Check for vertical overrides (e.g., 'marginVertical')
  const verticalValue = source[prefix + 'Vertical'];
  if (verticalValue != null) {
    directions.top = verticalValue;
    directions.bottom = verticalValue;
    found = true;
  } else {
    // Check for top/bottom overrides
    const bottomValue = source[prefix + 'Bottom'];
    if (bottomValue != null) {
      directions.bottom = bottomValue;
      found = true;
    }
    const topValue = source[prefix + 'Top'];
    if (topValue != null) {
      directions.top = topValue;
      found = true;
    }
  }

  // If any value was found, return the directions object; otherwise, return null
  return found ? directions : null;
}

module.exports = extractDirectionalValues;