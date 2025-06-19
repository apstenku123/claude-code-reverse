/**
 * Subscribes to React DevTools renderer events and manages the lifecycle of renderer interfaces.
 * Handles renderer attachment, unsupported renderer versions, fast refresh events, and operations.
 * Cleans up all subscriptions and renderer interfaces on shutdown.
 *
 * @param {Object} devtoolsBridge - The bridge object for communicating with renderers (isWildcardOrX).
 * @param {Object} agent - The React DevTools agent instance (mapArraysToObjectWithCallback).
 * @param {any} findFiberHelper - Helper for finding fibers, passed to renderer interface factories (f).
 * @returns {Function} Cleanup function to unsubscribe all listeners and clean up renderer interfaces.
 */
function subscribeToFastRefreshScheduled(devtoolsBridge, agent, findFiberHelper) {
  if (devtoolsBridge == null) {
    // If the bridge is not available, return a no-op cleanup function
    return function () {};
  }

  /**
   * Array of unsubscribe functions for all event subscriptions
   * @type {Function[]}
   */
  const unsubscribeFunctions = [
    // Subscribe to 'renderer-attached' event
    devtoolsBridge.sub('renderer-attached', function onRendererAttached(event) {
      const {
        id: rendererId,
        renderer,
        rendererInterface
      } = event;
      // Register the renderer interface and flush initial operations
      agent.setRendererInterface(rendererId, rendererInterface);
      rendererInterface.flushInitialOperations();
    }),
    // Subscribe to 'unsupported-renderer-version' event
    devtoolsBridge.sub('unsupported-renderer-version', function onUnsupportedRendererVersion(rendererId) {
      agent.onUnsupportedRenderer(rendererId);
    }),
    // Subscribe to fast refresh scheduled event
    devtoolsBridge.sub('fastRefreshScheduled', agent.onFastRefreshScheduled),
    // Subscribe to operations event
    devtoolsBridge.sub('operations', agent.onHookOperations),
    // Subscribe to trace updates event
    devtoolsBridge.sub('traceUpdates', agent.onTraceUpdates)
  ];

  /**
   * Attach a renderer interface if supported, or emit unsupported version event
   * @param {number|string} rendererId
   * @param {Object} renderer
   */
  const attachRendererInterface = function attachRendererInterface(rendererId, renderer) {
    // Check if the renderer version is supported
    if (!Ww1(renderer.reconcilerVersion || renderer.version)) {
      return;
    }
    // Try to get an existing renderer interface
    let rendererInterface = devtoolsBridge.rendererInterfaces.get(rendererId);
    if (rendererInterface == null) {
      // Create a new renderer interface using the appropriate factory
      if (typeof renderer.findFiberByHostInstance === 'function') {
        rendererInterface = areArraysEquivalentDeep(devtoolsBridge, rendererId, renderer, findFiberHelper);
      } else if (renderer.ComponentTree) {
        rendererInterface = Yw1(devtoolsBridge, rendererId, renderer, findFiberHelper);
      }
      // Store the new renderer interface if created
      if (rendererInterface != null) {
        devtoolsBridge.rendererInterfaces.set(rendererId, rendererInterface);
      }
    }
    if (rendererInterface != null) {
      // Notify listeners that a renderer has been attached
      devtoolsBridge.emit('renderer-attached', {
        id: rendererId,
        renderer,
        rendererInterface
      });
    } else {
      // Notify listeners of unsupported renderer version
      devtoolsBridge.emit('unsupported-renderer-version', rendererId);
    }
  };

  // Attach all existing renderers
  devtoolsBridge.renderers.forEach(function (renderer, rendererId) {
    attachRendererInterface(rendererId, renderer);
  });

  // Subscribe to new renderer events
  unsubscribeFunctions.push(
    devtoolsBridge.sub('renderer', function onRenderer(event) {
      const {
        id: rendererId,
        renderer
      } = event;
      attachRendererInterface(rendererId, renderer);
    })
  );

  // Notify that react-devtools is ready
  devtoolsBridge.emit('react-devtools', agent);
  // Attach the agent to the bridge for reference
  devtoolsBridge.reactDevtoolsAgent = agent;

  /**
   * Cleanup function to remove all subscriptions and clean up renderer interfaces
   */
  const cleanup = function cleanup() {
    // Unsubscribe all event listeners
    unsubscribeFunctions.forEach(function (unsubscribe) {
      unsubscribe();
    });
    // Clean up all renderer interfaces
    devtoolsBridge.rendererInterfaces.forEach(function (rendererInterface) {
      rendererInterface.cleanup();
    });
    // Remove agent reference
    devtoolsBridge.reactDevtoolsAgent = null;
  };

  // Listen for agent shutdown to trigger cleanup
  agent.addListener('shutdown', cleanup);
  // Add a function to remove the shutdown listener to the unsubscribe list
  unsubscribeFunctions.push(function () {
    agent.removeListener('shutdown', cleanup);
  });

  // Return a function that performs all cleanup actions
  return function () {
    unsubscribeFunctions.forEach(function (unsubscribe) {
      unsubscribe();
    });
  };
}

module.exports = subscribeToFastRefreshScheduled;
