/**
 * Initializes the backend bridge for synchronizing selection from the native elements panel.
 * Sets up default properties, event listeners, and command handlers for the devtools bridge.
 * Handles persisted selection, profiling, error/warning management, and various element inspection commands.
 *
 * @param {Object} bridge - The communication bridge instance for the devtools backend.
 * @returns {Object} The initialized backend controller instance.
 */
function initializeSyncSelectionFromNativeElementsPanel(bridge) {
  // Ensure the context is properly initialized
  validateClassInstance(this, initializeSyncSelectionFromNativeElementsPanel);

  // Create the backend controller instance
  const backendController = mapArraysToObjectWithCallback.call(this);

  // Set default properties on the backend controller
  defineOrAssignProperty(F4(backendController), "_isProfiling", false);
  defineOrAssignProperty(F4(backendController), "_recordChangeDescriptions", false);
  defineOrAssignProperty(F4(backendController), "_rendererInterfaces", {});
  defineOrAssignProperty(F4(backendController), "_persistedSelection", null);
  defineOrAssignProperty(F4(backendController), "_persistedSelectionMatch", null);
  defineOrAssignProperty(F4(backendController), "_traceUpdatesEnabled", false);

  // Handler: Clear all errors and warnings for a given renderer
  defineOrAssignProperty(F4(backendController), "clearErrorsAndWarnings", function ({ rendererID }) {
    const rendererInterface = backendController._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}"`);
    } else {
      rendererInterface.clearErrorsAndWarnings();
    }
  });

  // Handler: Clear errors for a specific Fiber updateSnapshotAndNotify
  defineOrAssignProperty(F4(backendController), "clearErrorsForFiberID", function ({ id: fiberID, rendererID }) {
    const rendererInterface = backendController._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}"`);
    } else {
      rendererInterface.clearErrorsForFiberID(fiberID);
    }
  });

  // Handler: Clear warnings for a specific Fiber updateSnapshotAndNotify
  defineOrAssignProperty(F4(backendController), "clearWarningsForFiberID", function ({ id: fiberID, rendererID }) {
    const rendererInterface = backendController._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}"`);
    } else {
      rendererInterface.clearWarningsForFiberID(fiberID);
    }
  });

  // Handler: Copy element path value to clipboard
  defineOrAssignProperty(F4(backendController), "copyElementPath", function ({ id: fiberID, path, rendererID }) {
    const rendererInterface = backendController._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${fiberID}"`);
    } else {
      const serializedValue = rendererInterface.getSerializedElementValueByPath(fiberID, path);
      if (serializedValue != null) {
        backendController._bridge.send("saveToClipboard", serializedValue);
      } else {
        console.warn(`Unable to obtain serialized value for element "${fiberID}"`);
      }
    }
  });

  // Handler: Delete a value at a specific path
  defineOrAssignProperty(F4(backendController), "deletePath", function ({ hookID, id: fiberID, path, rendererID, type }) {
    const rendererInterface = backendController._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${fiberID}"`);
    } else {
      rendererInterface.deletePath(type, fiberID, hookID, path);
    }
  });

  // Handler: Send backend version
  defineOrAssignProperty(F4(backendController), "getBackendVersion", function () {
    const backendVersion = "5.3.2-c82bcbeb2b";
    if (backendVersion) {
      backendController._bridge.send("backendVersion", backendVersion);
    }
  });

  // Handler: Send bridge protocol version
  defineOrAssignProperty(F4(backendController), "getBridgeProtocol", function () {
    backendController._bridge.send("bridgeProtocol", Jp);
  });

  // Handler: Send profiling data for a renderer
  defineOrAssignProperty(F4(backendController), "getProfilingData", function ({ rendererID }) {
    const rendererInterface = backendController._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}"`);
    }
    backendController._bridge.send("profilingData", rendererInterface.getProfilingData());
  });

  // Handler: Send current profiling status
  defineOrAssignProperty(F4(backendController), "getProfilingStatus", function () {
    backendController._bridge.send("profilingStatus", backendController._isProfiling);
  });

  // Handler: Get owners list for a Fiber
  defineOrAssignProperty(F4(backendController), "getOwnersList", function ({ id: fiberID, rendererID }) {
    const rendererInterface = backendController._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${fiberID}"`);
    } else {
      const owners = rendererInterface.getOwnersList(fiberID);
      backendController._bridge.send("ownersList", { id: fiberID, owners });
    }
  });

  // Handler: Inspect a specific element
  defineOrAssignProperty(F4(backendController), "inspectElement", function ({ forceFullData, id: fiberID, path, rendererID, requestID }) {
    const rendererInterface = backendController._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${fiberID}"`);
    } else {
      backendController._bridge.send("inspectedElement", rendererInterface.inspectElement(requestID, fiberID, path, forceFullData));
      // If selection changed, clear persisted selection and tracked path
      if (
        backendController._persistedSelectionMatch === null ||
        backendController._persistedSelectionMatch.id !== fiberID
      ) {
        backendController._persistedSelection = null;
        backendController._persistedSelectionMatch = null;
        rendererInterface.setTrackedPath(null);
        backendController._throttledPersistSelection(rendererID, fiberID);
      }
    }
  });

  // Handler: Log element to console
  defineOrAssignProperty(F4(backendController), "logElementToConsole", function ({ id: fiberID, rendererID }) {
    const rendererInterface = backendController._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${fiberID}"`);
    } else {
      rendererInterface.logElementToConsole(fiberID);
    }
  });

  // Handler: Override error for a Fiber
  defineOrAssignProperty(F4(backendController), "overrideError", function ({ id: fiberID, rendererID, forceError }) {
    const rendererInterface = backendController._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${fiberID}"`);
    } else {
      rendererInterface.overrideError(fiberID, forceError);
    }
  });

  // Handler: Override suspense fallback for a Fiber
  defineOrAssignProperty(F4(backendController), "overrideSuspense", function ({ id: fiberID, rendererID, forceFallback }) {
    const rendererInterface = backendController._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${fiberID}"`);
    } else {
      rendererInterface.overrideSuspense(fiberID, forceFallback);
    }
  });

  // Handler: Override value at a specific path (for hooks, state, props, context)
  defineOrAssignProperty(F4(backendController), "overrideValueAtPath", function ({ hookID, id: fiberID, path, rendererID, type, value }) {
    const rendererInterface = backendController._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${fiberID}"`);
    } else {
      rendererInterface.overrideValueAtPath(type, fiberID, hookID, path, value);
    }
  });

  // Handler: Override context value
  defineOrAssignProperty(F4(backendController), "overrideContext", function ({ id: fiberID, path, rendererID, wasForwarded, value }) {
    if (!wasForwarded) {
      backendController.overrideValueAtPath({
        id: fiberID,
        path,
        rendererID,
        type: "context",
        value
      });
    }
  });

  // Handler: Override hook state value
  defineOrAssignProperty(F4(backendController), "overrideHookState", function ({ id: fiberID, hookID, path, rendererID, wasForwarded, value }) {
    if (!wasForwarded) {
      backendController.overrideValueAtPath({
        id: fiberID,
        path,
        rendererID,
        type: "hooks",
        value
      });
    }
  });

  // Handler: Override props value
  defineOrAssignProperty(F4(backendController), "overrideProps", function ({ id: fiberID, path, rendererID, wasForwarded, value }) {
    if (!wasForwarded) {
      backendController.overrideValueAtPath({
        id: fiberID,
        path,
        rendererID,
        type: "props",
        value
      });
    }
  });

  // Handler: Override state value
  defineOrAssignProperty(F4(backendController), "overrideState", function ({ id: fiberID, path, rendererID, wasForwarded, value }) {
    if (!wasForwarded) {
      backendController.overrideValueAtPath({
        id: fiberID,
        path,
        rendererID,
        type: "state",
        value
      });
    }
  });

  // Handler: Reload and start profiling
  defineOrAssignProperty(F4(backendController), "reloadAndProfile", function (shouldRecordChangeDescriptions) {
    processRegexMatchResult(M1, "true");
    processRegexMatchResult(F1, shouldRecordChangeDescriptions ? "true" : "false");
    backendController._bridge.send("reloadAppForProfiling");
  });

  // Handler: Rename a path (for hooks, state, props, context)
  defineOrAssignProperty(F4(backendController), "renamePath", function ({ hookID, id: fiberID, newPath, oldPath, rendererID, type }) {
    const rendererInterface = backendController._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${fiberID}"`);
    } else {
      rendererInterface.renamePath(type, fiberID, hookID, oldPath, newPath);
    }
  });

  // Handler: Enable or disable trace updates
  defineOrAssignProperty(F4(backendController), "setTraceUpdatesEnabled", function (enabled) {
    backendController._traceUpdatesEnabled = enabled;
    shuffleTransformedArraySubset(enabled);
    for (const rendererID in backendController._rendererInterfaces) {
      const rendererInterface = backendController._rendererInterfaces[rendererID];
      rendererInterface.setTraceUpdatesEnabled(enabled);
    }
  });

  // Handler: Sync selection from native elements panel
  defineOrAssignProperty(F4(backendController), "syncSelectionFromNativeElementsPanel", function () {
    const selectedNode = window.__REACT_DEVTOOLS_GLOBAL_HOOK__.$0;
    if (selectedNode == null) return;
    backendController.selectNode(selectedNode);
  });

  // Handler: Shutdown the backend
  defineOrAssignProperty(F4(backendController), "shutdown", function () {
    backendController.emit("shutdown");
  });

  // Handler: Start profiling
  defineOrAssignProperty(F4(backendController), "startProfiling", function (recordChangeDescriptions) {
    backendController._recordChangeDescriptions = recordChangeDescriptions;
    backendController._isProfiling = true;
    for (const rendererID in backendController._rendererInterfaces) {
      const rendererInterface = backendController._rendererInterfaces[rendererID];
      rendererInterface.startProfiling(recordChangeDescriptions);
    }
    backendController._bridge.send("profilingStatus", backendController._isProfiling);
  });

  // Handler: Stop profiling
  defineOrAssignProperty(F4(backendController), "stopProfiling", function () {
    backendController._isProfiling = false;
    backendController._recordChangeDescriptions = false;
    for (const rendererID in backendController._rendererInterfaces) {
      const rendererInterface = backendController._rendererInterfaces[rendererID];
      rendererInterface.stopProfiling();
    }
    backendController._bridge.send("profilingStatus", backendController._isProfiling);
  });

  // Handler: Stop inspecting native elements
  defineOrAssignProperty(F4(backendController), "stopInspectingNative", function (payload) {
    backendController._bridge.send("stopInspectingNative", payload);
  });

  // Handler: Store a value as a global variable in the console
  defineOrAssignProperty(F4(backendController), "storeAsGlobal", function ({ count, id: fiberID, path, rendererID }) {
    const rendererInterface = backendController._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${fiberID}"`);
    } else {
      rendererInterface.storeAsGlobal(fiberID, path, count);
    }
  });

  // Handler: Update console patch settings
  defineOrAssignProperty(F4(backendController), "updateConsolePatchSettings", function ({
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
  defineOrAssignProperty(F4(backendController), "updateComponentFilters", function (filters) {
    for (const rendererID in backendController._rendererInterfaces) {
      const rendererInterface = backendController._rendererInterfaces[rendererID];
      rendererInterface.updateComponentFilters(filters);
    }
  });

  // Handler: View attribute source for a Fiber
  defineOrAssignProperty(F4(backendController), "viewAttributeSource", function ({ id: fiberID, path, rendererID }) {
    const rendererInterface = backendController._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${fiberID}"`);
    } else {
      rendererInterface.prepareViewAttributeSource(fiberID, path);
    }
  });

  // Handler: View element source for a Fiber
  defineOrAssignProperty(F4(backendController), "viewElementSource", function ({ id: fiberID, rendererID }) {
    const rendererInterface = backendController._rendererInterfaces[rendererID];
    if (rendererInterface == null) {
      console.warn(`Invalid renderer id "${rendererID}" for element "${fiberID}"`);
    } else {
      rendererInterface.prepareViewElementSource(fiberID);
    }
  });

  // Handler: Emit trace updates event
  defineOrAssignProperty(F4(backendController), "onTraceUpdates", function (payload) {
    backendController.emit("traceUpdates", payload);
  });

  // Handler: Fast refresh scheduled event
  defineOrAssignProperty(F4(backendController), "onFastRefreshScheduled", function () {
    if (sendHttpRequestOverSocket) mapArrayWithFunction("onFastRefreshScheduled");
    backendController._bridge.send("fastRefreshScheduled");
  });

  // Handler: Hook operations event
  defineOrAssignProperty(F4(backendController), "onHookOperations", function (operations) {
    if (sendHttpRequestOverSocket) mapArrayWithFunction("onHookOperations", `(${operations.length}) [${operations.join(", ")}]`);
    backendController._bridge.send("operations", operations);
    // Handle persisted selection logic
    if (backendController._persistedSelection !== null) {
      const rendererID = operations[0];
      if (backendController._persistedSelection.rendererID === rendererID) {
        const rendererInterface = backendController._rendererInterfaces[rendererID];
        if (rendererInterface == null) {
          console.warn(`Invalid renderer id "${rendererID}"`);
        } else {
          const previousMatch = backendController._persistedSelectionMatch;
          const currentMatch = rendererInterface.getBestMatchForTrackedPath();
          backendController._persistedSelectionMatch = currentMatch;
          const previousID = previousMatch !== null ? previousMatch.id : null;
          const currentID = currentMatch !== null ? currentMatch.id : null;
          if (previousID !== currentID) {
            if (currentID !== null) {
              backendController._bridge.send("selectFiber", currentID);
            }
          }
          if (currentMatch !== null && currentMatch.isFullMatch) {
            backendController._persistedSelection = null;
            backendController._persistedSelectionMatch = null;
            rendererInterface.setTrackedPath(null);
          }
        }
      }
    }
  });

  // Handler: Throttled persist selection (debounced)
  defineOrAssignProperty(F4(backendController), "_throttledPersistSelection", streamAsyncIterableToWritable()(function (rendererID, fiberID) {
    const rendererInterface = backendController._rendererInterfaces[rendererID];
    const trackedPath = rendererInterface != null ? rendererInterface.getPathForElement(fiberID) : null;
    if (trackedPath !== null) {
      processRegexMatchResult(invokeHandlerWithArguments, JSON.stringify({ rendererID, path: trackedPath }));
    } else {
      findMatchingParentNode(invokeHandlerWithArguments);
    }
  }, 1000));

  // If profiling was enabled before reload, restore state
  if (D1(M1) === "true") {
    backendController._recordChangeDescriptions = D1(F1) === "true";
    backendController._isProfiling = true;
    findMatchingParentNode(F1);
    findMatchingParentNode(M1);
  }

  // Restore persisted selection if available
  const persistedSelectionString = D1(invokeHandlerWithArguments);
  if (persistedSelectionString != null) {
    backendController._persistedSelection = JSON.parse(persistedSelectionString);
  }

  // Attach the bridge and register all event listeners
  backendController._bridge = bridge;
  bridge.addListener("clearErrorsAndWarnings", backendController.clearErrorsAndWarnings);
  bridge.addListener("clearErrorsForFiberID", backendController.clearErrorsForFiberID);
  bridge.addListener("clearWarningsForFiberID", backendController.clearWarningsForFiberID);
  bridge.addListener("copyElementPath", backendController.copyElementPath);
  bridge.addListener("deletePath", backendController.deletePath);
  bridge.addListener("getBackendVersion", backendController.getBackendVersion);
  bridge.addListener("getBridgeProtocol", backendController.getBridgeProtocol);
  bridge.addListener("getProfilingData", backendController.getProfilingData);
  bridge.addListener("getProfilingStatus", backendController.getProfilingStatus);
  bridge.addListener("getOwnersList", backendController.getOwnersList);
  bridge.addListener("inspectElement", backendController.inspectElement);
  bridge.addListener("logElementToConsole", backendController.logElementToConsole);
  bridge.addListener("overrideError", backendController.overrideError);
  bridge.addListener("overrideSuspense", backendController.overrideSuspense);
  bridge.addListener("overrideValueAtPath", backendController.overrideValueAtPath);
  bridge.addListener("reloadAndProfile", backendController.reloadAndProfile);
  bridge.addListener("renamePath", backendController.renamePath);
  bridge.addListener("setTraceUpdatesEnabled", backendController.setTraceUpdatesEnabled);
  bridge.addListener("startProfiling", backendController.startProfiling);
  bridge.addListener("stopProfiling", backendController.stopProfiling);
  bridge.addListener("storeAsGlobal", backendController.storeAsGlobal);
  bridge.addListener("syncSelectionFromNativeElementsPanel", backendController.syncSelectionFromNativeElementsPanel);
  bridge.addListener("shutdown", backendController.shutdown);
  bridge.addListener("updateConsolePatchSettings", backendController.updateConsolePatchSettings);
  bridge.addListener("updateComponentFilters", backendController.updateComponentFilters);
  bridge.addListener("viewAttributeSource", backendController.viewAttributeSource);
  bridge.addListener("viewElementSource", backendController.viewElementSource);
  bridge.addListener("overrideContext", backendController.overrideContext);
  bridge.addListener("overrideHookState", backendController.overrideHookState);
  bridge.addListener("overrideProps", backendController.overrideProps);
  bridge.addListener("overrideState", backendController.overrideState);

  // If profiling is enabled, notify the frontend
  if (backendController._isProfiling) {
    bridge.send("profilingStatus", true);
  }

  // Send backend version and bridge protocol to frontend
  const backendVersion = "5.3.2-c82bcbeb2b";
  if (backendVersion) {
    backendController._bridge.send("backendVersion", backendVersion);
  }
  backendController._bridge.send("bridgeProtocol", Jp);

  // Check if localStorage is supported
  let isBackendStorageAPISupported = false;
  try {
    localStorage.getItem("test");
    isBackendStorageAPISupported = true;
  } catch (error) {}
  bridge.send("isBackendStorageAPISupported", isBackendStorageAPISupported);

  // Check if synchronous XHR is supported
  bridge.send("isSynchronousXHRSupported", enqueueOrProcessAction());

  // Initialize additional backend features
  processComponentUpdate(bridge, F4(backendController));
  updateChildLanesAndSubtreeFlags(F4(backendController));

  return backendController;
}

module.exports = initializeSyncSelectionFromNativeElementsPanel;