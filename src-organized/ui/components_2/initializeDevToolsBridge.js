/**
 * Initializes and configures the DevTools bridge for communication between the frontend and backend.
 * Sets up event listeners, state, and handlers for various DevTools operations such as profiling,
 * inspecting elements, overriding values, and synchronizing selection from the native elements panel.
 *
 * @param {Object} bridge - The communication bridge instance used to send and receive messages.
 * @returns {Object} The configured DevTools backend instance with all handlers and state initialized.
 */
function initializeDevToolsBridge(bridge) {
  // Ensure this function is called with the correct context
  validateClassInstance(this, initializeDevToolsBridge);

  // Create the backend instance and initialize default state
  const backend = mapArraysToObjectWithCallback.call(this);

  // Set up initial properties on the backend instance
  defineOrAssignProperty(F4(backend), "_isProfiling", false);
  defineOrAssignProperty(F4(backend), "_recordChangeDescriptions", false);
  defineOrAssignProperty(F4(backend), "_rendererInterfaces", {});
  defineOrAssignProperty(F4(backend), "_persistedSelection", null);
  defineOrAssignProperty(F4(backend), "_persistedSelectionMatch", null);
  defineOrAssignProperty(F4(backend), "_traceUpdatesEnabled", false);

  // Handler: Clear all errors and warnings for a given renderer
  defineOrAssignProperty(F4(backend), "clearErrorsAndWarnings", function ({ rendererID }) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}"`);
    } else {
      rendererInterface.clearErrorsAndWarnings();
    }
  });

  // Handler: Clear errors for a specific Fiber updateSnapshotAndNotify
  defineOrAssignProperty(F4(backend), "clearErrorsForFiberID", function ({ id, rendererID }) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}"`);
    } else {
      rendererInterface.clearErrorsForFiberID(id);
    }
  });

  // Handler: Clear warnings for a specific Fiber updateSnapshotAndNotify
  defineOrAssignProperty(F4(backend), "clearWarningsForFiberID", function ({ id, rendererID }) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}"`);
    } else {
      rendererInterface.clearWarningsForFiberID(id);
    }
  });

  // Handler: Copy the value at a specific element path to the clipboard
  defineOrAssignProperty(F4(backend), "copyElementPath", function ({ id, path, rendererID }) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      const serializedValue = rendererInterface.getSerializedElementValueByPath(id, path);
      if (serializedValue != null) {
        backend._bridge.send("saveToClipboard", serializedValue);
      } else {
        console.warn(`Unable to obtain serialized value for element "${id}"`);
      }
    }
  });

  // Handler: Delete a value at a specific path
  defineOrAssignProperty(F4(backend), "deletePath", function ({ hookID, id, path, rendererID, type }) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      rendererInterface.deletePath(type, id, hookID, path);
    }
  });

  // Handler: Send backend version to the frontend
  defineOrAssignProperty(F4(backend), "getBackendVersion", function () {
    const backendVersion = "5.3.2-c82bcbeb2b";
    if (backendVersion) {
      backend._bridge.send("backendVersion", backendVersion);
    }
  });

  // Handler: Send bridge protocol to the frontend
  defineOrAssignProperty(F4(backend), "getBridgeProtocol", function () {
    backend._bridge.send("bridgeProtocol", Jp);
  });

  // Handler: Send profiling data for a renderer
  defineOrAssignProperty(F4(backend), "getProfilingData", function ({ rendererID }) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}"`);
    }
    backend._bridge.send("profilingData", rendererInterface.getProfilingData());
  });

  // Handler: Send current profiling status
  defineOrAssignProperty(F4(backend), "getProfilingStatus", function () {
    backend._bridge.send("profilingStatus", backend._isProfiling);
  });

  // Handler: Get the owners list for a specific element
  defineOrAssignProperty(F4(backend), "getOwnersList", function ({ id, rendererID }) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      const owners = rendererInterface.getOwnersList(id);
      backend._bridge.send("ownersList", { id, owners });
    }
  });

  // Handler: Inspect a specific element
  defineOrAssignProperty(F4(backend), "inspectElement", function ({ forceFullData, id, path, rendererID, requestID }) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      backend._bridge.send("inspectedElement", rendererInterface.inspectElement(requestID, id, path, forceFullData));
      // If the persisted selection does not match, clear isBlobOrFileLikeObject and persist again
      if (
        backend._persistedSelectionMatch === null ||
        backend._persistedSelectionMatch.id !== id
      ) {
        backend._persistedSelection = null;
        backend._persistedSelectionMatch = null;
        rendererInterface.setTrackedPath(null);
        backend._throttledPersistSelection(rendererID, id);
      }
    }
  });

  // Handler: Log a specific element to the console
  defineOrAssignProperty(F4(backend), "logElementToConsole", function ({ id, rendererID }) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      rendererInterface.logElementToConsole(id);
    }
  });

  // Handler: Override error for a specific element
  defineOrAssignProperty(F4(backend), "overrideError", function ({ id, rendererID, forceError }) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      rendererInterface.overrideError(id, forceError);
    }
  });

  // Handler: Override suspense fallback for a specific element
  defineOrAssignProperty(F4(backend), "overrideSuspense", function ({ id, rendererID, forceFallback }) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      rendererInterface.overrideSuspense(id, forceFallback);
    }
  });

  // Handler: Override a value at a specific path (props, state, hooks, context)
  defineOrAssignProperty(F4(backend), "overrideValueAtPath", function ({ hookID, id, path, rendererID, type, value }) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      rendererInterface.overrideValueAtPath(type, id, hookID, path, value);
    }
  });

  // Handler: Override context value (if not forwarded)
  defineOrAssignProperty(F4(backend), "overrideContext", function ({ id, path, rendererID, wasForwarded, value }) {
    if (!wasForwarded) {
      backend.overrideValueAtPath({
        id,
        path,
        rendererID,
        type: "context",
        value
      });
    }
  });

  // Handler: Override hook state (if not forwarded)
  defineOrAssignProperty(F4(backend), "overrideHookState", function ({ id, hookID, path, rendererID, wasForwarded, value }) {
    if (!wasForwarded) {
      backend.overrideValueAtPath({
        id,
        path,
        rendererID,
        type: "hooks",
        value
      });
    }
  });

  // Handler: Override props (if not forwarded)
  defineOrAssignProperty(F4(backend), "overrideProps", function ({ id, path, rendererID, wasForwarded, value }) {
    if (!wasForwarded) {
      backend.overrideValueAtPath({
        id,
        path,
        rendererID,
        type: "props",
        value
      });
    }
  });

  // Handler: Override state (if not forwarded)
  defineOrAssignProperty(F4(backend), "overrideState", function ({ id, path, rendererID, wasForwarded, value }) {
    if (!wasForwarded) {
      backend.overrideValueAtPath({
        id,
        path,
        rendererID,
        type: "state",
        value
      });
    }
  });

  // Handler: Reload the app and start profiling
  defineOrAssignProperty(F4(backend), "reloadAndProfile", function (recordChangeDescriptions) {
    processRegexMatchResult(M1, "true");
    processRegexMatchResult(F1, recordChangeDescriptions ? "true" : "false");
    backend._bridge.send("reloadAppForProfiling");
  });

  // Handler: Rename a path in the element tree
  defineOrAssignProperty(F4(backend), "renamePath", function ({ hookID, id, newPath, oldPath, rendererID, type }) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      rendererInterface.renamePath(type, id, hookID, oldPath, newPath);
    }
  });

  // Handler: Enable or disable trace updates
  defineOrAssignProperty(F4(backend), "setTraceUpdatesEnabled", function (enabled) {
    backend._traceUpdatesEnabled = enabled;
    shuffleTransformedArraySubset(enabled);
    for (const rendererID in backend._rendererInterfaces) {
      const rendererInterface = backend._rendererInterfaces[rendererID];
      rendererInterface.setTraceUpdatesEnabled(enabled);
    }
  });

  // Handler: Sync selection from the native elements panel
  defineOrAssignProperty(F4(backend), "syncSelectionFromNativeElementsPanel", function () {
    const selectedNode = window.__REACT_DEVTOOLS_GLOBAL_HOOK__.$0;
    if (selectedNode == null) return;
    backend.selectNode(selectedNode);
  });

  // Handler: Shutdown the backend
  defineOrAssignProperty(F4(backend), "shutdown", function () {
    backend.emit("shutdown");
  });

  // Handler: Start profiling
  defineOrAssignProperty(F4(backend), "startProfiling", function (recordChangeDescriptions) {
    backend._recordChangeDescriptions = recordChangeDescriptions;
    backend._isProfiling = true;
    for (const rendererID in backend._rendererInterfaces) {
      const rendererInterface = backend._rendererInterfaces[rendererID];
      rendererInterface.startProfiling(recordChangeDescriptions);
    }
    backend._bridge.send("profilingStatus", backend._isProfiling);
  });

  // Handler: Stop profiling
  defineOrAssignProperty(F4(backend), "stopProfiling", function () {
    backend._isProfiling = false;
    backend._recordChangeDescriptions = false;
    for (const rendererID in backend._rendererInterfaces) {
      const rendererInterface = backend._rendererInterfaces[rendererID];
      rendererInterface.stopProfiling();
    }
    backend._bridge.send("profilingStatus", backend._isProfiling);
  });

  // Handler: Stop inspecting native elements
  defineOrAssignProperty(F4(backend), "stopInspectingNative", function (payload) {
    backend._bridge.send("stopInspectingNative", payload);
  });

  // Handler: Store a value as a global variable for debugging
  defineOrAssignProperty(F4(backend), "storeAsGlobal", function ({ count, id, path, rendererID }) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      rendererInterface.storeAsGlobal(id, path, count);
    }
  });

  // Handler: Update console patch settings
  defineOrAssignProperty(F4(backend), "updateConsolePatchSettings", function ({
    appendComponentStack,
    breakOnConsoleErrors,
    showInlineWarningsAndErrors,
    hideConsoleLogsInStrictMode,
    browserTheme
  }) {
    $streamAsyncIterableToWritable({
      appendComponentStack,
      breakOnConsoleErrors,
      showInlineWarningsAndErrors,
      hideConsoleLogsInStrictMode,
      browserTheme
    });
  });

  // Handler: Update component filters for all renderers
  defineOrAssignProperty(F4(backend), "updateComponentFilters", function (filters) {
    for (const rendererID in backend._rendererInterfaces) {
      const rendererInterface = backend._rendererInterfaces[rendererID];
      rendererInterface.updateComponentFilters(filters);
    }
  });

  // Handler: View the source of an attribute
  defineOrAssignProperty(F4(backend), "viewAttributeSource", function ({ id, path, rendererID }) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      rendererInterface.prepareViewAttributeSource(id, path);
    }
  });

  // Handler: View the source of an element
  defineOrAssignProperty(F4(backend), "viewElementSource", function ({ id, rendererID }) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      rendererInterface.prepareViewElementSource(id);
    }
  });

  // Handler: Emit trace updates event
  defineOrAssignProperty(F4(backend), "onTraceUpdates", function (payload) {
    backend.emit("traceUpdates", payload);
  });

  // Handler: Fast refresh scheduled event
  defineOrAssignProperty(F4(backend), "onFastRefreshScheduled", function () {
    if (sendHttpRequestOverSocket) mapArrayWithFunction("onFastRefreshScheduled");
    backend._bridge.send("fastRefreshScheduled");
  });

  // Handler: Hook operations event
  defineOrAssignProperty(F4(backend), "onHookOperations", function (operations) {
    if (sendHttpRequestOverSocket) mapArrayWithFunction("onHookOperations", `(${operations.length}) [${operations.join(", ")}]`);
    backend._bridge.send("operations", operations);
    // Handle persisted selection logic
    if (backend._persistedSelection !== null) {
      const rendererID = operations[0];
      if (backend._persistedSelection.rendererID === rendererID) {
        const rendererInterface = backend._rendererInterfaces[rendererID];
        if (rendererInterface == null) {
          console.warn(`Invalid renderer id "${rendererID}"`);
        } else {
          const previousMatch = backend._persistedSelectionMatch;
          const bestMatch = rendererInterface.getBestMatchForTrackedPath();
          backend._persistedSelectionMatch = bestMatch;
          const previousID = previousMatch !== null ? previousMatch.id : null;
          const bestMatchID = bestMatch !== null ? bestMatch.id : null;
          if (previousID !== bestMatchID) {
            if (bestMatchID !== null) {
              backend._bridge.send("selectFiber", bestMatchID);
            }
          }
          if (bestMatch !== null && bestMatch.isFullMatch) {
            backend._persistedSelection = null;
            backend._persistedSelectionMatch = null;
            rendererInterface.setTrackedPath(null);
          }
        }
      }
    }
  });

  // Handler: Throttled persist selection logic
  defineOrAssignProperty(F4(backend), "_throttledPersistSelection", streamAsyncIterableToWritable()(function (rendererID, id) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    const trackedPath = rendererInterface != null ? rendererInterface.getPathForElement(id) : null;
    if (trackedPath !== null) {
      processRegexMatchResult(invokeHandlerWithArguments, JSON.stringify({ rendererID, path: trackedPath }));
    } else {
      findMatchingParentNode(invokeHandlerWithArguments);
    }
  }, 1000));

  // If profiling was enabled before reload, restore state
  if (D1(M1) === "true") {
    backend._recordChangeDescriptions = D1(F1) === "true";
    backend._isProfiling = true;
    findMatchingParentNode(F1);
    findMatchingParentNode(M1);
  }

  // Restore persisted selection if available
  const persistedSelectionRaw = D1(invokeHandlerWithArguments);
  if (persistedSelectionRaw != null) {
    backend._persistedSelection = JSON.parse(persistedSelectionRaw);
  }

  // Attach the bridge and register all event listeners
  backend._bridge = bridge;
  bridge.addListener("clearErrorsAndWarnings", backend.clearErrorsAndWarnings);
  bridge.addListener("clearErrorsForFiberID", backend.clearErrorsForFiberID);
  bridge.addListener("clearWarningsForFiberID", backend.clearWarningsForFiberID);
  bridge.addListener("copyElementPath", backend.copyElementPath);
  bridge.addListener("deletePath", backend.deletePath);
  bridge.addListener("getBackendVersion", backend.getBackendVersion);
  bridge.addListener("getBridgeProtocol", backend.getBridgeProtocol);
  bridge.addListener("getProfilingData", backend.getProfilingData);
  bridge.addListener("getProfilingStatus", backend.getProfilingStatus);
  bridge.addListener("getOwnersList", backend.getOwnersList);
  bridge.addListener("inspectElement", backend.inspectElement);
  bridge.addListener("logElementToConsole", backend.logElementToConsole);
  bridge.addListener("overrideError", backend.overrideError);
  bridge.addListener("overrideSuspense", backend.overrideSuspense);
  bridge.addListener("overrideValueAtPath", backend.overrideValueAtPath);
  bridge.addListener("reloadAndProfile", backend.reloadAndProfile);
  bridge.addListener("renamePath", backend.renamePath);
  bridge.addListener("setTraceUpdatesEnabled", backend.setTraceUpdatesEnabled);
  bridge.addListener("startProfiling", backend.startProfiling);
  bridge.addListener("stopProfiling", backend.stopProfiling);
  bridge.addListener("storeAsGlobal", backend.storeAsGlobal);
  bridge.addListener("syncSelectionFromNativeElementsPanel", backend.syncSelectionFromNativeElementsPanel);
  bridge.addListener("shutdown", backend.shutdown);
  bridge.addListener("updateConsolePatchSettings", backend.updateConsolePatchSettings);
  bridge.addListener("updateComponentFilters", backend.updateComponentFilters);
  bridge.addListener("viewAttributeSource", backend.viewAttributeSource);
  bridge.addListener("viewElementSource", backend.viewElementSource);
  bridge.addListener("overrideContext", backend.overrideContext);
  bridge.addListener("overrideHookState", backend.overrideHookState);
  bridge.addListener("overrideProps", backend.overrideProps);
  bridge.addListener("overrideState", backend.overrideState);

  // If profiling is enabled, notify the frontend
  if (backend._isProfiling) {
    bridge.send("profilingStatus", true);
  }

  // Send backend version and bridge protocol to the frontend
  const backendVersion = "5.3.2-c82bcbeb2b";
  if (backendVersion) {
    backend._bridge.send("backendVersion", backendVersion);
  }
  backend._bridge.send("bridgeProtocol", Jp);

  // Check if localStorage is supported
  let isBackendStorageAPISupported = false;
  try {
    localStorage.getItem("test");
    isBackendStorageAPISupported = true;
  } catch (error) {}

  bridge.send("isBackendStorageAPISupported", isBackendStorageAPISupported);
  bridge.send("isSynchronousXHRSupported", enqueueOrProcessAction());

  // Initialize additional backend features
  processComponentUpdate(bridge, F4(backend));
  updateChildLanesAndSubtreeFlags(F4(backend));

  return backend;
}

module.exports = initializeDevToolsBridge;
