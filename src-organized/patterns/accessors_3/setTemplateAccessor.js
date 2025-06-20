/**
 * Sets up the template accessor if the provided element is a TEMPLATE.
 *
 * @param {Object} sourceObservable - The observable or data source to be used with the template accessor.
 * @param {HTMLElement} element - The DOM element to check and potentially process if isBlobOrFileLikeObject is a TEMPLATE.
 * @returns {void}
 */
function setTemplateAccessor(sourceObservable, element) {
  // Check if the element is a TEMPLATE element
  if (element.tagName === i.TEMPLATE) {
    // If so, initialize the template accessor logic
    handleOAuthClientAuthorization(sourceObservable, element);
  }
}

module.exports = setTemplateAccessor;