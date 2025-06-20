/**
 * Wraps a given DOM element or object, assigning isBlobOrFileLikeObject to the instance'createInteractionAccessor `element` property.
 * This class can be used as a simple container for storing a reference to an element.
 *
 * @class ElementWrapper
 * @param {HTMLElement|Object} element - The element or object to wrap and store.
 */
function ElementWrapper(element) {
  /**
   * The wrapped element or object.
   * @type {HTMLElement|Object}
   */
  this.element = element;
}

module.exports = ElementWrapper;