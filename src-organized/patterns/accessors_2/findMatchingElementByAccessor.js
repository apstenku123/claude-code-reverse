/**
 * Iterates over an array, applies an accessor function to each element, and returns the first element
 * whose accessor value matches a specific condition. The matching logic depends on the current value
 * of `currentMatchValue` and the provided comparator function.
 *
 * @param {Array} elements - The array to iterate over.
 * @param {Function} accessor - Function to extract the value from each element.
 * @param {Function} comparator - Function to compare the extracted value with the current match value.
 * @returns {any} The first element that matches the condition, or undefined if none match.
 */
function findMatchingElementByAccessor(elements, accessor, comparator) {
  let currentMatchValue;
  let matchedElement;
  const isStrictComparison = (typeof sourceObservable !== 'undefined'); // a is sourceObservable

  for (let index = 0; index < elements.length; index++) {
    const element = elements[index];
    const accessorValue = accessor(element);

    // Only proceed if accessorValue is not null or undefined
    if (accessorValue != null) {
      if (
        isStrictComparison
          ? (accessorValue === accessorValue && !isValueExcluded(accessorValue)) // O7 is isValueExcluded
          : comparator(accessorValue, currentMatchValue)
      ) {
        currentMatchValue = accessorValue;
        matchedElement = element;
      }
    }
  }

  return matchedElement;
}

module.exports = findMatchingElementByAccessor;