/**
 * Removes an element from a specific collection based on its kind and id.
 *
 * @param {Object} elementDescriptor - An object describing the element to remove.
 * @param {string|number} elementDescriptor.kind - The kind/type of the collection.
 * @param {string|number} elementDescriptor.id - The unique identifier of the element to remove.
 * @returns {void}
 *
 * @example
 * // Removes the element with id '123' from the 'user' collection
 * eraseElementByKeyFromCollection({ kind: 'user', id: '123' });
 */
function eraseElementByKeyFromCollection(elementDescriptor) {
  // Access the collection by kind and remove the element by its id
  VN[elementDescriptor.kind].eraseElementByKey(elementDescriptor.id);
}

module.exports = eraseElementByKeyFromCollection;