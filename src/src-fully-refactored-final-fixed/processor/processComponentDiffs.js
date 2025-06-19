/**
 * Processes a linked list of diff components, reconstructing their values based on additions, removals, and modifications.
 *
 * @param {Array<string>} joinDelimiterArray - Array used to join string segments (e.g., [""], ["\n"], etc.).
 * @param {Object} componentNode - The tail node of a linked list of diff components. Each node may have 'previousComponent', 'added', 'removed', 'count', and 'value' properties.
 * @param {Array<string>} originalSequence - The original sequence of items (e.g., characters or lines) being diffed.
 * @param {Array<string>} newSequence - The new sequence of items after changes.
 * @param {boolean} preferLargerChange - If true, when both original and new sequences are available, prefers the longer segment.
 * @returns {Array<Object>} An array of processed diff components, each with a reconstructed 'value' property.
 */
function processComponentDiffs(joinDelimiterArray, componentNode, originalSequence, newSequence, preferLargerChange) {
  const components = [];
  let currentNode = componentNode;

  // Traverse the linked list backwards, collecting components
  while (currentNode) {
    components.push(currentNode);
    const previousNode = currentNode.previousComponent;
    delete currentNode.previousComponent; // Clean up reference
    currentNode = previousNode;
  }

  // Reverse to process in the original order
  components.reverse();

  let originalIndex = 0; // Tracks position in originalSequence
  let newIndex = 0;      // Tracks position in newSequence

  for (let i = 0; i < components.length; i++) {
    const component = components[i];

    if (!component.removed) {
      // Not a removal
      if (!component.added && preferLargerChange) {
        // Modification: choose the longer segment between original and new
        let originalSlice = originalSequence.slice(originalIndex, originalIndex + component.count);
        originalSlice = originalSlice.map((originalItem, offset) => {
          const newItem = newSequence[newIndex + offset];
          return (newItem.length > originalItem.length) ? newItem : originalItem;
        });
        component.value = joinDelimiterArray.join(originalSlice);
      } else {
        // Unchanged or added: take from originalSequence
        component.value = joinDelimiterArray.join(originalSequence.slice(originalIndex, originalIndex + component.count));
      }
      originalIndex += component.count;
      if (!component.added) {
        newIndex += component.count;
      }
    } else {
      // Removal: take from newSequence
      component.value = joinDelimiterArray.join(newSequence.slice(newIndex, newIndex + component.count));
      newIndex += component.count;
    }
  }

  return components;
}

module.exports = processComponentDiffs;