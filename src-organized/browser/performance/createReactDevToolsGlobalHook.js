/**
 * Factory function to create the React DevTools Global Hook for profiling React applications.
 * Provides profiling hooks and timeline data for React'createInteractionAccessor internal operations.
 *
 * @param {Object} config - Configuration object containing React internals and helpers.
 * @param {Function} config.getDisplayNameForFiber - Returns the display name for a React fiber node.
 * @param {Function} config.getIsProfiling - Returns whether profiling is currently enabled.
 * @param {Function} config.getLaneLabelMap - Returns a map of React lanes to their labels.
 * @param {Object} config.workTagMap - Map of React work tags.
 * @param {Object} config.currentDispatcherRef - Reference to the current React dispatcher.
 * @param {string} config.reactVersion - The current React version string.
 * @returns {Object} An object containing timeline data, profiling hooks, and a toggle for profiling status.
 */
function createReactDevToolsGlobalHook({
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

  /**
   * Returns the current timestamp relative to the start of the timeline.
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
   * Retrieves React internal module ranges from the global hook if available.
   * @returns {Array|null}
   */
  function getInternalModuleRanges() {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ !== "undefined" &&
        typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.getInternalModuleRanges === "function") {
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
   * @returns {Array<number>}
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

  // Lane label map (may be null)
  const laneLabelMap = typeof getLaneLabelMap === "function" ? getLaneLabelMap() : null;

  /**
   * Marks user timing events for profiling and debugging.
   * @param {string} markName
   */
  function markUserTiming(markName) {
    KH.mark(markName);
    KH.clearMarks(markName);
  }

  /**
   * Marks the start of a batch or measure and pushes isBlobOrFileLikeObject onto the stack.
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
   * Marks the end of a batch or measure and pops isBlobOrFileLikeObject from the stack.
   * @param {string} expectedType
   */
  function popReactMeasure(expectedType) {
    const now = getRelativeTimestamp();
    if (currentReactMeasuresStack.length === 0) {
      console.error('Unexpected type "%createInteractionAccessor" completed at %sms while currentReactMeasuresStack is empty.', expectedType, now);
      return;
    }
    const measure = currentReactMeasuresStack.pop();
    if (measure.type !== expectedType) {
      console.error('Unexpected type "%createInteractionAccessor" completed at %sms before "%createInteractionAccessor" completed.', expectedType, now, measure.type);
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
      isBatchUIDIncremented = true;
    }
    if (createM7Instance) {
      markUserTiming(`--commit-start-${lanesBitmask}`);
      markProfilingMetadata();
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
    if (createM7Instance) markUserTiming("--commit-stop");
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
      if (createM7Instance) markUserTiming(`--component-render-start-${componentName}`);
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
    if (createM7Instance) markUserTiming("--component-render-stop");
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
      if (createM7Instance) markUserTiming(`--component-layout-effect-mount-start-${componentName}`);
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
    if (createM7Instance) markUserTiming("--component-layout-effect-mount-stop");
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
      if (createM7Instance) markUserTiming(`--component-layout-effect-unmount-start-${componentName}`);
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
    if (createM7Instance) markUserTiming("--component-layout-effect-unmount-stop");
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
      if (createM7Instance) markUserTiming(`--component-passive-effect-mount-start-${componentName}`);
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
    if (createM7Instance) markUserTiming("--component-passive-effect-mount-stop");
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
      if (createM7Instance) markUserTiming(`--component-passive-effect-unmount-start-${componentName}`);
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
    if (createM7Instance) markUserTiming("--component-passive-effect-unmount-stop");
  }

  /**
   * Marks a component error event.
   * @param {Object} fiber
   * @param {Error|string|null} error
   * @param {any} phase
   */
  function markComponentErrored(fiber, error, phase) {
    if (isProfiling || createM7Instance) {
      const componentName = getDisplayNameForFiber(fiber) || "Unknown";
      const lifecyclePhase = fiber.alternate === null ? "mount" : "update";
      let errorMessage = "";
      if (error !== null && getTypeOfValue(error) === "object" && typeof error.message === "string") {
        errorMessage = error.message;
      } else if (typeof error === "string") {
        errorMessage = error;
      }
      if (isProfiling && timelineData) {
        timelineData.thrownErrors.push({
          componentName,
          message: errorMessage,
          phase: lifecyclePhase,
          timestamp: getRelativeTimestamp(),
          type: "thrown-error"
        });
      }
      if (createM7Instance) markUserTiming(`--error-${componentName}-${lifecyclePhase}-${errorMessage}`);
    }
  }

  // WeakMap for tracking promises (for suspense events)
  const PromiseMap = typeof WeakMap === "function" ? WeakMap : Map;
  const promiseToIDMap = new PromiseMap();
  let nextPromiseID = 0;

  /**
   * Returns a unique updateSnapshotAndNotify for a given promise, assigning one if necessary.
   * @param {Promise} promise
   * @returns {number}
   */
  function getPromiseID(promise) {
    if (!promiseToIDMap.has(promise)) promiseToIDMap.set(promise, nextPromiseID++);
    return promiseToIDMap.get(promise);
  }

  /**
   * Marks a component as suspended (for suspense events).
   * @param {Object} fiber
   * @param {Promise} thenable
   * @param {string} label
   */
  function markComponentSuspended(fiber, thenable, label) {
    if (isProfiling || createM7Instance) {
      const suspendType = promiseToIDMap.has(thenable) ? "resuspend" : "suspend";
      const promiseID = getPromiseID(thenable);
      const componentName = getDisplayNameForFiber(fiber) || "Unknown";
      const phase = fiber.alternate === null ? "mount" : "update";
      const promiseName = thenable.displayName || "";
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
      if (createM7Instance) markUserTiming(`--suspense-${suspendType}-${promiseID}-${componentName}-${phase}-${label}-${promiseName}`);
      thenable.then(
        () => {
          if (suspenseEvent) {
            suspenseEvent.duration = getRelativeTimestamp() - suspenseEvent.timestamp;
            suspenseEvent.resolution = "resolved";
          }
          if (createM7Instance) markUserTiming(`--suspense-resolved-${promiseID}-${componentName}`);
        },
        () => {
          if (suspenseEvent) {
            suspenseEvent.duration = getRelativeTimestamp() - suspenseEvent.timestamp;
            suspenseEvent.resolution = "rejected";
          }
          if (createM7Instance) markUserTiming(`--suspense-rejected-${promiseID}-${componentName}`);
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
    if (createM7Instance) markUserTiming(`--layout-effects-start-${lanesBitmask}`);
  }

  /**
   * Marks the end of layout effects phase.
   */
  function markLayoutEffectsStopped() {
    if (isProfiling) popReactMeasure("layout-effects");
    if (createM7Instance) markUserTiming("--layout-effects-stop");
  }

  /**
   * Marks the start of passive effects phase.
   * @param {number} lanesBitmask
   */
  function markPassiveEffectsStarted(lanesBitmask) {
    if (isProfiling) pushReactMeasure("passive-effects", lanesBitmask);
    if (createM7Instance) markUserTiming(`--passive-effects-start-${lanesBitmask}`);
  }

  /**
   * Marks the end of passive effects phase.
   */
  function markPassiveEffectsStopped() {
    if (isProfiling) popReactMeasure("passive-effects");
    if (createM7Instance) markUserTiming("--passive-effects-stop");
  }

  /**
   * Marks the start of a render phase.
   * @param {number} lanesBitmask
   */
  function markRenderStarted(lanesBitmask) {
    if (isProfiling) {
      if (isBatchUIDIncremented) {
        isBatchUIDIncremented = false;
        currentBatchUID++;
      }
      if (currentReactMeasuresStack.length === 0 || currentReactMeasuresStack[currentReactMeasuresStack.length - 1].type !== "render-idle") {
        pushReactMeasure("render-idle", lanesBitmask);
      }
      pushReactMeasure("render", lanesBitmask);
    }
    if (createM7Instance) markUserTiming(`--render-start-${lanesBitmask}`);
  }

  /**
   * Marks the yield of a render phase.
   */
  function markRenderYielded() {
    if (isProfiling) popReactMeasure("render");
    if (createM7Instance) markUserTiming("--render-yield");
  }

  /**
   * Marks the end of a render phase.
   */
  function markRenderStopped() {
    if (isProfiling) popReactMeasure("render");
    if (createM7Instance) markUserTiming("--render-stop");
  }

  /**
   * Marks a render as scheduled.
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
    if (createM7Instance) markUserTiming(`--schedule-render-${lanesBitmask}`);
  }

  /**
   * Marks a force update as scheduled.
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
      if (createM7Instance) markUserTiming(`--schedule-forced-update-${lanesBitmask}-${componentName}`);
    }
  }

  /**
   * Returns the stack of fibers from the given fiber up to the root.
   * @param {Object} fiber
   * @returns {Array<Object>}
   */
  function getFiberStack(fiber) {
    const stack = [];
    let current = fiber;
    while (current !== null) {
      stack.push(current);
      current = current.return;
    }
    return stack;
  }

  /**
   * Marks a state update as scheduled.
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
      if (createM7Instance) markUserTiming(`--schedule-state-update-${lanesBitmask}-${componentName}`);
    }
  }

  /**
   * Marks profiling metadata for user timing.
   */
  function markProfilingMetadata() {
    markUserTiming(`--react-version-${reactVersion}`);
    markUserTiming(`--profiler-version-${processAndFilterProperties}`);
    const internalModuleRanges = getInternalModuleRanges();
    if (internalModuleRanges) {
      for (let i = 0; i < internalModuleRanges.length; i++) {
        const range = internalModuleRanges[i];
        if (iI(range) && range.length === 2) {
          const [start, stop] = commitPendingDeletionsAndEffects(internalModuleRanges[i], 2);
          markUserTiming(`--react-internal-module-start-${start}`);
          markUserTiming(`--react-internal-module-stop-${stop}`);
        }
      }
    }
    if (laneLabelMap != null) {
      const labels = Array.from(laneLabelMap.values()).join(",");
      markUserTiming(`--react-lane-labels-${labels}`);
    }
  }

  /**
   * Toggles the profiling status and resets or finalizes state as needed.
   * @param {boolean} enableProfiling
   */
  function toggleProfilingStatus(enableProfiling) {
    if (isProfiling !== enableProfiling) {
      isProfiling = enableProfiling;
      if (isProfiling) {
        // Initialize timeline data
        const internalModuleSourceToRanges = new Map();
        if (createM7Instance) {
          const internalModuleRanges = getInternalModuleRanges();
          if (internalModuleRanges) {
            for (let i = 0; i < internalModuleRanges.length; i++) {
              const range = internalModuleRanges[i];
              if (iI(range) && range.length === 2) {
                const [start, stop] = commitPendingDeletionsAndEffects(internalModuleRanges[i], 2);
                markUserTiming(`--react-internal-module-start-${start}`);
                markUserTiming(`--react-internal-module-stop-${stop}`);
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
        // Finalize state and attach component stacks to scheduling events
        if (timelineData !== null) {
          timelineData.schedulingEvents.forEach(schedulingEvent => {
            if (schedulingEvent.type === "schedule-state-update") {
              const fiberStack = fiberToComponentStackMap.get(schedulingEvent);
              if (fiberStack && currentDispatcherRef != null) {
                schedulingEvent.componentStack = fiberStack.reduce((stackString, fiberNode) => {
                  return stackString + findNextWorkUnit(workTagMap, fiberNode, currentDispatcherRef);
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

module.exports = createReactDevToolsGlobalHook;