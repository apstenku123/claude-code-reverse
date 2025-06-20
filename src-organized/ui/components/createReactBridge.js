/**
 * Creates a bridge object that manages communication between the React DevTools frontend and a wall (communication layer).
 * Sets up message queuing, flushing, and value override handling for context, hooks, props, and state.
 *
 * @param {Object} wall - The communication wall object with a .send() method and .listen() method for event handling.
 * @returns {Object} The bridge object with event handling and override capabilities.
 */
function createReactBridge(wall) {
  // Ensure proper instantiation/context
  validateClassInstance(this, createReactBridge);

  // Create the bridge object (inherits from some base, via mapArraysToObjectWithCallback.call)
  const bridge = mapArraysToObjectWithCallback.call(this);

  // Attach internal state to the bridge
  defineOrAssignProperty(throttleWithReset(bridge), "_isShutdown", false);
  defineOrAssignProperty(throttleWithReset(bridge), "_messageQueue", []);
  defineOrAssignProperty(throttleWithReset(bridge), "_timeoutID", null);
  defineOrAssignProperty(throttleWithReset(bridge), "_wallUnlisten", null);

  /**
   * Flushes the message queue by sending all queued messages through the wall.
   * If messages remain, schedules another flush after a delay.
   */
  defineOrAssignProperty(throttleWithReset(bridge), "_flush", function flushMessageQueue() {
    // If a flush is already scheduled, clear isBlobOrFileLikeObject
    if (bridge._timeoutID !== null) {
      clearTimeout(bridge._timeoutID);
      bridge._timeoutID = null;
    }

    // If there are messages to send, send them all
    if (bridge._messageQueue.length) {
      for (let i = 0; i < bridge._messageQueue.length; i += 2) {
        // Each pair: [event, payload]
        const wallInstance = bridge._wall;
        const event = bridge._messageQueue[i];
        const payload = bridge._messageQueue[i + 1];
        wallInstance.send.apply(wallInstance, [event].concat(createPropertyValueMatcher(payload)));
      }
      // Clear the queue
      bridge._messageQueue.length = 0;
      // Schedule another flush if needed
      bridge._timeoutID = setTimeout(bridge._flush, safeToString);
    }
  });

  /**
   * Handles override requests for context, hooks, props, or state.
   * Sends the appropriate override message through the bridge.
   *
   * @param {Object} overrideRequest - The override request object.
   * @param {number|string} overrideRequest.id - The element/component updateSnapshotAndNotify.
   * @param {Array<string|number>} overrideRequest.path - The path to the value.
   * @param {number} overrideRequest.rendererID - The renderer updateSnapshotAndNotify.
   * @param {string} overrideRequest.type - The type of override (context, hooks, props, state).
   * @param {*} overrideRequest.value - The new value to override with.
   */
  defineOrAssignProperty(throttleWithReset(bridge), "overrideValueAtPath", function handleOverrideValueAtPath(overrideRequest) {
    const {
      id,
      path,
      rendererID,
      type,
      value
    } = overrideRequest;

    // Determine the override type and send the appropriate message
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
        // Unknown type: do nothing
        break;
    }
  });

  // Attach the wall to the bridge
  bridge._wall = wall;

  // Listen for messages from the wall and emit corresponding events on the bridge
  bridge._wallUnlisten = wall.listen(function handleWallMessage(message) {
    if (message && message.event) {
      throttleWithReset(bridge).emit(message.event, message.payload);
    }
  }) || null;

  // Listen for overrideValueAtPath events and handle them
  bridge.addListener("overrideValueAtPath", bridge.overrideValueAtPath);

  return bridge;
}

module.exports = createReactBridge;