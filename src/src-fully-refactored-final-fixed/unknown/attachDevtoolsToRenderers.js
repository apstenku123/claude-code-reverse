/**
 * Attaches React DevTools agent to all known renderers, manages subscriptions, and handles renderer lifecycle events.
 *
 * @param {object} bridge - The communication bridge (isWildcardOrX) between DevTools and the renderer(createInteractionAccessor).
 * @param {object} agent - The DevTools agent (mapArraysToObjectWithCallback) responsible for managing renderer interfaces and events.
 * @param {any} globalHook - The global hook (f) used for renderer interface creation.
 * @returns {function} Cleanup function to unsubscribe all listeners and clean up renderer interfaces.
 */
function attachDevtoolsToRenderers(bridge, agent, globalHook) {
  if (bridge == null) {
    // If no bridge is provided, return a no-op cleanup function
    return function () {};
  }

  /**
   * Holds all unsubscribe functions for event listeners.
   * @type {Array<Function>}
   */
  const unsubscribeFunctions = [
    // Listen for new renderer attachments
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
   * Attach a renderer interface if supported, otherwise emit unsupported event.
   * @param {string|number} rendererId - The renderer'createInteractionAccessor unique identifier.
   * @param {object} renderer - The renderer instance.
   */
  function attachRendererInterface(rendererId, renderer) {
    // Check if the renderer version is supported
    if (!Ww1(renderer.reconcilerVersion || renderer.version)) {
      return;
    }
    let rendererInterface = bridge.rendererInterfaces.get(rendererId);
    if (rendererInterface == null) {
      // Try to create a renderer interface using available methods
      if (typeof renderer.findFiberByHostInstance === "function") {
        rendererInterface = areArraysEquivalentDeep(bridge, rendererId, renderer, globalHook);
      } else if (renderer.ComponentTree) {
        rendererInterface = Yw1(bridge, rendererId, renderer, globalHook);
      }
      // Store the renderer interface if created
      if (rendererInterface != null) {
        bridge.rendererInterfaces.set(rendererId, rendererInterface);
      }
    }
    if (rendererInterface != null) {
      // Notify that the renderer has been attached
      bridge.emit("renderer-attached", {
        id: rendererId,
        renderer,
        rendererInterface
      });
    } else {
      // Notify that the renderer version is unsupported
      bridge.emit("unsupported-renderer-version", rendererId);
    }
  }

  // Attach interfaces for all existing renderers
  bridge.renderers.forEach(function (renderer, rendererId) {
    attachRendererInterface(rendererId, renderer);
  });

  // Listen for new renderer registrations
  unsubscribeFunctions.push(
    bridge.sub("renderer", function onRendererRegistered(event) {
      const {
        id: rendererId,
        renderer
      } = event;
      attachRendererInterface(rendererId, renderer);
    })
  );

  // Notify that DevTools is connected
  bridge.emit("react-devtools", agent);
  bridge.reactDevtoolsAgent = agent;

  /**
   * Cleanup function to remove all listeners and clean up renderer interfaces.
   */
  function cleanupDevtools() {
    // Unsubscribe all event listeners
    unsubscribeFunctions.forEach(function (unsubscribe) {
      unsubscribe();
    });
    // Clean up all renderer interfaces
    bridge.rendererInterfaces.forEach(function (rendererInterface) {
      rendererInterface.cleanup();
    });
    bridge.reactDevtoolsAgent = null;
  }

  // Listen for agent shutdown to trigger cleanup
  agent.addListener("shutdown", cleanupDevtools);
  unsubscribeFunctions.push(function () {
    agent.removeListener("shutdown", cleanupDevtools);
  });

  // Return a function to perform cleanup when needed
  return function () {
    unsubscribeFunctions.forEach(function (unsubscribe) {
      unsubscribe();
    });
  };
}

module.exports = attachDevtoolsToRenderers;