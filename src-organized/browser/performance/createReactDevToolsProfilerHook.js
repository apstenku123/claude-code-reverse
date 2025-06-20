/**
 * Factory function to create a React DevTools Profiler Hook.
 * This hook tracks and records profiling information about React component lifecycle events,
 * such as renders, effects, errors, and scheduling events. It provides hooks for marking
 * the start and stop of these events, and aggregates the data for later retrieval.
 *
 * @param {Object} config - Configuration object with React internals and helpers.
 * @param {function} config.getDisplayNameForFiber - Returns the display name for a React fiber.
 * @param {function} config.getIsProfiling - Returns whether profiling is currently enabled.
 * @param {function} config.getLaneLabelMap - Returns a map of React lanes to labels.
 * @param {Object} config.workTagMap - Map of React work tags.
 * @param {Object} config.currentDispatcherRef - Reference to the current React dispatcher.
 * @param {string} config.reactVersion - The current React version string.
 * @returns {Object} Profiler API with timeline data and profiling hooks.
 */
function createReactDevToolsProfilerHook(config) {
  const {
    getDisplayNameForFiber,
    getIsProfiling,
    getLaneLabelMap,
    workTagMap,
    currentDispatcherRef,
    reactVersion
  } = config;

  let currentBatchUID = 0;
  let currentComponentMeasure = null;
  let currentReactMeasuresStack = [];
  let timelineData = null;
  let fiberToComponentStackMap = new Map();
  let isProfiling = false;
  let isNewBatch = false;

  /**
   * Returns the current relative timestamp for profiling events.
   * @returns {number}
   */
  function getRelativeTimestamp() {
    const now = createAccessorFunctionProxy();
    if (timelineData) {
      if (timelineData.startTime === 0) timelineData.startTime = now - mergeArraysWithKeys;
      return now - timelineData.startTime;
    }
    return 0;
  }

  /**
   * Retrieves internal React module ranges from the global hook, if available.
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
    for (let i = 0; i < filterAndTransformObjectProperties; i++) {
      if (lane & lanesBitmask) lanes.push(lane);
      lane *= 2;
    }
    return lanes;
  }

  // Lane label map, if available
  const laneLabelMap = typeof getLaneLabelMap === "function" ? getLaneLabelMap() : null;

  /**
   * Marks a user timing event for React and profiler versions, and internal module ranges.
   */
  function markProfilerVersionsAndModules() {
    markAndClear(`--react-version-${reactVersion}`);
    markAndClear(`--profiler-version-${processAndFilterProperties}`);
    const internalModuleRanges = getInternalModuleRanges();
    if (internalModuleRanges) {
      for (let i = 0; i < internalModuleRanges.length; i++) {
        const range = internalModuleRanges[i];
        if (iI(range) && range.length === 2) {
          const [start, stop] = commitPendingDeletionsAndEffects(internalModuleRanges[i], 2);
          markAndClear(`--react-internal-module-start-${start}`);
          markAndClear(`--react-internal-module-stop-${stop}`);
        }
      }
    }
    if (laneLabelMap != null) {
      const labels = Array.from(laneLabelMap.values()).join(",");
      markAndClear(`--react-lane-labels-${labels}`);
    }
  }

  /**
   * Helper to mark and clear a user timing mark.
   * @param {string} markName
   */
  function markAndClear(markName) {
    KH.mark(markName);
    KH.clearMarks(markName);
  }

  /**
   * Pushes a new measure onto the current measures stack and timeline data.
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
   * Pops a measure from the stack and updates its duration.
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

  /**
   * Marks the start of a commit phase.
   * @param {number} lanesBitmask
   */
  function markCommitStarted(lanesBitmask) {
    if (isProfiling) {
      pushReactMeasure("commit", lanesBitmask);
      isNewBatch = true;
    }
    if (createM7Instance) {
      markAndClear(`--commit-start-${lanesBitmask}`);
      markProfilerVersionsAndModules();
    }
  }

  /**
   * Marks the end of a commit phase.
   */
  function markCommitStopped() {
    if (isProfiling) {
      popReactMeasure("commit");
      popReactMeasure("render-idle");
    }
    if (createM7Instance) markAndClear("--commit-stop");
  }

  /**
   * Marks the start of a component render.
   * @param {Object} fiber
   */
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
      if (createM7Instance) markAndClear(`--component-render-start-${componentName}`);
    }
  }

  /**
   * Marks the end of a component render.
   */
  function markComponentRenderStopped() {
    if (isProfiling && currentComponentMeasure) {
      if (timelineData) timelineData.componentMeasures.push(currentComponentMeasure);
      currentComponentMeasure.duration = getRelativeTimestamp() - currentComponentMeasure.timestamp;
      currentComponentMeasure = null;
    }
    if (createM7Instance) markAndClear("--component-render-stop");
  }

  /**
   * Marks the start of a component layout effect mount.
   * @param {Object} fiber
   */
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
      if (createM7Instance) markAndClear(`--component-layout-effect-mount-start-${componentName}`);
    }
  }

  /**
   * Marks the end of a component layout effect mount.
   */
  function markComponentLayoutEffectMountStopped() {
    if (isProfiling && currentComponentMeasure) {
      if (timelineData) timelineData.componentMeasures.push(currentComponentMeasure);
      currentComponentMeasure.duration = getRelativeTimestamp() - currentComponentMeasure.timestamp;
      currentComponentMeasure = null;
    }
    if (createM7Instance) markAndClear("--component-layout-effect-mount-stop");
  }

  /**
   * Marks the start of a component layout effect unmount.
   * @param {Object} fiber
   */
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
      if (createM7Instance) markAndClear(`--component-layout-effect-unmount-start-${componentName}`);
    }
  }

  /**
   * Marks the end of a component layout effect unmount.
   */
  function markComponentLayoutEffectUnmountStopped() {
    if (isProfiling && currentComponentMeasure) {
      if (timelineData) timelineData.componentMeasures.push(currentComponentMeasure);
      currentComponentMeasure.duration = getRelativeTimestamp() - currentComponentMeasure.timestamp;
      currentComponentMeasure = null;
    }
    if (createM7Instance) markAndClear("--component-layout-effect-unmount-stop");
  }

  /**
   * Marks the start of a component passive effect mount.
   * @param {Object} fiber
   */
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
      if (createM7Instance) markAndClear(`--component-passive-effect-mount-start-${componentName}`);
    }
  }

  /**
   * Marks the end of a component passive effect mount.
   */
  function markComponentPassiveEffectMountStopped() {
    if (isProfiling && currentComponentMeasure) {
      if (timelineData) timelineData.componentMeasures.push(currentComponentMeasure);
      currentComponentMeasure.duration = getRelativeTimestamp() - currentComponentMeasure.timestamp;
      currentComponentMeasure = null;
    }
    if (createM7Instance) markAndClear("--component-passive-effect-mount-stop");
  }

  /**
   * Marks the start of a component passive effect unmount.
   * @param {Object} fiber
   */
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
      if (createM7Instance) markAndClear(`--component-passive-effect-unmount-start-${componentName}`);
    }
  }

  /**
   * Marks the end of a component passive effect unmount.
   */
  function markComponentPassiveEffectUnmountStopped() {
    if (isProfiling && currentComponentMeasure) {
      if (timelineData) timelineData.componentMeasures.push(currentComponentMeasure);
      currentComponentMeasure.duration = getRelativeTimestamp() - currentComponentMeasure.timestamp;
      currentComponentMeasure = null;
    }
    if (createM7Instance) markAndClear("--component-passive-effect-unmount-stop");
  }

  /**
   * Marks a thrown error for a component.
   * @param {Object} fiber
   * @param {Error|string|null} error
   * @param {any} phase
   */
  function markComponentErrored(fiber, error, phase) {
    if (isProfiling || createM7Instance) {
      const componentName = getDisplayNameForFiber(fiber) || "Unknown";
      const lifecyclePhase = fiber.alternate === null ? "mount" : "update";
      let message = "";
      if (error !== null && getTypeOfValue(error) === "object" && typeof error.message === "string") {
        message = error.message;
      } else if (typeof error === "string") {
        message = error;
      }
      if (isProfiling && timelineData) {
        timelineData.thrownErrors.push({
          componentName,
          message,
          phase: lifecyclePhase,
          timestamp: getRelativeTimestamp(),
          type: "thrown-error"
        });
      }
      if (createM7Instance) markAndClear(`--error-${componentName}-${lifecyclePhase}-${message}`);
    }
  }

  // WeakMap for tracking promises for suspense events
  const PromiseToSuspenseIDMap = typeof WeakMap === "function" ? WeakMap : Map;
  const suspensePromiseMap = new PromiseToSuspenseIDMap();
  let nextSuspenseID = 0;

  /**
   * Returns a unique updateSnapshotAndNotify for a given promise, assigning one if not present.
   * @param {Promise} promise
   * @returns {number}
   */
  function getSuspenseIDForPromise(promise) {
    if (!suspensePromiseMap.has(promise)) suspensePromiseMap.set(promise, nextSuspenseID++);
    return suspensePromiseMap.get(promise);
  }

  /**
   * Marks a component as suspended (by a promise), and tracks resolution/rejection.
   * @param {Object} fiber
   * @param {Promise} promise
   * @param {string} eventLabel
   */
  function markComponentSuspended(fiber, promise, eventLabel) {
    if (isProfiling || createM7Instance) {
      const suspendType = suspensePromiseMap.has(promise) ? "resuspend" : "suspend";
      const suspenseID = getSuspenseIDForPromise(promise);
      const componentName = getDisplayNameForFiber(fiber) || "Unknown";
      const phase = fiber.alternate === null ? "mount" : "update";
      const promiseName = promise.displayName || "";
      let suspenseEvent = null;
      if (isProfiling) {
        suspenseEvent = {
          componentName,
          depth: 0,
          duration: 0,
          id: `${suspenseID}`,
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
        markAndClear(
          `--suspense-${suspendType}-${suspenseID}-${componentName}-${phase}-${eventLabel}-${promiseName}`
        );
      }
      promise.then(
        () => {
          if (suspenseEvent) {
            suspenseEvent.duration = getRelativeTimestamp() - suspenseEvent.timestamp;
            suspenseEvent.resolution = "resolved";
          }
          if (createM7Instance) markAndClear(`--suspense-resolved-${suspenseID}-${componentName}`);
        },
        () => {
          if (suspenseEvent) {
            suspenseEvent.duration = getRelativeTimestamp() - suspenseEvent.timestamp;
            suspenseEvent.resolution = "rejected";
          }
          if (createM7Instance) markAndClear(`--suspense-rejected-${suspenseID}-${componentName}`);
        }
      );
    }
  }

  /**
   * Marks the start of layout effects phase.
   * @param {number} lanesBitmask
   */
  function markLayoutEffectsStarted(lanesBitmask) {
    if (isProfiling) pushReactMeasure("layout-effects", lanesBitmask);
    if (createM7Instance) markAndClear(`--layout-effects-start-${lanesBitmask}`);
  }

  /**
   * Marks the end of layout effects phase.
   */
  function markLayoutEffectsStopped() {
    if (isProfiling) popReactMeasure("layout-effects");
    if (createM7Instance) markAndClear("--layout-effects-stop");
  }

  /**
   * Marks the start of passive effects phase.
   * @param {number} lanesBitmask
   */
  function markPassiveEffectsStarted(lanesBitmask) {
    if (isProfiling) pushReactMeasure("passive-effects", lanesBitmask);
    if (createM7Instance) markAndClear(`--passive-effects-start-${lanesBitmask}`);
  }

  /**
   * Marks the end of passive effects phase.
   */
  function markPassiveEffectsStopped() {
    if (isProfiling) popReactMeasure("passive-effects");
    if (createM7Instance) markAndClear("--passive-effects-stop");
  }

  /**
   * Marks the start of a render phase.
   * @param {number} lanesBitmask
   */
  function markRenderStarted(lanesBitmask) {
    if (isProfiling) {
      if (isNewBatch) {
        isNewBatch = false;
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
    if (createM7Instance) markAndClear(`--render-start-${lanesBitmask}`);
  }

  /**
   * Marks a render yield (pause).
   */
  function markRenderYielded() {
    if (isProfiling) popReactMeasure("render");
    if (createM7Instance) markAndClear("--render-yield");
  }

  /**
   * Marks the end of a render phase.
   */
  function markRenderStopped() {
    if (isProfiling) popReactMeasure("render");
    if (createM7Instance) markAndClear("--render-stop");
  }

  /**
   * Marks a render scheduled event.
   * @param {number} lanesBitmask
   */
  function markRenderScheduled(lanesBitmask) {
    if (isProfiling && timelineData) {
      timelineData.schedulingEvents.push({
        lanes: getLanesArray(lanesBitmask),
        timestamp: getRelativeTimestamp(),
        type: "schedule-render",
        warning: null
      });
    }
    if (createM7Instance) markAndClear(`--schedule-render-${lanesBitmask}`);
  }

  /**
   * Marks a force update scheduled event for a component.
   * @param {Object} fiber
   * @param {number} lanesBitmask
   */
  function markForceUpdateScheduled(fiber, lanesBitmask) {
    if (isProfiling || createM7Instance) {
      const componentName = getDisplayNameForFiber(fiber) || "Unknown";
      if (isProfiling && timelineData) {
        timelineData.schedulingEvents.push({
          componentName,
          lanes: getLanesArray(lanesBitmask),
          timestamp: getRelativeTimestamp(),
          type: "schedule-force-update",
          warning: null
        });
      }
      if (createM7Instance) markAndClear(`--schedule-forced-update-${lanesBitmask}-${componentName}`);
    }
  }

  /**
   * Walks up the fiber tree and returns the stack as an array.
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

  /**
   * Marks a state update scheduled event for a component.
   * @param {Object} fiber
   * @param {number} lanesBitmask
   */
  function markStateUpdateScheduled(fiber, lanesBitmask) {
    if (isProfiling || createM7Instance) {
      const componentName = getDisplayNameForFiber(fiber) || "Unknown";
      if (isProfiling && timelineData) {
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
      if (createM7Instance) markAndClear(`--schedule-state-update-${lanesBitmask}-${componentName}`);
    }
  }

  /**
   * Enables or disables profiling, and resets/flushes timeline data as needed.
   * @param {boolean} enable
   */
  function toggleProfilingStatus(enable) {
    if (isProfiling !== enable) {
      isProfiling = enable;
      if (isProfiling) {
        // Start profiling: initialize timeline data
        const internalModuleSourceToRanges = new Map();
        if (createM7Instance) {
          const internalModuleRanges = getInternalModuleRanges();
          if (internalModuleRanges) {
            for (let i = 0; i < internalModuleRanges.length; i++) {
              const range = internalModuleRanges[i];
              if (iI(range) && range.length === 2) {
                const [start, stop] = commitPendingDeletionsAndEffects(internalModuleRanges[i], 2);
                markAndClear(`--react-internal-module-start-${start}`);
                markAndClear(`--react-internal-module-stop-${stop}`);
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
        isNewBatch = true;
      } else {
        // Stop profiling: flush stack traces for state update events
        if (timelineData !== null) {
          timelineData.schedulingEvents.forEach(event => {
            if (event.type === "schedule-state-update") {
              const stack = fiberToComponentStackMap.get(event);
              if (stack && currentDispatcherRef != null) {
                event.componentStack = stack.reduce((acc, fiberNode) => {
                  return acc + findNextWorkUnit(workTagMap, fiberNode, currentDispatcherRef);
                }, "");
              }
            }
          });
        }
        fiberToComponentStackMap.clear();
      }
    }
  }

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

module.exports = createReactDevToolsProfilerHook;
