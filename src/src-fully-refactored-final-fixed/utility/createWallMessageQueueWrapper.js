/**
 * Creates a wrapper object that manages a message queue for a wall interface, 
 * providing batching, flushing, and override value handling for React DevTools-like communication.
 *
 * @param {Object} wallInterface - The wall interface object, expected to have a `send` and `listen` method.
 * @returns {Object} The wrapper object with message queue management and override value handling.
 */
function createWallMessageQueueWrapper(wallInterface) {
  // Ensure proper instantiation and prototype chain
  validateClassInstance(this, createWallMessageQueueWrapper);

  // Create the base object using the parent constructor
  const wrapper = mapArraysToObjectWithCallback.call(this);

  // Attach internal state properties to the wrapper
  defineOrAssignProperty(throttleWithReset(wrapper), "_isShutdown", false);
  defineOrAssignProperty(throttleWithReset(wrapper), "_messageQueue", []);
  defineOrAssignProperty(throttleWithReset(wrapper), "_timeoutID", null);
  defineOrAssignProperty(throttleWithReset(wrapper), "_wallUnlisten", null);

  /**
   * Flushes the message queue by sending all queued messages through the wall interface.
   * If there are still messages after flushing, schedules another flush.
   */
  defineOrAssignProperty(throttleWithReset(wrapper), "_flush", function flushMessageQueue() {
    // Clear any existing timeout
    if (wrapper._timeoutID !== null) {
      clearTimeout(wrapper._timeoutID);
      wrapper._timeoutID = null;
    }
    // If there are messages in the queue, send them
    if (wrapper._messageQueue.length) {
      for (let i = 0; i < wrapper._messageQueue.length; i += 2) {
        // Each message is a pair: [event, payload]
        const wall = wrapper._wall;
        const event = wrapper._messageQueue[i];
        const payload = wrapper._messageQueue[i + 1];
        wall.send.apply(wall, [event].concat(createPropertyValueMatcher(payload)));
      }
      // Clear the queue
      wrapper._messageQueue.length = 0;
      // Schedule the next flush if more messages arrive
      wrapper._timeoutID = setTimeout(wrapper._flush, safeToString);
    }
  });

  /**
   * Handles override value events for context, hooks, props, and state.
   * Sends the appropriate override message through the wall interface.
   *
   * @param {Object} overrideInfo - The override information object.
   * @param {number|string} overrideInfo.id - The id of the element to override.
   * @param {Array<string|number>} overrideInfo.path - The path to the value.
   * @param {number} overrideInfo.rendererID - The renderer updateSnapshotAndNotify.
   * @param {string} overrideInfo.type - The type of override (context, hooks, props, state).
   * @param {*} overrideInfo.value - The value to override with.
   */
  defineOrAssignProperty(throttleWithReset(wrapper), "overrideValueAtPath", function handleOverrideValueAtPath(overrideInfo) {
    const {
      id,
      path,
      rendererID,
      type,
      value
    } = overrideInfo;
    // Determine the type of override and send the appropriate message
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
      default:
        // Unknown type, do nothing
        break;
    }
  });

  // Attach the wall interface to the wrapper
  wrapper._wall = wallInterface;

  // Listen for events from the wall and emit them on the wrapper
  wrapper._wallUnlisten = wallInterface.listen(function handleWallEvent(eventData) {
    if (eventData && eventData.event) {
      throttleWithReset(wrapper).emit(eventData.event, eventData.payload);
    }
  }) || null;

  // Listen for override value events
  wrapper.addListener("overrideValueAtPath", wrapper.overrideValueAtPath);

  return wrapper;
}

module.exports = createWallMessageQueueWrapper;