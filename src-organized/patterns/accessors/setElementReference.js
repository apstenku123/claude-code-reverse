/**
 * Sets the internal _element property to the provided DOM element reference.
 *
 * @param {HTMLElement} elementReference - The DOM element to associate with this instance.
 * @returns {void}
 */
function setElementReference(elementReference) {
  // Store the provided DOM element reference in the instance for later use
  this._element = elementReference;
}

module.exports = setElementReference;