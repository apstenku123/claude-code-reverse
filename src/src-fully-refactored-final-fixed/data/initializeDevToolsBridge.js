/**
 * Initializes and manages the React DevTools bridge, handling WebSocket connections,
 * reconnection logic, message passing, and dynamic configuration for style editors and filters.
 *
 * @param {Object} [options={}] - Configuration options for the bridge.
 * @param {string} [options.host="localhost"] - Hostname for the WebSocket connection.
 * @param {Object|null} [options.nativeStyleEditorValidAttributes] - Valid attributes for the native style editor.
 * @param {boolean} [options.useHttps=false] - Whether to use secure WebSocket (wss).
 * @param {number} [options.port=8097] - Port for the WebSocket connection.
 * @param {WebSocket|null} [options.websocket] - Optional custom WebSocket instance.
 * @param {Function|null} [options.resolveRNStyle=null] - Function to resolve React Native styles.
 * @param {number} [options.retryConnectionDelay=2000] - Delay in ms before retrying connection.
 * @param {Function} [options.isAppActive=() => true] - Function to determine if the app is active.
 * @param {Object|null} [options.devToolsSettingsManager] - Optional settings manager for DevTools.
 * @returns {void}
 */
function initializeDevToolsBridge(options = {}) {
  if (QG == null) return;

  // Destructure and provide defaults for options
  const {
    host = "localhost",
    nativeStyleEditorValidAttributes,
    useHttps = false,
    port = 8097,
    websocket,
    resolveRNStyle = null,
    retryConnectionDelay = 2000,
    isAppActive = () => true,
    devToolsSettingsManager
  } = options;

  const protocol = useHttps ? "wss" : "ws";
  let reconnectTimeoutId = null;

  /**
   * Schedules a reconnection attempt after a delay.
   */
  function scheduleReconnect() {
    if (reconnectTimeoutId === null) {
      reconnectTimeoutId = setTimeout(() => {
        initializeDevToolsBridge(options);
      }, retryConnectionDelay);
    }
  }

  // Initialize settings manager if provided
  if (devToolsSettingsManager != null) {
    try {
      nA1(devToolsSettingsManager);
    } catch (settingsError) {
      console.error(settingsError);
    }
  }

  // If the app is not active, schedule reconnect and exit
  if (!isAppActive()) {
    scheduleReconnect();
    return;
  }

  let bridge = null;
  const messageListeners = [];
  const websocketUrl = `${protocol}://${host}:${port}`;
  const ws = websocket ? websocket : new window.WebSocket(websocketUrl);

  // WebSocket event handlers
  ws.onclose = handleWebSocketClose;
  ws.onerror = handleWebSocketError;
  ws.onmessage = handleWebSocketMessage;
  ws.onopen = function handleWebSocketOpen() {
    // Create the bridge (wall) for communication
    bridge = new filterFalsyValues({
      /**
       * Registers a listener for incoming messages from the bridge.
       * @param {Function} listener - Callback for messages.
       * @returns {Function} Unsubscribe function.
       */
      listen(listener) {
        messageListeners.push(listener);
        return function unsubscribe() {
          const index = messageListeners.indexOf(listener);
          if (index >= 0) messageListeners.splice(index, 1);
        };
      },
      /**
       * Sends a message through the bridge.
       * @param {string} event - Event name.
       * @param {any} payload - Event payload.
       * @param {any} [extra] - Extra data (unused).
       */
      send(event, payload, extra) {
        if (ws.readyState === ws.OPEN) {
          if (sendHttpRequestOverSocket) logCoreBackendMessage("wall.send()", event, payload);
          ws.send(JSON.stringify({ event, payload }));
        } else {
          if (sendHttpRequestOverSocket) logCoreBackendMessage("wall.send()", "Shutting down bridge because of closed WebSocket connection");
          if (bridge !== null) bridge.shutdown();
          scheduleReconnect();
        }
      }
    });

    // Listen for updates to component filters
    bridge.addListener("updateComponentFilters", function onUpdateComponentFilters(newFilters) {
      ok = newFilters;
    });

    // Listen for updates to console patch settings if settings manager is present
    if (devToolsSettingsManager != null && bridge != null) {
      bridge.addListener("updateConsolePatchSettings", function onUpdateConsolePatchSettings(settings) {
        return filterCollectionByPredicate(devToolsSettingsManager, settings);
      });
    }

    // If global component filters are not set, override them
    if (window.__REACT_DEVTOOLS_COMPONENT_FILTERS__ == null) {
      bridge.send("overrideComponentFilters", ok);
    }

    // Create the DevTools agent
    const agent = new getProcessedArraySlice(bridge);
    agent.addListener("shutdown", function onShutdown() {
      QG.emit("shutdown");
    });
    getUniqueItems(QG, agent, window);

    // Setup style editor integration
    if (resolveRNStyle != null || QG.resolveRNStyle != null) {
      initializeNativeStyleEditorListeners(
        bridge,
        agent,
        resolveRNStyle || QG.resolveRNStyle,
        nativeStyleEditorValidAttributes || QG.nativeStyleEditorValidAttributes || null
      );
    } else {
      // Dynamically define properties on QG for style editor integration
      let dynamicResolveRNStyle;
      let dynamicValidAttributes;
      const updateStyleEditor = function () {
        if (bridge !== null) {
          initializeNativeStyleEditorListeners(bridge, agent, dynamicResolveRNStyle, dynamicValidAttributes);
        }
      };
      if (!QG.hasOwnProperty("resolveRNStyle")) {
        Object.defineProperty(QG, "resolveRNStyle", {
          enumerable: false,
          get() {
            return dynamicResolveRNStyle;
          },
          set(value) {
            dynamicResolveRNStyle = value;
            updateStyleEditor();
          }
        });
      }
      if (!QG.hasOwnProperty("nativeStyleEditorValidAttributes")) {
        Object.defineProperty(QG, "nativeStyleEditorValidAttributes", {
          enumerable: false,
          get() {
            return dynamicValidAttributes;
          },
          set(value) {
            dynamicValidAttributes = value;
            updateStyleEditor();
          }
        });
      }
    }
  };

  /**
   * Handles WebSocket close events by shutting down the bridge and scheduling a reconnect.
   */
  function handleWebSocketClose() {
    if (sendHttpRequestOverSocket) logCoreBackendMessage("WebSocket.onclose");
    if (bridge !== null) bridge.emit("shutdown");
    scheduleReconnect();
  }

  /**
   * Handles WebSocket error events by scheduling a reconnect.
   */
  function handleWebSocketError() {
    if (sendHttpRequestOverSocket) logCoreBackendMessage("WebSocket.onerror");
    scheduleReconnect();
  }

  /**
   * Handles incoming WebSocket messages and dispatches them to listeners.
   * @param {MessageEvent} event - The WebSocket message event.
   */
  function handleWebSocketMessage(event) {
    let parsedMessage;
    try {
      if (typeof event.data === "string") {
        parsedMessage = JSON.parse(event.data);
        if (sendHttpRequestOverSocket) logCoreBackendMessage("WebSocket.onmessage", parsedMessage);
      } else {
        throw new Error();
      }
    } catch (parseError) {
      console.error("[React DevTools] Failed to parse JSON: " + event.data);
      return;
    }
    // Notify all registered listeners
    messageListeners.forEach(listener => {
      try {
        listener(parsedMessage);
      } catch (listenerError) {
        console.log("[React DevTools] Error calling listener", parsedMessage);
        console.log("error:", listenerError);
        throw listenerError;
      }
    });
  }
}

module.exports = initializeDevToolsBridge;