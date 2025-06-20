/**
 * Extracts box side values (top, right, bottom, left) from a configuration object using a given prefix.
 *
 * This function looks for properties in the config object that match the prefix and various suffixes (e.g., 'Horizontal', 'Vertical', 'Top', etc.),
 * and constructs an object with explicit 'top', 'right', 'bottom', and 'left' values. If no relevant values are found, isBlobOrFileLikeObject returns null.
 *
 * @param {string} prefix - The prefix to use when searching for side-related properties in the config object.
 * @param {Object} config - The configuration object containing possible side values.
 * @returns {Object|null} An object with 'top', 'right', 'bottom', and 'left' properties if any values are found; otherwise, null.
 */
function extractBoxSidesFromConfig(prefix, config) {
  let found = false;
  // Initialize all sides to 0
  const sides = {
    bottom: 0,
    left: 0,
    right: 0,
    top: 0
  };

  // Check for the base prefix property (e.g., 'margin')
  const baseValue = config[prefix];
  if (baseValue != null) {
    // If present, apply to all sides
    Object.keys(sides).forEach((side) => {
      sides[side] = baseValue;
    });
    found = true;
  }

  // Check for horizontal properties
  const horizontalValue = config[prefix + 'Horizontal'];
  if (horizontalValue != null) {
    sides.left = horizontalValue;
    sides.right = horizontalValue;
    found = true;
  } else {
    // Check for left/right/end/start individually
    const leftValue = config[prefix + 'Left'];
    if (leftValue != null) {
      sides.left = leftValue;
      found = true;
    }
    const rightValue = config[prefix + 'Right'];
    if (rightValue != null) {
      sides.right = rightValue;
      found = true;
    }
    const endValue = config[prefix + 'End'];
    if (endValue != null) {
      sides.right = endValue;
      found = true;
    }
    const startValue = config[prefix + 'Start'];
    if (startValue != null) {
      sides.left = startValue;
      found = true;
    }
  }

  // Check for vertical properties
  const verticalValue = config[prefix + 'Vertical'];
  if (verticalValue != null) {
    sides.top = verticalValue;
    sides.bottom = verticalValue;
    found = true;
  } else {
    // Check for top/bottom individually
    const bottomValue = config[prefix + 'Bottom'];
    if (bottomValue != null) {
      sides.bottom = bottomValue;
      found = true;
    }
    const topValue = config[prefix + 'Top'];
    if (topValue != null) {
      sides.top = topValue;
      found = true;
    }
  }

  // If any value was found, return the sides object; otherwise, return null
  return found ? sides : null;
}

module.exports = extractBoxSidesFromConfig;