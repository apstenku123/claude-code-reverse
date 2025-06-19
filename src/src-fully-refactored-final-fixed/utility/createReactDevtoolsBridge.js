/**
 * Creates a bridge object for communication between React DevTools and a wall interface.
 * Handles message queuing, flushing, and value override events for context, hooks, props, and state.
 *
 * @param {Object} wall - The wall interface for sending and receiving messages.
 * @returns {Object} The bridge object with event handling and message queue management.
 */
function createReactDevtoolsBridge(wall) {
  // Ensure this function is called with the correct context
  validateClassInstance(this, createReactDevtoolsBridge);

  // Create the bridge object using the parent prototype
  const bridge = mapArraysToObjectWithCallback.call(this);

  // Initialize bridge properties
  defineOrAssignProperty(throttleWithReset(bridge), "_isShutdown", false);
  defineOrAssignProperty(throttleWithReset(bridge), "_messageQueue", []);
  defineOrAssignProperty(throttleWithReset(bridge), "_timeoutID", null);
  defineOrAssignProperty(throttleWithReset(bridge), "_wallUnlisten", null);

  /**
   * Flushes the message queue by sending all queued messages through the wall.
   * Reschedules itself if there are still messages in the queue.
   */
  defineOrAssignProperty(throttleWithReset(bridge), "_flush", function flushMessageQueue() {
    // Clear any existing timeout
    if (bridge._timeoutID !== null) {
      clearTimeout(bridge._timeoutID);
      bridge._timeoutID = null;
    }

    // If there are messages in the queue, send them all
    if (bridge._messageQueue.length) {
      for (let i = 0; i < bridge._messageQueue.length; i += 2) {
        // Each pair: [event, payload]
        const wallInstance = bridge._wall;
        const event = bridge._messageQueue[i];
        const payload = bridge._messageQueue[i + 1];
        wallInstance.send.apply(wallInstance, [event].concat(createPropertyValueMatcher(payload)));
      }
      // Clear the queue after sending
      bridge._messageQueue.length = 0;
      // Reschedule the flush in case new messages arrive
      bridge._timeoutID = setTimeout(bridge._flush, safeToString);
    }
  });

  /**
   * Handles override value events for context, hooks, props, and state.
   * Sends the appropriate override message through the bridge.
   *
   * @param {Object} overrideData - The override event data.
   * @param {number|string} overrideData.id - The id of the element.
   * @param {Array<string|number>} overrideData.path - The path to the value.
   * @param {number} overrideData.rendererID - The renderer updateSnapshotAndNotify.
   * @param {string} overrideData.type - The type of override (context, hooks, props, state).
   * @param {*} overrideData.value - The new value to override.
   */
  defineOrAssignProperty(throttleWithReset(bridge), "overrideValueAtPath", function handleOverrideValueAtPath(overrideData) {
    const {
      id,
      path,
      rendererID,
      type,
      value
    } = overrideData;

    // Determine the override type and send the corresponding message
    switch (type) {
      case "context":
        bridge.send("overrideContext", {
          id,
          path,
          rendererID,
          wasForwarded: true,
          value
        });
        break;
      case "hooks":
        bridge.send("overrideHookState", {
          id,
          path,
          rendererID,
          wasForwarded: true,
          value
        });
        break;
      case "props":
        bridge.send("overrideProps", {
          id,
          path,
          rendererID,
          wasForwarded: true,
          value
        });
        break;
      case "state":
        bridge.send("overrideState", {
          id,
          path,
          rendererID,
          wasForwarded: true,
          value
        });
        break;
      default:
        // Unknown type; do nothing
        break;
    }
  });

  // Attach the wall interface to the bridge
  bridge._wall = wall;

  // Listen for messages from the wall and emit corresponding events on the bridge
  bridge._wallUnlisten = wall.listen(function handleWallMessage(message) {
    if (message && message.event) {
      throttleWithReset(bridge).emit(message.event, message.payload);
    }
  }) || null;

  // Register the overrideValueAtPath handler for the corresponding event
  bridge.addListener("overrideValueAtPath", bridge.overrideValueAtPath);

  return bridge;
}

module.exports = createReactDevtoolsBridge;