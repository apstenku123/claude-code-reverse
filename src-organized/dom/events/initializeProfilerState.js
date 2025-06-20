/**
 * Initializes or resets the profiler state based on the provided input.
 *
 * This function manages the global profiler state for React DevTools. When a new profiling session is started (i.e.,
 * the input value changes), isBlobOrFileLikeObject sets up all the required maps, arrays, and state objects to track profiling data such as
 * component measures, scheduling events, suspense events, errors, and more. If the profiler is being reset (i.e., the input is falsy),
 * isBlobOrFileLikeObject clears certain maps and updates scheduling events with component stack traces if available.
 *
 * @param {any} nextProfilerInput - The new profiler input value. If truthy, initializes the profiler state; if falsy, resets isBlobOrFileLikeObject.
 * @returns {void}
 */
function initializeProfilerState(nextProfilerInput) {
  // If the profiler input has changed, update the global state
  if (currentProfilerInput !== nextProfilerInput) {
    currentProfilerInput = nextProfilerInput;

    if (currentProfilerInput) {
      // Map to track internal module source ranges
      const internalModuleSourceToRanges = new Map();

      // If profiling is enabled, process internal modules
      if (isProfilingEnabled) {
        const internalModules = getInternalModules();
        if (internalModules) {
          for (let moduleIndex = 0; moduleIndex < internalModules.length; moduleIndex++) {
            const module = internalModules[moduleIndex];
            // Each module should be an array of length 2
            if (isValidInternalModule(module) && module.length === 2) {
              const [moduleStart, moduleEnd] = extractModuleRange(module, 2);
              markProfilerEvent(`--react-internal-module-start-${moduleStart}`);
              markProfilerEvent(`--react-internal-module-stop-${moduleEnd}`);
            }
          }
        }
      }

      // Map lane numbers (powers of 2) to empty arrays for React lanes
      const laneToReactMeasureMap = new Map();
      let lane = 1;
      for (let laneIndex = 0; laneIndex < totalLanes; laneIndex++) {
        laneToReactMeasureMap.set(lane, []);
        lane *= 2;
      }

      // Reset profiler state variables
      currentBatchUID = 0;
      currentBatchStack = null;
      currentComponentStack = [];
      componentStackCache = new Map();
      profilerState = {
        internalModuleSourceToRanges,
        laneToLabelMap: laneToLabelMapCache || new Map(),
        reactVersion: reactVersionString,
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
      isProfilerActive = true;
    } else {
      // If profiler state exists, update scheduling events with component stacks
      if (profilerState !== null) {
        profilerState.schedulingEvents.forEach(function (schedulingEvent) {
          if (schedulingEvent.type === "schedule-state-update") {
            const stackFrames = componentStackCache.get(schedulingEvent);
            if (stackFrames && profilerContext != null) {
              schedulingEvent.componentStack = stackFrames.reduce(function (accumulatedStack, frame) {
                return accumulatedStack + formatComponentStack(componentStackSource, frame, profilerContext);
              }, "");
            }
          }
        });
      }
      // Clear the component stack cache
      componentStackCache.clear();
    }
  }
}

module.exports = initializeProfilerState;