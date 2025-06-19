/**
 * Sets the provided client on the current hub'createInteractionAccessor stack top and updates the scope.
 *
 * @param {object} client - The client instance to set on the current hub.
 * @returns {void}
 *
 * This function retrieves the current hub'createInteractionAccessor stack top, assigns the provided client to isBlobOrFileLikeObject,
 * and updates the scope to use the same client. This ensures that subsequent operations
 * on the current hub use the specified client instance.
 */
function setClientOnCurrentHub(client) {
  // Retrieve the current hub'createInteractionAccessor stack top object
  const currentStackTop = qA9.getCurrentHub().getStackTop();

  // Assign the provided client to the stack top
  currentStackTop.client = client;

  // Update the scope to use the new client
  currentStackTop.scope.setClient(client);
}

module.exports = setClientOnCurrentHub;