/**
 * Attaches React DevTools agent to a renderer, sets up event listeners, and manages cleanup.
 * Handles renderer attachment, unsupported renderer versions, fast refresh, operations, and trace updates.
 * Also manages proper cleanup on shutdown.
 *
 * @param {Object} bridge - The communication bridge or event emitter for renderer events.
 * @param {Object} agent - The React DevTools agent instance to attach.
 * @param {any} findFiberFunction - Optional function or context used for fiber lookup.
 * @returns {Function} Cleanup function to remove all listeners and clean up agent state.
 */
function attachDevtoolsToRenderer(bridge, agent, findFiberFunction) {
  if (bridge == null) {
    // If no bridge is provided, return a no-op cleanup function
    return function () {};
  }

  // Store all unsubscribe/cleanup functions for event listeners
  const unsubscribeHandlers = [
    // Listen for renderer attachment
    bridge.sub("renderer-attached", function onRendererAttached(event) {
      const {
        id: rendererId,
        renderer,
        rendererInterface
      } = event;
      agent.setRendererInterface(rendererId, rendererInterface);
      rendererInterface.flushInitialOperations();
    }),
    // Listen for unsupported renderer versions
    bridge.sub("unsupported-renderer-version", function onUnsupportedRendererVersion(rendererId) {
      agent.onUnsupportedRenderer(rendererId);
    }),
    // Listen for fast refresh events
    bridge.sub("fastRefreshScheduled", agent.onFastRefreshScheduled),
    // Listen for hook operations
    bridge.sub("operations", agent.onHookOperations),
    // Listen for trace updates
    bridge.sub("traceUpdates", agent.onTraceUpdates)
  ];

  /**
   * Attempts to attach a renderer interface for a given renderer.
   * Emits appropriate events based on success or failure.
   *
   * @param {number|string} rendererId - The unique updateSnapshotAndNotify of the renderer.
   * @param {Object} renderer - The renderer instance.
   */
  function tryAttachRendererInterface(rendererId, renderer) {
    // Only proceed if the renderer version is supported
    if (!Ww1(renderer.reconcilerVersion || renderer.version)) {
      return;
    }
    let rendererInterface = bridge.rendererInterfaces.get(rendererId);
    if (rendererInterface == null) {
      // Try to create a renderer interface using the appropriate method
      if (typeof renderer.findFiberByHostInstance === "function") {
        rendererInterface = areArraysEquivalentDeep(bridge, rendererId, renderer, findFiberFunction);
      } else if (renderer.ComponentTree) {
        rendererInterface = Yw1(bridge, rendererId, renderer, findFiberFunction);
      }
      if (rendererInterface != null) {
        bridge.rendererInterfaces.set(rendererId, rendererInterface);
      }
    }
    if (rendererInterface != null) {
      // Successfully attached renderer interface
      bridge.emit("renderer-attached", {
        id: rendererId,
        renderer,
        rendererInterface
      });
    } else {
      // Renderer version is unsupported
      bridge.emit("unsupported-renderer-version", rendererId);
    }
  }

  // Attach to all existing renderers
  bridge.renderers.forEach(function (renderer, rendererId) {
    tryAttachRendererInterface(rendererId, renderer);
  });

  // Listen for new renderer events
  unsubscribeHandlers.push(
    bridge.sub("renderer", function onRenderer(event) {
      const {
        id: rendererId,
        renderer
      } = event;
      tryAttachRendererInterface(rendererId, renderer);
    })
  );

  // Notify that React DevTools is attached
  bridge.emit("react-devtools", agent);
  bridge.reactDevtoolsAgent = agent;

  /**
   * Cleanup function to remove all listeners and clean up renderer interfaces.
   */
  function cleanupDevtools() {
    // Remove all event listeners
    unsubscribeHandlers.forEach(function (unsubscribe) {
      unsubscribe();
    });
    // Clean up all renderer interfaces
    bridge.rendererInterfaces.forEach(function (rendererInterface) {
      rendererInterface.cleanup();
    });
    // Remove agent reference
    bridge.reactDevtoolsAgent = null;
  }

  // Listen for agent shutdown to trigger cleanup
  agent.addListener("shutdown", cleanupDevtools);
  unsubscribeHandlers.push(function () {
    agent.removeListener("shutdown", cleanupDevtools);
  });

  // Return a function to manually clean up all listeners and interfaces
  return function () {
    unsubscribeHandlers.forEach(function (unsubscribe) {
      unsubscribe();
    });
  };
}

module.exports = attachDevtoolsToRenderer;
