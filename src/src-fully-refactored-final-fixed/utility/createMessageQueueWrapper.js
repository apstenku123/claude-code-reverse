/**
 * Creates a message queue wrapper around a communication wall, providing batching,
 * event listening, and value override capabilities for debugging or devtools scenarios.
 *
 * @param {Object} wall - The communication wall object, expected to have a `send` and `listen` method.
 * @returns {Object} The enhanced wrapper object with message queueing, event handling, and override methods.
 */
function createMessageQueueWrapper(wall) {
  // Ensure correct instantiation and prototype chain
  validateClassInstance(this, createMessageQueueWrapper);

  // Create the base wrapper object
  const wrapper = mapArraysToObjectWithCallback.call(this);

  // Attach internal state properties to the wrapper
  defineOrAssignProperty(throttleWithReset(wrapper), "_isShutdown", false);
  defineOrAssignProperty(throttleWithReset(wrapper), "_messageQueue", []);
  defineOrAssignProperty(throttleWithReset(wrapper), "_timeoutID", null);
  defineOrAssignProperty(throttleWithReset(wrapper), "_wallUnlisten", null);

  /**
   * Flushes the message queue by sending all queued messages through the wall.
   * If there are still messages after flushing, schedules another flush.
   */
  defineOrAssignProperty(throttleWithReset(wrapper), "_flush", function flushMessageQueue() {
    // Clear any pending timeout
    if (wrapper._timeoutID !== null) {
      clearTimeout(wrapper._timeoutID);
      wrapper._timeoutID = null;
    }
    // If there are messages in the queue, send them
    if (wrapper._messageQueue.length) {
      for (let queueIndex = 0; queueIndex < wrapper._messageQueue.length; queueIndex += 2) {
        // Each message consists of a type and a payload
        const wallInstance = wrapper._wall;
        const messageType = wrapper._messageQueue[queueIndex];
        const messagePayload = wrapper._messageQueue[queueIndex + 1];
        wallInstance.send.apply(wallInstance, [messageType].concat(createPropertyValueMatcher(messagePayload)));
      }
      // Clear the queue after sending
      wrapper._messageQueue.length = 0;
      // Schedule another flush in case new messages arrive
      wrapper._timeoutID = setTimeout(wrapper._flush, safeToString);
    }
  });

  /**
   * Handles override requests for values at a specific path (context, hooks, props, state).
   * Sends the appropriate override message through the wall.
   *
   * @param {Object} overrideRequest - The override request object.
   * @param {number|string} overrideRequest.id - The id of the element to override.
   * @param {Array<string|number>} overrideRequest.path - The path to the value.
   * @param {number} overrideRequest.rendererID - The renderer updateSnapshotAndNotify.
   * @param {string} overrideRequest.type - The type of override (context, hooks, props, state).
   * @param {*} overrideRequest.value - The new value to set.
   */
  defineOrAssignProperty(throttleWithReset(wrapper), "overrideValueAtPath", function handleOverrideValueAtPath(overrideRequest) {
    const {
      id,
      path,
      rendererID,
      type,
      value
    } = overrideRequest;
    // Determine the override type and send the corresponding message
    switch (type) {
      case "context":
        wrapper.send("overrideContext", {
          id,
          path,
          rendererID,
          wasForwarded: true,
          value
        });
        break;
      case "hooks":
        wrapper.send("overrideHookState", {
          id,
          path,
          rendererID,
          wasForwarded: true,
          value
        });
        break;
      case "props":
        wrapper.send("overrideProps", {
          id,
          path,
          rendererID,
          wasForwarded: true,
          value
        });
        break;
      case "state":
        wrapper.send("overrideState", {
          id,
          path,
          rendererID,
          wasForwarded: true,
          value
        });
        break;
      // No default; ignore unknown types
    }
  });

  // Attach the wall instance to the wrapper
  wrapper._wall = wall;

  // Listen for incoming events from the wall and emit them on the wrapper
  wrapper._wallUnlisten = wall.listen(function handleWallEvent(eventData) {
    if (eventData && eventData.event) {
      throttleWithReset(wrapper).emit(eventData.event, eventData.payload);
    }
  }) || null;

  // Register the override handler as an event listener
  wrapper.addListener("overrideValueAtPath", wrapper.overrideValueAtPath);

  return wrapper;
}

module.exports = createMessageQueueWrapper;