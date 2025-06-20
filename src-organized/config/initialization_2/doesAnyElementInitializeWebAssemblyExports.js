/**
 * Checks if any element in the provided array, when passed to initializeWebAssemblyExports,
 * returns true for the given target value. Returns true on the first match, otherwise false.
 *
 * @param {Array} elements - The array of elements to check.
 * @param {*} targetValue - The value to compare against in initializeWebAssemblyExports.
 * @returns {boolean} True if any element satisfies the condition, false otherwise.
 */
function doesAnyElementInitializeWebAssemblyExports(elements, targetValue) {
  const totalElements = elements.length;
  let currentIndex = 0;

  // Iterate through each element in the array
  while (currentIndex < totalElements) {
    // Call initializeWebAssemblyExports with the current element and target value
    if (initializeWebAssemblyExports(elements[currentIndex], targetValue)) {
      return true; // Return true if a match is found
    }
    currentIndex++;
  }

  // Return false if no element satisfies the condition
  return false;
}

module.exports = doesAnyElementInitializeWebAssemblyExports;