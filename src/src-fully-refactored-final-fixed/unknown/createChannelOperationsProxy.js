/**
 * Creates a proxy object that delegates channel operations to either the override implementation (if provided) or the default implementation.
 *
 * @param {object} defaultChannelOperations - The default set of channel operation implementations.
 * @param {object} [overrideChannelOperations={}] - An optional object containing override implementations for channel operations.
 * @returns {object} An object with channel operation methods, each delegated to the override if present, otherwise to the default.
 */
function createChannelOperationsProxy(defaultChannelOperations, overrideChannelOperations = {}) {
  // Helper to get the bound method from override or fallback to default
  const getBoundMethod = (methodName) => {
    // Check if override provides the method
    if (
      overrideChannelOperations[methodName] !== null &&
      overrideChannelOperations[methodName] !== undefined
    ) {
      return overrideChannelOperations[methodName].bind(overrideChannelOperations);
    }
    // Fallback to default implementation
    return defaultChannelOperations[methodName].bind(defaultChannelOperations);
  };

  return {
    createSubchannel: getBoundMethod('createSubchannel'),
    updateState: getBoundMethod('updateState'),
    requestReresolution: getBoundMethod('requestReresolution'),
    addChannelzChild: getBoundMethod('addChannelzChild'),
    removeChannelzChild: getBoundMethod('removeChannelzChild')
  };
}

module.exports = createChannelOperationsProxy;