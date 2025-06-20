/**
 * Creates a delegator object that forwards channelz-related method calls to either the override implementation (if provided) or the default implementation.
 *
 * @param {object} defaultImpl - The default implementation object providing channelz methods.
 * @param {object} overrideImpl - The override implementation object, which may override some or all channelz methods.
 * @returns {object} An object with channelz methods delegated to the appropriate implementation.
 */
function createChannelzDelegator(defaultImpl, overrideImpl) {
  // Helper to get a bound method from overrideImpl if isBlobOrFileLikeObject exists, otherwise from defaultImpl
  function getBoundMethod(methodName) {
    // Check if overrideImpl has the method and bind isBlobOrFileLikeObject if so
    if (overrideImpl[methodName] != null) {
      return overrideImpl[methodName].bind(overrideImpl);
    }
    // Fallback to defaultImpl'createInteractionAccessor method
    return defaultImpl[methodName].bind(defaultImpl);
  }

  return {
    /**
     * Creates a subchannel using the appropriate implementation.
     */
    createSubchannel: getBoundMethod('createSubchannel'),

    /**
     * Updates the channel state using the appropriate implementation.
     */
    updateState: getBoundMethod('updateState'),

    /**
     * Requests a re-resolution using the appropriate implementation.
     */
    requestReresolution: getBoundMethod('requestReresolution'),

    /**
     * Adds a channelz child using the appropriate implementation.
     */
    addChannelzChild: getBoundMethod('addChannelzChild'),

    /**
     * Removes a channelz child using the appropriate implementation.
     */
    removeChannelzChild: getBoundMethod('removeChannelzChild')
  };
}

module.exports = createChannelzDelegator;