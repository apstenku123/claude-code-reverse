/**
 * Removes an element from the VN collection based on its kind and id.
 *
 * @param {Object} elementDescriptor - An object describing the element to erase.
 * @param {string|number} elementDescriptor.kind - The kind/category of the element.
 * @param {string|number} elementDescriptor.id - The unique identifier of the element.
 * @returns {void}
 */
function eraseElementByKindAndId(elementDescriptor) {
  // Access the collection for the given kind and remove the element by its id
  VN[elementDescriptor.kind].eraseElementByKey(elementDescriptor.id);
}

module.exports = eraseElementByKindAndId;