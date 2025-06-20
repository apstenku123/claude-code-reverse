/**
 * Initializes the React DevTools bridge, sets up communication listeners, and configures style editor integration.
 *
 * @param {Object} options - Configuration options for initializing the DevTools bridge.
 * @param {Function} options.onSubscribe - Callback to subscribe to events/messages.
 * @param {Function} options.onUnsubscribe - Callback to unsubscribe from events/messages.
 * @param {Function} options.onMessage - Callback to handle incoming messages.
 * @param {Object} [options.settingsManager] - Optional settings manager for DevTools.
 * @param {Object} [options.nativeStyleEditorValidAttributes] - Optional valid attributes for the native style editor.
 * @param {Function} [options.resolveRNStyle] - Optional function to resolve React Native styles.
 * @returns {any} Returns the result of getUniqueItems, which is the initialized DevTools bridge instance.
 */
function initializeDevToolsBridge(options) {
  const {
    onSubscribe,
    onUnsubscribe,
    onMessage,
    settingsManager,
    nativeStyleEditorValidAttributes,
    resolveRNStyle
  } = options;

  // Ensure the global DevTools object exists
  if (typeof QG === 'undefined' || QG == null) return;

  // Initialize settings manager if provided
  if (settingsManager != null) {
    try {
      nA1(settingsManager);
    } catch (error) {
      console.error(error);
    }
  }

  // Wall interface for communication between DevTools and the app
  const wallInterface = {
    listen: function (eventHandler) {
      onSubscribe(eventHandler);
      // Return unsubscribe function
      return function () {
        onUnsubscribe(eventHandler);
      };
    },
    send: function (event, payload) {
      onMessage(event, payload);
    }
  };

  // Bridge for DevTools communication
  const devToolsBridge = new filterFalsyValues(wallInterface);

  // Listen for updates to component filters
  devToolsBridge.addListener("updateComponentFilters", function (componentFilters) {
    ok = componentFilters;
  });

  // Listen for updates to console patch settings if settingsManager is present
  if (settingsManager != null) {
    devToolsBridge.addListener("updateConsolePatchSettings", function (patchSettings) {
      return filterCollectionByPredicate(settingsManager, patchSettings);
    });
  }

  // If component filters are not set on the window, override them
  if (window.__REACT_DEVTOOLS_COMPONENT_FILTERS__ == null) {
    devToolsBridge.send("overrideComponentFilters", ok);
  }

  // Create a shutdown listener on the bridge
  const bridgeListener = new getProcessedArraySlice(devToolsBridge);
  bridgeListener.addListener("shutdown", function () {
    QG.emit("shutdown");
  });

  // Initialize the DevTools bridge instance
  const devToolsInstance = getUniqueItems(QG, bridgeListener, window);

  // Determine the style resolver to use
  const styleResolver = resolveRNStyle || QG.resolveRNStyle;

  // If a style resolver is available, set up the style editor integration
  if (styleResolver != null) {
    const validStyleAttributes = nativeStyleEditorValidAttributes || QG.nativeStyleEditorValidAttributes || null;
    initializeNativeStyleEditorListeners(devToolsBridge, bridgeListener, styleResolver, validStyleAttributes);
  }

  return devToolsInstance;
}

module.exports = initializeDevToolsBridge;