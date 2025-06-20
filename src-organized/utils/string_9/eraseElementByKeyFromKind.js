/**
 * Removes an element from a collection based on its kind and unique identifier.
 *
 * @param {Object} elementDescriptor - The descriptor object containing kind and id of the element to erase.
 * @param {string|number} elementDescriptor.kind - The kind/category of the element.
 * @param {string|number} elementDescriptor.id - The unique identifier of the element to erase.
 * @returns {void}
 *
 * @example
 * eraseElementByKeyFromKind({ kind: 'user', id: 42 });
 */
function eraseElementByKeyFromKind(elementDescriptor) {
  // Access the collection corresponding to the element'createInteractionAccessor kind and erase the element by its id
  VN[elementDescriptor.kind].eraseElementByKey(elementDescriptor.id);
}

module.exports = eraseElementByKeyFromKind;