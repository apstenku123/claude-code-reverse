/**
 * Sets a context object on the current hub instance.
 *
 * This function is typically used to attach additional context information (such as user, tags, or custom data)
 * to the current hub, which can then be used by error tracking or logging systems.
 *
 * @param {string} contextName - The name/key of the context to set (e.g., 'user', 'tags', 'customData').
 * @param {object} contextData - The context data object to associate with the given context name.
 * @returns {void}
 */
function setContextOnCurrentHub(contextName, contextData) {
  // Retrieve the current hub instance and set the provided context
  KQ.getCurrentHub().setContext(contextName, contextData);
}

module.exports = setContextOnCurrentHub;