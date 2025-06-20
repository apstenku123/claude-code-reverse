/**
 * Traverses the debug owner chain of a React element (or similar structure),
 * mapping each owner in the chain using the provided key-mapping function.
 *
 * @param {any} element - The element whose debug owner chain will be traversed.
 * @returns {Array<object>|null} An array of mapped debug owners from the element up the chain, or null if input is invalid.
 */
function getDebugOwnerChain(element) {
  // Process the input element using the external transformation and formatting function
  const processedElement = processInputWithTransformAndFormat(element);
  if (processedElement == null) return null;

  // Start the chain with the mapped keys of the processed element
  const ownerChain = [mapObjectKeys(processedElement)];
  let currentOwner = processedElement._debugOwner;

  // Traverse up the debug owner chain as long as the tag is a number
  while (currentOwner != null) {
    if (typeof currentOwner.tag === "number") {
      ownerChain.unshift(mapObjectKeys(currentOwner));
      currentOwner = currentOwner._debugOwner;
    } else {
      // Stop traversing if the tag is not a number
      break;
    }
  }

  return ownerChain;
}

module.exports = getDebugOwnerChain;