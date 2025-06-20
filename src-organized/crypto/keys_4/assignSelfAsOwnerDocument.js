/**
 * Sets the 'ownerDocument' property of the current object to reference itself.
 *
 * This function is typically used to ensure that the current object has an 'ownerDocument' property
 * pointing to itself, which may be required for compatibility with APIs or frameworks that expect
 * such a property to exist.
 *
 * @function assignSelfAsOwnerDocument
 * @returns {void} Does not return a value.
 */
function assignSelfAsOwnerDocument() {
  // Assign the current object as its own ownerDocument
  this.ownerDocument = this;
}

module.exports = assignSelfAsOwnerDocument;