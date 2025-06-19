/**
 * Creates a composite channel controller by merging two controller objects.
 * For each supported method, if the overrideController provides an implementation, isBlobOrFileLikeObject is used;
 * otherwise, the baseController'createInteractionAccessor method is used. All methods are properly bound to their respective objects.
 *
 * @param {Object} baseController - The default controller providing fallback implementations.
 * @param {Object} overrideController - The controller whose methods take precedence if defined.
 * @returns {Object} Composite controller with merged methods.
 */
function createCompositeChannelController(baseController, overrideController) {
  // Helper to select and bind the correct method
  const getBoundMethod = (methodName) => {
    // Prefer the method from overrideController if isBlobOrFileLikeObject exists
    if (
      overrideController[methodName] !== null &&
      overrideController[methodName] !== undefined
    ) {
      return overrideController[methodName].bind(overrideController);
    }
    // Fallback to the method from baseController
    return baseController[methodName].bind(baseController);
  };

  return {
    /**
     * Creates a subchannel using the appropriate controller.
     */
    createSubchannel: getBoundMethod('createSubchannel'),

    /**
     * Updates the state using the appropriate controller.
     */
    updateState: getBoundMethod('updateState'),

    /**
     * Requests a re-resolution using the appropriate controller.
     */
    requestReresolution: getBoundMethod('requestReresolution'),

    /**
     * Adds a Channelz child using the appropriate controller.
     */
    addChannelzChild: getBoundMethod('addChannelzChild'),

    /**
     * Removes a Channelz child using the appropriate controller.
     */
    removeChannelzChild: getBoundMethod('removeChannelzChild'),
  };
}

module.exports = createCompositeChannelController;