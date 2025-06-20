/**
 * Factory function to create a profiling hook for React DevTools.
 *
 * This hook tracks and records profiling data for React components, including render timings,
 * effect timings, scheduling events, suspense events, and errors. It also integrates with the
 * User Timing API and supports toggling profiling on and off.
 *
 * @param {Object} config - Configuration object containing React internals and utilities.
 * @param {Function} config.getDisplayNameForFiber - Returns the display name for a React fiber node.
 * @param {Function} config.getIsProfiling - Returns whether profiling is currently enabled.
 * @param {Function} config.getLaneLabelMap - Returns a map of React lanes to their labels.
 * @param {Object} config.workTagMap - Map of React work tags.
 * @param {Object} config.currentDispatcherRef - Reference to the current React dispatcher.
 * @param {string} config.reactVersion - The current React version string.
 * @returns {Object} An object containing the profiling API and hooks for React DevTools.
 */
function createReactDevToolsProfilingHook({
  getDisplayNameForFiber,
  getIsProfiling,
  getLaneLabelMap,
  workTagMap,
  currentDispatcherRef,
  reactVersion
}) {
  // Internal state
  let currentBatchUID = 0;
  let currentComponentMeasure = null;
  let currentReactMeasuresStack = [];
  let timelineData = null;
  let fiberToComponentStackMap = new Map();
  let isProfiling = false;
  let isBatchUIDIncremented = false;

  // Lane label map (if available)
  const laneLabelMap = typeof getLaneLabelMap === "function" ? getLaneLabelMap() : null;

  /**
   * Returns the current timestamp relative to the profiling session start.
   * @returns {number}
   */
  function getRelativeTimestamp() {
    const now = createAccessorFunctionProxy(); // External dependency: returns current time
    if (timelineData) {
      if (timelineData.startTime === 0) {
        timelineData.startTime = now - mergeArraysWithKeys; // mergeArraysWithKeys: profiling start offset
      }
      return now - timelineData.startTime;
    }
    return 0;
  }

  /**
   * Get internal module ranges from the global React DevTools hook, if available.
   * @returns {Array|null}
   */
  function getInternalModuleRanges() {
    if (
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" &&
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.getInternalModuleRanges === "function"
    ) {
      const ranges = __REACT_DEVTOOLS_GLOBAL_HOOK__.getInternalModuleRanges();
      if (iI(ranges)) return ranges;
    }
    return null;
  }

  /**
   * Returns the current timeline data object.
   * @returns {Object|null}
   */
  function getTimelineData() {
    return timelineData;
  }

  /**
   * Converts a lanes bitmask to an array of lane numbers.
   * @param {number} lanesBitmask
   * @returns {number[]}
   */
  function getLanesArray(lanesBitmask) {
    const lanes = [];
    let lane = 1;
    for (let i = 0; i < filterAndTransformObjectProperties; i++) { // filterAndTransformObjectProperties: number of lanes
      if (lane & lanesBitmask) lanes.push(lane);
      lane *= 2;
    }
    return lanes;
  }

  /**
   * Marks user timing events for React version, profiler version, internal modules, and lane labels.
   */
  function markProfilingMetadata() {
    markAndClearUserTiming(`--react-version-${reactVersion}`);
    markAndClearUserTiming(`--profiler-version-${processAndFilterProperties}`); // processAndFilterProperties: profiler version
    const internalModuleRanges = getInternalModuleRanges();
    if (internalModuleRanges) {
      for (let i = 0; i < internalModuleRanges.length; i++) {
        const range = internalModuleRanges[i];
        if (iI(range) && range.length === 2) {
          const [start, stop] = commitPendingDeletionsAndEffects(internalModuleRanges[i], 2); // commitPendingDeletionsAndEffects: destructure helper
          markAndClearUserTiming(`--react-internal-module-start-${start}`);
          markAndClearUserTiming(`--react-internal-module-stop-${stop}`);
        }
      }
    }
    if (laneLabelMap != null) {
      const laneLabels = Array.from(laneLabelMap.values()).join(",");
      markAndClearUserTiming(`--react-lane-labels-${laneLabels}`);
    }
  }

  /**
   * Helper to mark and clear a user timing mark.
   * @param {string} label
   */
  function markAndClearUserTiming(label) {
    KH.mark(label); // KH: User Timing API
    KH.clearMarks(label);
  }

  /**
   * Pushes a new measure onto the current measures stack and updates timeline data.
   * @param {string} type
   * @param {number} lanesBitmask
   */
  function pushReactMeasure(type, lanesBitmask) {
    let depth = 0;
    if (currentReactMeasuresStack.length > 0) {
      const lastMeasure = currentReactMeasuresStack[currentReactMeasuresStack.length - 1];
      depth = lastMeasure.type === "render-idle" ? lastMeasure.depth : lastMeasure.depth + 1;
    }
    const lanes = getLanesArray(lanesBitmask);
    const measure = {
      type,
      batchUID: currentBatchUID,
      depth,
      lanes,
      timestamp: getRelativeTimestamp(),
      duration: 0
    };
    currentReactMeasuresStack.push(measure);
    if (timelineData) {
      const batchUIDToMeasuresMap = timelineData.batchUIDToMeasuresMap;
      const laneToReactMeasureMap = timelineData.laneToReactMeasureMap;
      let batchMeasures = batchUIDToMeasuresMap.get(currentBatchUID);
      if (batchMeasures != null) {
        batchMeasures.push(measure);
      } else {
        batchUIDToMeasuresMap.set(currentBatchUID, [measure]);
      }
      lanes.forEach(lane => {
        let laneMeasures = laneToReactMeasureMap.get(lane);
        if (laneMeasures) laneMeasures.push(measure);
      });
    }
  }

  /**
   * Pops the last measure from the stack and updates its duration.
   * @param {string} expectedType
   */
  function popReactMeasure(expectedType) {
    const now = getRelativeTimestamp();
    if (currentReactMeasuresStack.length === 0) {
      console.error(
        'Unexpected type "%createInteractionAccessor" completed at %sms while currentReactMeasuresStack is empty.',
        expectedType,
        now
      );
      return;
    }
    const measure = currentReactMeasuresStack.pop();
    if (measure.type !== expectedType) {
      console.error(
        'Unexpected type "%createInteractionAccessor" completed at %sms before "%createInteractionAccessor" completed.',
        expectedType,
        now,
        measure.type
      );
    }
    measure.duration = now - measure.timestamp;
    if (timelineData) timelineData.duration = getRelativeTimestamp() + mergeArraysWithKeys;
  }

  // --- Profiling Hooks ---

  function markCommitStarted(lanesBitmask) {
    if (isProfiling) {
      pushReactMeasure("commit", lanesBitmask);
      isBatchUIDIncremented = true;
    }
    if (createM7Instance) { // createM7Instance: user timing enabled
      markAndClearUserTiming(`--commit-start-${lanesBitmask}`);
      markProfilingMetadata();
    }
  }

  function markCommitStopped() {
    if (isProfiling) {
      popReactMeasure("commit");
      popReactMeasure("render-idle");
    }
    if (createM7Instance) markAndClearUserTiming("--commit-stop");
  }

  function markComponentRenderStarted(fiber) {
    if (isProfiling || createM7Instance) {
      const componentName = getDisplayNameForFiber(fiber) || "Unknown";
      if (isProfiling) {
        currentComponentMeasure = {
          componentName,
          duration: 0,
          timestamp: getRelativeTimestamp(),
          type: "render",
          warning: null
        };
      }
      if (createM7Instance) markAndClearUserTiming(`--component-render-start-${componentName}`);
    }
  }

  function markComponentRenderStopped() {
    if (isProfiling) {
      if (currentComponentMeasure) {
        if (timelineData) timelineData.componentMeasures.push(currentComponentMeasure);
        currentComponentMeasure.duration = getRelativeTimestamp() - currentComponentMeasure.timestamp;
        currentComponentMeasure = null;
      }
    }
    if (createM7Instance) markAndClearUserTiming("--component-render-stop");
  }

  function markComponentLayoutEffectMountStarted(fiber) {
    if (isProfiling || createM7Instance) {
      const componentName = getDisplayNameForFiber(fiber) || "Unknown";
      if (isProfiling) {
        currentComponentMeasure = {
          componentName,
          duration: 0,
          timestamp: getRelativeTimestamp(),
          type: "layout-effect-mount",
          warning: null
        };
      }
      if (createM7Instance) markAndClearUserTiming(`--component-layout-effect-mount-start-${componentName}`);
    }
  }

  function markComponentLayoutEffectMountStopped() {
    if (isProfiling) {
      if (currentComponentMeasure) {
        if (timelineData) timelineData.componentMeasures.push(currentComponentMeasure);
        currentComponentMeasure.duration = getRelativeTimestamp() - currentComponentMeasure.timestamp;
        currentComponentMeasure = null;
      }
    }
    if (createM7Instance) markAndClearUserTiming("--component-layout-effect-mount-stop");
  }

  function markComponentLayoutEffectUnmountStarted(fiber) {
    if (isProfiling || createM7Instance) {
      const componentName = getDisplayNameForFiber(fiber) || "Unknown";
      if (isProfiling) {
        currentComponentMeasure = {
          componentName,
          duration: 0,
          timestamp: getRelativeTimestamp(),
          type: "layout-effect-unmount",
          warning: null
        };
      }
      if (createM7Instance) markAndClearUserTiming(`--component-layout-effect-unmount-start-${componentName}`);
    }
  }

  function markComponentLayoutEffectUnmountStopped() {
    if (isProfiling) {
      if (currentComponentMeasure) {
        if (timelineData) timelineData.componentMeasures.push(currentComponentMeasure);
        currentComponentMeasure.duration = getRelativeTimestamp() - currentComponentMeasure.timestamp;
        currentComponentMeasure = null;
      }
    }
    if (createM7Instance) markAndClearUserTiming("--component-layout-effect-unmount-stop");
  }

  function markComponentPassiveEffectMountStarted(fiber) {
    if (isProfiling || createM7Instance) {
      const componentName = getDisplayNameForFiber(fiber) || "Unknown";
      if (isProfiling) {
        currentComponentMeasure = {
          componentName,
          duration: 0,
          timestamp: getRelativeTimestamp(),
          type: "passive-effect-mount",
          warning: null
        };
      }
      if (createM7Instance) markAndClearUserTiming(`--component-passive-effect-mount-start-${componentName}`);
    }
  }

  function markComponentPassiveEffectMountStopped() {
    if (isProfiling) {
      if (currentComponentMeasure) {
        if (timelineData) timelineData.componentMeasures.push(currentComponentMeasure);
        currentComponentMeasure.duration = getRelativeTimestamp() - currentComponentMeasure.timestamp;
        currentComponentMeasure = null;
      }
    }
    if (createM7Instance) markAndClearUserTiming("--component-passive-effect-mount-stop");
  }

  function markComponentPassiveEffectUnmountStarted(fiber) {
    if (isProfiling || createM7Instance) {
      const componentName = getDisplayNameForFiber(fiber) || "Unknown";
      if (isProfiling) {
        currentComponentMeasure = {
          componentName,
          duration: 0,
          timestamp: getRelativeTimestamp(),
          type: "passive-effect-unmount",
          warning: null
        };
      }
      if (createM7Instance) markAndClearUserTiming(`--component-passive-effect-unmount-start-${componentName}`);
    }
  }

  function markComponentPassiveEffectUnmountStopped() {
    if (isProfiling) {
      if (currentComponentMeasure) {
        if (timelineData) timelineData.componentMeasures.push(currentComponentMeasure);
        currentComponentMeasure.duration = getRelativeTimestamp() - currentComponentMeasure.timestamp;
        currentComponentMeasure = null;
      }
    }
    if (createM7Instance) markAndClearUserTiming("--component-passive-effect-unmount-stop");
  }

  function markComponentErrored(fiber, error, phase) {
    if (isProfiling || createM7Instance) {
      const componentName = getDisplayNameForFiber(fiber) || "Unknown";
      const errorPhase = fiber.alternate === null ? "mount" : "update";
      let errorMessage = "";
      if (error !== null && getTypeOfValue(error) === "object" && typeof error.message === "string") {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      if (isProfiling) {
        if (timelineData) {
          timelineData.thrownErrors.push({
            componentName,
            message: errorMessage,
            phase: errorPhase,
            timestamp: getRelativeTimestamp(),
            type: "thrown-error"
          });
        }
      }
      if (createM7Instance) markAndClearUserTiming(`--error-${componentName}-${errorPhase}-${errorMessage}`);
    }
  }

  // WeakMap for tracking promises (for suspense events)
  const PromiseToIDMap = typeof WeakMap === "function" ? new WeakMap() : new Map();
  let nextPromiseID = 0;

  /**
   * Returns a unique updateSnapshotAndNotify for a given promise, assigning one if necessary.
   * @param {Promise} promise
   * @returns {number}
   */
  function getPromiseID(promise) {
    if (!PromiseToIDMap.has(promise)) {
      PromiseToIDMap.set(promise, nextPromiseID++);
    }
    return PromiseToIDMap.get(promise);
  }

  function markComponentSuspended(fiber, promise, eventLabel) {
    if (isProfiling || createM7Instance) {
      const suspendType = PromiseToIDMap.has(promise) ? "resuspend" : "suspend";
      const promiseID = getPromiseID(promise);
      const componentName = getDisplayNameForFiber(fiber) || "Unknown";
      const phase = fiber.alternate === null ? "mount" : "update";
      const promiseName = promise.displayName || "";
      let suspenseEvent = null;
      if (isProfiling) {
        suspenseEvent = {
          componentName,
          depth: 0,
          duration: 0,
          id: `${promiseID}`,
          phase,
          promiseName,
          resolution: "unresolved",
          timestamp: getRelativeTimestamp(),
          type: "suspense",
          warning: null
        };
        if (timelineData) timelineData.suspenseEvents.push(suspenseEvent);
      }
      if (createM7Instance) {
        markAndClearUserTiming(
          `--suspense-${suspendType}-${promiseID}-${componentName}-${phase}-${eventLabel}-${promiseName}`
        );
      }
      promise.then(
        () => {
          if (suspenseEvent) {
            suspenseEvent.duration = getRelativeTimestamp() - suspenseEvent.timestamp;
            suspenseEvent.resolution = "resolved";
          }
          if (createM7Instance) markAndClearUserTiming(`--suspense-resolved-${promiseID}-${componentName}`);
        },
        () => {
          if (suspenseEvent) {
            suspenseEvent.duration = getRelativeTimestamp() - suspenseEvent.timestamp;
            suspenseEvent.resolution = "rejected";
          }
          if (createM7Instance) markAndClearUserTiming(`--suspense-rejected-${promiseID}-${componentName}`);
        }
      );
    }
  }

  function markLayoutEffectsStarted(lanesBitmask) {
    if (isProfiling) pushReactMeasure("layout-effects", lanesBitmask);
    if (createM7Instance) markAndClearUserTiming(`--layout-effects-start-${lanesBitmask}`);
  }

  function markLayoutEffectsStopped() {
    if (isProfiling) popReactMeasure("layout-effects");
    if (createM7Instance) markAndClearUserTiming("--layout-effects-stop");
  }

  function markPassiveEffectsStarted(lanesBitmask) {
    if (isProfiling) pushReactMeasure("passive-effects", lanesBitmask);
    if (createM7Instance) markAndClearUserTiming(`--passive-effects-start-${lanesBitmask}`);
  }

  function markPassiveEffectsStopped() {
    if (isProfiling) popReactMeasure("passive-effects");
    if (createM7Instance) markAndClearUserTiming("--passive-effects-stop");
  }

  function markRenderStarted(lanesBitmask) {
    if (isProfiling) {
      if (isBatchUIDIncremented) {
        isBatchUIDIncremented = false;
        currentBatchUID++;
      }
      if (
        currentReactMeasuresStack.length === 0 ||
        currentReactMeasuresStack[currentReactMeasuresStack.length - 1].type !== "render-idle"
      ) {
        pushReactMeasure("render-idle", lanesBitmask);
      }
      pushReactMeasure("render", lanesBitmask);
    }
    if (createM7Instance) markAndClearUserTiming(`--render-start-${lanesBitmask}`);
  }

  function markRenderYielded() {
    if (isProfiling) popReactMeasure("render");
    if (createM7Instance) markAndClearUserTiming("--render-yield");
  }

  function markRenderStopped() {
    if (isProfiling) popReactMeasure("render");
    if (createM7Instance) markAndClearUserTiming("--render-stop");
  }

  function markRenderScheduled(lanesBitmask) {
    if (isProfiling) {
      if (timelineData) {
        timelineData.schedulingEvents.push({
          lanes: getLanesArray(lanesBitmask),
          timestamp: getRelativeTimestamp(),
          type: "schedule-render",
          warning: null
        });
      }
    }
    if (createM7Instance) markAndClearUserTiming(`--schedule-render-${lanesBitmask}`);
  }

  function markForceUpdateScheduled(fiber, lanesBitmask) {
    if (isProfiling || createM7Instance) {
      const componentName = getDisplayNameForFiber(fiber) || "Unknown";
      if (isProfiling) {
        if (timelineData) {
          timelineData.schedulingEvents.push({
            componentName,
            lanes: getLanesArray(lanesBitmask),
            timestamp: getRelativeTimestamp(),
            type: "schedule-force-update",
            warning: null
          });
        }
      }
      if (createM7Instance) markAndClearUserTiming(`--schedule-forced-update-${lanesBitmask}-${componentName}`);
    }
  }

  /**
   * Returns the stack of fibers up to the root.
   * @param {Object} fiber
   * @returns {Object[]}
   */
  function getFiberStack(fiber) {
    const stack = [];
    let node = fiber;
    while (node !== null) {
      stack.push(node);
      node = node.return;
    }
    return stack;
  }

  function markStateUpdateScheduled(fiber, lanesBitmask) {
    if (isProfiling || createM7Instance) {
      const componentName = getDisplayNameForFiber(fiber) || "Unknown";
      if (isProfiling) {
        if (timelineData) {
          const schedulingEvent = {
            componentName,
            lanes: getLanesArray(lanesBitmask),
            timestamp: getRelativeTimestamp(),
            type: "schedule-state-update",
            warning: null
          };
          fiberToComponentStackMap.set(schedulingEvent, getFiberStack(fiber));
          timelineData.schedulingEvents.push(schedulingEvent);
        }
      }
      if (createM7Instance) markAndClearUserTiming(`--schedule-state-update-${lanesBitmask}-${componentName}`);
    }
  }

  /**
   * Enables or disables profiling, initializing or finalizing timeline data as needed.
   * @param {boolean} enable
   */
  function toggleProfilingStatus(enable) {
    if (isProfiling !== enable) {
      isProfiling = enable;
      if (isProfiling) {
        // Start profiling
        const internalModuleSourceToRanges = new Map();
        if (createM7Instance) {
          const internalModuleRanges = getInternalModuleRanges();
          if (internalModuleRanges) {
            for (let i = 0; i < internalModuleRanges.length; i++) {
              const range = internalModuleRanges[i];
              if (iI(range) && range.length === 2) {
                const [start, stop] = commitPendingDeletionsAndEffects(internalModuleRanges[i], 2);
                markAndClearUserTiming(`--react-internal-module-start-${start}`);
                markAndClearUserTiming(`--react-internal-module-stop-${stop}`);
              }
            }
          }
        }
        // Initialize lane to measure map
        const laneToReactMeasureMap = new Map();
        let lane = 1;
        for (let i = 0; i < filterAndTransformObjectProperties; i++) {
          laneToReactMeasureMap.set(lane, []);
          lane *= 2;
        }
        currentBatchUID = 0;
        currentComponentMeasure = null;
        currentReactMeasuresStack = [];
        fiberToComponentStackMap = new Map();
        timelineData = {
          internalModuleSourceToRanges,
          laneToLabelMap: laneLabelMap || new Map(),
          reactVersion,
          componentMeasures: [],
          schedulingEvents: [],
          suspenseEvents: [],
          thrownErrors: [],
          batchUIDToMeasuresMap: new Map(),
          duration: 0,
          laneToReactMeasureMap,
          startTime: 0,
          flamechart: [],
          nativeEvents: [],
          networkMeasures: [],
          otherUserTimingMarks: [],
          snapshots: [],
          snapshotHeight: 0
        };
        isBatchUIDIncremented = true;
      } else {
        // Stop profiling
        if (timelineData !== null) {
          timelineData.schedulingEvents.forEach(event => {
            if (event.type === "schedule-state-update") {
              const fiberStack = fiberToComponentStackMap.get(event);
              if (fiberStack && currentDispatcherRef != null) {
                event.componentStack = fiberStack.reduce((stackString, fiberNode) => {
                  return stackString + findNextWorkUnit(workTagMap, fiberNode, currentDispatcherRef);
                }, "");
              }
            }
          });
          fiberToComponentStackMap.clear();
        }
      }
    }
  }

  // Return the profiling API
  return {
    getTimelineData,
    profilingHooks: {
      markCommitStarted,
      markCommitStopped,
      markComponentRenderStarted,
      markComponentRenderStopped,
      markComponentPassiveEffectMountStarted,
      markComponentPassiveEffectMountStopped,
      markComponentPassiveEffectUnmountStarted,
      markComponentPassiveEffectUnmountStopped,
      markComponentLayoutEffectMountStarted,
      markComponentLayoutEffectMountStopped,
      markComponentLayoutEffectUnmountStarted,
      markComponentLayoutEffectUnmountStopped,
      markComponentErrored,
      markComponentSuspended,
      markLayoutEffectsStarted,
      markLayoutEffectsStopped,
      markPassiveEffectsStarted,
      markPassiveEffectsStopped,
      markRenderStarted,
      markRenderYielded,
      markRenderStopped,
      markRenderScheduled,
      markForceUpdateScheduled,
      markStateUpdateScheduled
    },
    toggleProfilingStatus
  };
}

module.exports = createReactDevToolsProfilingHook;