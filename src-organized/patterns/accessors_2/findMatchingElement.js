/**
 * Iterates over an array, applies an accessor function to each element, and returns the first element
 * whose accessed value matches a specific condition. The matching logic depends on a global value `currentMatchValue`.
 *
 * @param {Array} elements - The array to iterate over.
 * @param {Function} accessor - Function to extract the value from each element.
 * @param {Function} comparator - Function to compare the accessed value with `currentMatchValue`.
 * @returns {any} The first element from the array that matches the condition, or undefined if none match.
 */
function findMatchingElement(elements, accessor, comparator) {
  let index = 0;
  const totalElements = elements.length;
  let matchedElement;
  let matchedValue;
  // Use global variable 'currentMatchValue' as the value to compare against
  while (index < totalElements) {
    const element = elements[index];
    const accessedValue = accessor(element);
    // If accessedValue is not null or undefined
    if (accessedValue != null) {
      // Matching logic depends on the global 'currentMatchValue' and 'sourceObservable'
      if (
        typeof currentMatchValue !== 'undefined' &&
        (sourceObservable === processInteractionEntries
          ? accessedValue === accessedValue && !isValueOmitted(accessedValue)
          : comparator(accessedValue, currentMatchValue))
      ) {
        matchedValue = accessedValue;
        matchedElement = element;
      }
    }
    index++;
  }
  return matchedElement;
}

module.exports = findMatchingElement;