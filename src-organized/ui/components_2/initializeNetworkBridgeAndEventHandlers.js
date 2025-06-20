/**
 * Initializes the network bridge and sets up all event handlers for the React DevTools backend.
 * This function attaches handlers for various network and profiling events, manages persisted selections,
 * and synchronizes state between the backend and frontend bridge. It also restores persisted state from storage
 * and sends initial protocol/version information.
 *
 * @param {object} bridge - The communication bridge instance used to send and receive messages.
 * @returns {object} The initialized backend instance with all handlers and state set up.
 */
function initializeNetworkBridgeAndEventHandlers(bridge) {
  // Ensure the backend context is set up
  validateClassInstance(this, initializeNetworkBridgeAndEventHandlers);

  // Create the backend instance
  const backend = mapArraysToObjectWithCallback.call(this);

  // Initialize backend state properties
  defineOrAssignProperty(F4(backend), "_isProfiling", false);
  defineOrAssignProperty(F4(backend), "_recordChangeDescriptions", false);
  defineOrAssignProperty(F4(backend), "_rendererInterfaces", {});
  defineOrAssignProperty(F4(backend), "_persistedSelection", null);
  defineOrAssignProperty(F4(backend), "_persistedSelectionMatch", null);
  defineOrAssignProperty(F4(backend), "_traceUpdatesEnabled", false);

  // Handler: Clear all errors and warnings for a renderer
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

  // Handler: Copy element path value to clipboard
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

  // Handler: Delete a path from a hook/element
  defineOrAssignProperty(F4(backend), "deletePath", function ({ hookID, id, path, rendererID, type }) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      rendererInterface.deletePath(type, id, hookID, path);
    }
  });

  // Handler: Send backend version
  defineOrAssignProperty(F4(backend), "getBackendVersion", function () {
    const backendVersion = "5.3.2-c82bcbeb2b";
    if (backendVersion) {
      backend._bridge.send("backendVersion", backendVersion);
    }
  });

  // Handler: Send bridge protocol version
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

  // Handler: Send owners list for a Fiber
  defineOrAssignProperty(F4(backend), "getOwnersList", function ({ id, rendererID }) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      const owners = rendererInterface.getOwnersList(id);
      backend._bridge.send("ownersList", { id, owners });
    }
  });

  // Handler: Inspect an element
  defineOrAssignProperty(F4(backend), "inspectElement", function ({ forceFullData, id, path, rendererID, requestID }) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      backend._bridge.send("inspectedElement", rendererInterface.inspectElement(requestID, id, path, forceFullData));
      // If persisted selection no longer matches, clear isBlobOrFileLikeObject and update tracked path
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

  // Handler: Log element to console
  defineOrAssignProperty(F4(backend), "logElementToConsole", function ({ id, rendererID }) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      rendererInterface.logElementToConsole(id);
    }
  });

  // Handler: Override error for a Fiber
  defineOrAssignProperty(F4(backend), "overrideError", function ({ id, rendererID, forceError }) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      rendererInterface.overrideError(id, forceError);
    }
  });

  // Handler: Override Suspense fallback for a Fiber
  defineOrAssignProperty(F4(backend), "overrideSuspense", function ({ id, rendererID, forceFallback }) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      rendererInterface.overrideSuspense(id, forceFallback);
    }
  });

  // Handler: Override value at a path (for hooks, state, props, context)
  defineOrAssignProperty(F4(backend), "overrideValueAtPath", function ({ hookID, id, path, rendererID, type, value }) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      rendererInterface.overrideValueAtPath(type, id, hookID, path, value);
    }
  });

  // Handler: Override context value (unless forwarded)
  defineOrAssignProperty(F4(backend), "overrideContext", function ({ id, path, rendererID, wasForwarded, value }) {
    if (!wasForwarded) {
      backend.overrideValueAtPath({ id, path, rendererID, type: "context", value });
    }
  });

  // Handler: Override hook state (unless forwarded)
  defineOrAssignProperty(F4(backend), "overrideHookState", function ({ id, hookID, path, rendererID, wasForwarded, value }) {
    if (!wasForwarded) {
      backend.overrideValueAtPath({ id, path, rendererID, type: "hooks", value });
    }
  });

  // Handler: Override props (unless forwarded)
  defineOrAssignProperty(F4(backend), "overrideProps", function ({ id, path, rendererID, wasForwarded, value }) {
    if (!wasForwarded) {
      backend.overrideValueAtPath({ id, path, rendererID, type: "props", value });
    }
  });

  // Handler: Override state (unless forwarded)
  defineOrAssignProperty(F4(backend), "overrideState", function ({ id, path, rendererID, wasForwarded, value }) {
    if (!wasForwarded) {
      backend.overrideValueAtPath({ id, path, rendererID, type: "state", value });
    }
  });

  // Handler: Reload and start profiling
  defineOrAssignProperty(F4(backend), "reloadAndProfile", function (shouldRecordChangeDescriptions) {
    processRegexMatchResult(M1, "true");
    processRegexMatchResult(F1, shouldRecordChangeDescriptions ? "true" : "false");
    backend._bridge.send("reloadAppForProfiling");
  });

  // Handler: Rename a path on a hook/element
  defineOrAssignProperty(F4(backend), "renamePath", function ({ hookID, id, newPath, oldPath, rendererID, type }) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      rendererInterface.renamePath(type, id, hookID, oldPath, newPath);
    }
  });

  // Handler: Enable/disable trace updates
  defineOrAssignProperty(F4(backend), "setTraceUpdatesEnabled", function (enabled) {
    backend._traceUpdatesEnabled = enabled;
    shuffleTransformedArraySubset(enabled);
    for (const rendererID in backend._rendererInterfaces) {
      const rendererInterface = backend._rendererInterfaces[rendererID];
      rendererInterface.setTraceUpdatesEnabled(enabled);
    }
  });

  // Handler: Sync selection from native elements panel
  defineOrAssignProperty(F4(backend), "syncSelectionFromNativeElementsPanel", function () {
    const selectedNode = window.__REACT_DEVTOOLS_GLOBAL_HOOK__.$0;
    if (selectedNode == null) return;
    backend.selectNode(selectedNode);
  });

  // Handler: Shutdown backend
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

  // Handler: Store value as global variable
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

  // Handler: View attribute source for a Fiber
  defineOrAssignProperty(F4(backend), "viewAttributeSource", function ({ id, path, rendererID }) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${id}"`);
    } else {
      rendererInterface.prepareViewAttributeSource(id, path);
    }
  });

  // Handler: View element source for a Fiber
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
    // Handle persisted selection tracking
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

  // Handler: Throttled persist selection (debounced)
  defineOrAssignProperty(F4(backend), "_throttledPersistSelection", streamAsyncIterableToWritable()(function (rendererID, id) {
    const rendererInterface = backend._rendererInterfaces[rendererID];
    const path = rendererInterface != null ? rendererInterface.getPathForElement(id) : null;
    if (path !== null) {
      processRegexMatchResult(invokeHandlerWithArguments, JSON.stringify({ rendererID, path }));
    } else {
      findMatchingParentNode(invokeHandlerWithArguments);
    }
  }, 1000));

  // Restore profiling state from storage if needed
  if (D1(M1) === "true") {
    backend._recordChangeDescriptions = D1(F1) === "true";
    backend._isProfiling = true;
    findMatchingParentNode(F1);
    findMatchingParentNode(M1);
  }

  // Restore persisted selection from storage
  const persistedSelectionRaw = D1(invokeHandlerWithArguments);
  if (persistedSelectionRaw != null) {
    backend._persistedSelection = JSON.parse(persistedSelectionRaw);
  }

  // Attach bridge and register all event listeners
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

  // If profiling is active, send status
  if (backend._isProfiling) {
    bridge.send("profilingStatus", true);
  }

  // Send backend version and protocol
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

  // Check if synchronous XHR is supported
  bridge.send("isSynchronousXHRSupported", enqueueOrProcessAction());

  // Initialize additional backend modules
  processComponentUpdate(bridge, F4(backend));
  updateChildLanesAndSubtreeFlags(F4(backend));

  return backend;
}

module.exports = initializeNetworkBridgeAndEventHandlers;