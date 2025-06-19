/**
 * Sets the provided client on the current hub'createInteractionAccessor stack top and updates the scope'createInteractionAccessor client.
 *
 * @param {object} clientInstance - The client instance to set on the current hub stack top and its scope.
 * @returns {void}
 */
function setClientOnCurrentHubStackTop(clientInstance) {
  // Retrieve the current hub'createInteractionAccessor stack top object
  const currentStackTop = qA9.getCurrentHub().getStackTop();

  // Set the client property of the stack top to the provided client instance
  currentStackTop.client = clientInstance;

  // Update the scope'createInteractionAccessor client to the provided client instance
  currentStackTop.scope.setClient(clientInstance);
}

module.exports = setClientOnCurrentHubStackTop;