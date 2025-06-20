/**
 * Subscribes to renderer-related events and manages renderer interfaces for React DevTools integration.
 * Handles renderer attachment, unsupported versions, fast refresh, operations, and trace updates.
 * Sets up cleanup logic and ensures proper teardown on shutdown.
 *
 * @param {Object} rendererEventEmitter - The event emitter for renderer events (isWildcardOrX)
 * @param {Object} devtoolsAgent - The React DevTools agent instance (mapArraysToObjectWithCallback)
 * @param {any} agentConfig - Additional configuration for the agent (f)
 * @returns {Function} Cleanup function to unsubscribe all listeners and clean up renderer interfaces
 */
function subscribeToRendererEvents(rendererEventEmitter, devtoolsAgent, agentConfig) {
  if (rendererEventEmitter == null) {
    // If no event emitter is provided, return a no-op cleanup function
    return function () {};
  }

  /**
   * Array of unsubscribe functions for all event subscriptions
   * @type {Function[]}
   */
  const unsubscribeFunctions = [
    // Subscribe to 'renderer-attached' event
    rendererEventEmitter.sub("renderer-attached", function (event) {
      const {
        id: rendererId,
        renderer,
        rendererInterface
      } = event;
      // Register the renderer interface and flush initial operations
      devtoolsAgent.setRendererInterface(rendererId, rendererInterface);
      rendererInterface.flushInitialOperations();
    }),
    // Subscribe to 'unsupported-renderer-version' event
    rendererEventEmitter.sub("unsupported-renderer-version", function (rendererId) {
      devtoolsAgent.onUnsupportedRenderer(rendererId);
    }),
    // Subscribe to 'fastRefreshScheduled' event
    rendererEventEmitter.sub("fastRefreshScheduled", devtoolsAgent.onFastRefreshScheduled),
    // Subscribe to 'operations' event
    rendererEventEmitter.sub("operations", devtoolsAgent.onHookOperations),
    // Subscribe to 'traceUpdates' event
    rendererEventEmitter.sub("traceUpdates", devtoolsAgent.onTraceUpdates)
  ];

  /**
   * Attaches a renderer interface if the renderer version is supported.
   * Emits appropriate events based on the outcome.
   *
   * @param {number|string} rendererId - The unique updateSnapshotAndNotify of the renderer
   * @param {Object} renderer - The renderer instance
   */
  const attachRendererInterface = function attachRendererInterface(rendererId, renderer) {
    // Check if the renderer version is supported
    if (!Ww1(renderer.reconcilerVersion || renderer.version)) {
      return;
    }
    // Try to get an existing renderer interface
    let rendererInterface = rendererEventEmitter.rendererInterfaces.get(rendererId);
    if (rendererInterface == null) {
      // Create a new renderer interface if possible
      if (typeof renderer.findFiberByHostInstance === "function") {
        rendererInterface = areArraysEquivalentDeep(rendererEventEmitter, rendererId, renderer, agentConfig);
      } else if (renderer.ComponentTree) {
        rendererInterface = Yw1(rendererEventEmitter, rendererId, renderer, agentConfig);
      }
      if (rendererInterface != null) {
        rendererEventEmitter.rendererInterfaces.set(rendererId, rendererInterface);
      }
    }
    if (rendererInterface != null) {
      // Notify that the renderer has been attached
      rendererEventEmitter.emit("renderer-attached", {
        id: rendererId,
        renderer: renderer,
        rendererInterface: rendererInterface
      });
    } else {
      // Notify that the renderer version is unsupported
      rendererEventEmitter.emit("unsupported-renderer-version", rendererId);
    }
  };

  // Attach renderer interfaces for all existing renderers
  rendererEventEmitter.renderers.forEach(function (renderer, rendererId) {
    attachRendererInterface(rendererId, renderer);
  });

  // Subscribe to new renderer events
  unsubscribeFunctions.push(
    rendererEventEmitter.sub("renderer", function (event) {
      const {
        id: rendererId,
        renderer
      } = event;
      attachRendererInterface(rendererId, renderer);
    })
  );

  // Notify that React DevTools is connected
  rendererEventEmitter.emit("react-devtools", devtoolsAgent);
  rendererEventEmitter.reactDevtoolsAgent = devtoolsAgent;

  /**
   * Cleanup function to remove all subscriptions and clean up renderer interfaces
   */
  const cleanup = function cleanup() {
    // Unsubscribe all event listeners
    unsubscribeFunctions.forEach(function (unsubscribe) {
      unsubscribe();
    });
    // Clean up all renderer interfaces
    rendererEventEmitter.rendererInterfaces.forEach(function (rendererInterface) {
      rendererInterface.cleanup();
    });
    // Remove reference to the DevTools agent
    rendererEventEmitter.reactDevtoolsAgent = null;
  };

  // Listen for shutdown event to trigger cleanup
  devtoolsAgent.addListener("shutdown", cleanup);
  // Add a function to remove the shutdown listener to the unsubscribe list
  unsubscribeFunctions.push(function () {
    devtoolsAgent.removeListener("shutdown", cleanup);
  });

  // Return a function to perform full cleanup
  return function () {
    unsubscribeFunctions.forEach(function (unsubscribe) {
      unsubscribe();
    });
  };
}

module.exports = subscribeToRendererEvents;
