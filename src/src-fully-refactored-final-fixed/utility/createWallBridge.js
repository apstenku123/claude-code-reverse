/**
 * Creates a bridge object that manages communication with a wall interface, including message queuing,
 * flushing, and handling override events for context, hooks, props, and state.
 *
 * @param {Object} wall - The wall interface object that provides send and listen methods for communication.
 * @returns {Object} The bridge object with event handling and message queue management.
 */
function f(wall) {
  // Ensure proper instantiation and context
  validateClassInstance(this, f);

  // Create the base bridge object
  const bridge = mapArraysToObjectWithCallback.call(this);

  // Attach internal properties to the bridge object
  defineOrAssignProperty(throttleWithReset(bridge), "_isShutdown", false);
  defineOrAssignProperty(throttleWithReset(bridge), "_messageQueue", []);
  defineOrAssignProperty(throttleWithReset(bridge), "_timeoutID", null);
  defineOrAssignProperty(throttleWithReset(bridge), "_wallUnlisten", null);

  /**
   * Flushes the message queue by sending all queued messages through the wall.
   * If messages remain, schedules another flush after a timeout.
   */
  defineOrAssignProperty(throttleWithReset(bridge), "_flush", function flushMessageQueue() {
    // Clear any existing timeout
    if (bridge._timeoutID !== null) {
      clearTimeout(bridge._timeoutID);
      bridge._timeoutID = null;
    }

    // If there are messages in the queue, send them
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
      // Schedule the next flush
      bridge._timeoutID = setTimeout(bridge._flush, safeToString);
    }
  });

  /**
   * Handles override events for context, hooks, props, and state by sending the appropriate message to the wall.
   * @param {Object} overrideData - The override event data.
   * @param {number|string} overrideData.id - The updateSnapshotAndNotify of the target.
   * @param {Array<string|number>} overrideData.path - The path to the value being overridden.
   * @param {number} overrideData.rendererID - The renderer updateSnapshotAndNotify.
   * @param {string} overrideData.type - The type of override ("context", "hooks", "props", "state").
   * @param {*} overrideData.value - The new value to override with.
   */
  defineOrAssignProperty(throttleWithReset(bridge), "overrideValueAtPath", function handleOverrideValueAtPath(overrideData) {
    const {
      id,
      path,
      rendererID,
      type,
      value
    } = overrideData;

    // Determine the event type and send the appropriate message
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
      // No default
    }
  });

  // Attach the wall interface to the bridge
  bridge._wall = wall;

  // Listen for events from the wall and emit them on the bridge
  bridge._wallUnlisten = wall.listen(function handleWallEvent(eventData) {
    if (eventData && eventData.event) {
      throttleWithReset(bridge).emit(eventData.event, eventData.payload);
    }
  }) || null;

  // Listen for overrideValueAtPath events on the bridge
  bridge.addListener("overrideValueAtPath", bridge.overrideValueAtPath);

  return bridge;
}

module.exports = f;