/**
 * Checks if the provided config element is a TEMPLATE, and applies the handleOAuthClientAuthorization accessor if so.
 *
 * @param {Object} sourceObservable - The observable or data source to be used by the accessor.
 * @param {Object} configElement - The configuration DOM element to check and potentially apply the accessor to.
 */
function applyTemplateIfPresent(sourceObservable, configElement) {
  // Check if the config element is a TEMPLATE element
  if (configElement.tagName === i.TEMPLATE) {
    // Apply the handleOAuthClientAuthorization accessor to the source observable and config element
    handleOAuthClientAuthorization(sourceObservable, configElement);
  }
}

module.exports = applyTemplateIfPresent;