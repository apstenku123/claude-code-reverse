/**
 * Checks if any item in the provided input (or the input itself) contains a magic pattern.
 * Utilizes the mJ class to determine if the 'magic' pattern exists for each item.
 *
 * @param {any|any[]} items - a single item or an array of items to check for magic patterns.
 * @param {Object} [options={}] - Optional configuration object passed to the mJ constructor.
 * @returns {boolean} Returns true if any item contains a magic pattern; otherwise, false.
 */
function containsMagicPattern(items, options = {}) {
  // Ensure items is always an array for uniform processing
  const itemsArray = Array.isArray(items) ? items : [items];

  // Iterate through each item and check for magic pattern
  for (const item of itemsArray) {
    const magicChecker = new mJ(item, options);
    if (magicChecker.hasMagic()) {
      return true; // Return true as soon as a magic pattern is found
    }
  }

  // No magic pattern found in any item
  return false;
}

module.exports = containsMagicPattern;