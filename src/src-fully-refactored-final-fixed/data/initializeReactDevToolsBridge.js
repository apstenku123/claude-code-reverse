/**
 * Initializes and manages the React DevTools bridge, handling WebSocket communication,
 * reconnection logic, and DevTools event listeners for a React application.
 *
 * @param {Object} [options={}] - Configuration options for the bridge.
 * @param {string} [options.host="localhost"] - The host to connect to.
 * @param {number} [options.port=8097] - The port to connect to.
 * @param {boolean} [options.useHttps=false] - Whether to use secure WebSocket (wss).
 * @param {WebSocket} [options.websocket] - Optional custom WebSocket instance.
 * @param {function} [options.resolveRNStyle=null] - Function to resolve React Native styles.
 * @param {Object} [options.nativeStyleEditorValidAttributes] - Valid attributes for the native style editor.
 * @param {number} [options.retryConnectionDelay=2000] - Delay (ms) before retrying connection.
 * @param {function} [options.isAppActive=()=>true] - Function to determine if the app is active.
 * @param {Object} [options.devToolsSettingsManager] - DevTools settings manager instance.
 */
function initializeReactDevToolsBridge(options = {}) {
  // Early exit if the global DevTools bridge object is not available
  if (typeof QG === 'undefined' || QG == null) return;

  // Destructure and provide defaults for options
  const {
    host = "localhost",
    port = 8097,
    useHttps = false,
    websocket: customWebSocket,
    resolveRNStyle = null,
    nativeStyleEditorValidAttributes,
    retryConnectionDelay = 2000,
    isAppActive = () => true,
    devToolsSettingsManager
  } = options;

  // Determine WebSocket protocol
  const webSocketProtocol = useHttps ? "wss" : "ws";
  let reconnectTimeoutId = null;

  /**
   * Attempts to reconnect after a delay.
   */
  function scheduleReconnect() {
    if (reconnectTimeoutId === null) {
      reconnectTimeoutId = setTimeout(() => {
        initializeReactDevToolsBridge(options);
      }, retryConnectionDelay);
    }
  }

  // Initialize DevTools settings manager if provided
  if (devToolsSettingsManager != null) {
    try {
      nA1(devToolsSettingsManager);
    } catch (error) {
      console.error(error);
    }
  }

  // If the app is not active, schedule a reconnect and exit
  if (!isAppActive()) {
    scheduleReconnect();
    return;
  }

  let bridge = null;
  const messageListeners = [];
  const webSocketUrl = `${webSocketProtocol}://${host}:${port}`;
  // Use custom WebSocket if provided, otherwise create a new one
  const socket = customWebSocket ? customWebSocket : new window.WebSocket(webSocketUrl);

  // WebSocket event handlers
  socket.onclose = handleWebSocketClose;
  socket.onerror = handleWebSocketError;
  socket.onmessage = handleWebSocketMessage;
  socket.onopen = function handleWebSocketOpen() {
    // Create the bridge (wall) for communication
    bridge = new filterFalsyValues({
      /**
       * Registers a listener for incoming messages.
       * @param {function} listener
       * @returns {function} Unsubscribe function
       */
      listen(listener) {
        messageListeners.push(listener);
        return function unsubscribe() {
          const index = messageListeners.indexOf(listener);
          if (index >= 0) messageListeners.splice(index, 1);
        };
      },
      /**
       * Sends a message through the WebSocket.
       * @param {string} event
       * @param {any} payload
       */
      send(event, payload) {
        if (socket.readyState === socket.OPEN) {
          if (sendHttpRequestOverSocket) logCoreBackendMessage("wall.send()", event, payload);
          socket.send(JSON.stringify({ event, payload }));
        } else {
          if (sendHttpRequestOverSocket) logCoreBackendMessage("wall.send()", "Shutting down bridge because of closed WebSocket connection");
          if (bridge !== null) bridge.shutdown();
          scheduleReconnect();
        }
      }
    });

    // Listen for updates to component filters
    bridge.addListener("updateComponentFilters", function (newFilters) {
      ok = newFilters;
    });

    // Listen for updates to console patch settings if settings manager is provided
    if (devToolsSettingsManager != null && bridge != null) {
      bridge.addListener("updateConsolePatchSettings", function (settings) {
        return filterCollectionByPredicate(devToolsSettingsManager, settings);
      });
    }

    // If component filters are not set on the window, send the current filters
    if (window.__REACT_DEVTOOLS_COMPONENT_FILTERS__ == null) {
      bridge.send("overrideComponentFilters", ok);
    }

    // Create the DevTools backend bridge
    const backendBridge = new getProcessedArraySlice(bridge);

    // Listen for shutdown events
    backendBridge.addListener("shutdown", function () {
      QG.emit("shutdown");
    });

    // Attach the backend bridge to the global DevTools bridge
    getUniqueItems(QG, backendBridge, window);

    // Setup style resolver bridge if available
    if (resolveRNStyle != null || QG.resolveRNStyle != null) {
      initializeNativeStyleEditorListeners(
        bridge,
        backendBridge,
        resolveRNStyle || QG.resolveRNStyle,
        nativeStyleEditorValidAttributes || QG.nativeStyleEditorValidAttributes || null
      );
    } else {
      // Dynamically define resolveRNStyle and nativeStyleEditorValidAttributes on QG
      let dynamicResolveRNStyle;
      let dynamicValidAttributes;
      const updateStyleBridge = function () {
        if (bridge !== null) {
          initializeNativeStyleEditorListeners(bridge, backendBridge, dynamicResolveRNStyle, dynamicValidAttributes);
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
            updateStyleBridge();
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
            updateStyleBridge();
          }
        });
      }
    }
  };

  /**
   * Handles WebSocket close events.
   */
  function handleWebSocketClose() {
    if (sendHttpRequestOverSocket) logCoreBackendMessage("WebSocket.onclose");
    if (bridge !== null) bridge.emit("shutdown");
    scheduleReconnect();
  }

  /**
   * Handles WebSocket error events.
   */
  function handleWebSocketError() {
    if (sendHttpRequestOverSocket) logCoreBackendMessage("WebSocket.onerror");
    scheduleReconnect();
  }

  /**
   * Handles incoming WebSocket messages and dispatches them to listeners.
   * @param {MessageEvent} event
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
    messageListeners.forEach(function (listener) {
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

module.exports = initializeReactDevToolsBridge;
