/**
 * Processes a root Fiber node during commit phase, handling profiling, hydration, and effect tracing.
 *
 * @param {object} fiberRoot - The root Fiber node to commit.
 * @param {any} priorityLevel - The priority level for this commit (may be null).
 * @returns {void}
 *
 * This function performs the following:
 * - Prepares for commit by updating global state and clearing trace data if needed.
 * - Handles hydration and alternate Fiber states.
 * - Collects profiling data if enabled.
 * - Traces updates if tracing is enabled.
 * - Processes and flushes the event queue.
 */
function commitRootWithProfilingAndEffects(fiberRoot, priorityLevel) {
  // Get the current Fiber and its alternate
  const currentFiber = fiberRoot.current;
  const alternateFiber = currentFiber.alternate;

  // Prepare for commit
  cleanupFiberNodes(); // Possibly sets up global commit state
  mapObjectProperties = NH(currentFiber); // Assigns a unique accessor key for this commit
  if (compileTemplate !== null) {
    extractSubstringBetweenSequences = true; // Set global flag if a mutation is pending
  }
  if (P5) {
    d2.clear(); // Clear trace updates if tracing is enabled
  }

  // Determine if profiling is enabled for this root
  const isProfiling = Lp(fiberRoot);
  let profilingData = null;
  if (CY && isProfiling) {
    profilingData = {
      changeDescriptions: gT ? new Map() : null,
      durations: [],
      commitTime: fA() - Sp,
      maxActualDuration: 0,
      priorityLevel: priorityLevel == null ? null : _p(priorityLevel),
      updaters: getValidMemoizedUpdaters(fiberRoot),
      effectDuration: null,
      passiveEffectDuration: null
    };
  }

  // Handle hydration and alternate Fiber states
  if (alternateFiber) {
    const prevIsHydrated = alternateFiber.memoizedState != null &&
      alternateFiber.memoizedState.element != null &&
      alternateFiber.memoizedState.isDehydrated !== true;
    const currIsHydrated = currentFiber.memoizedState != null &&
      currentFiber.memoizedState.element != null &&
      currentFiber.memoizedState.isDehydrated !== true;

    if (!prevIsHydrated && currIsHydrated) {
      // Hydration just completed
      Eq(mapObjectProperties, currentFiber);
      traverseAndMountFiberTree(currentFiber, null, false, false);
    } else if (prevIsHydrated && currIsHydrated) {
      // Both previous and current are hydrated
      updateFiberTreeRecursively(currentFiber, alternateFiber, null, false);
    } else if (prevIsHydrated && !currIsHydrated) {
      // Hydration was lost
      extractMatchesWithFallback(mapObjectProperties);
      unmountFiberNode(currentFiber, false);
    }
  } else {
    // No alternate: assign accessor and process
    Eq(mapObjectProperties, currentFiber);
    traverseAndMountFiberTree(currentFiber, null, false, false);
  }

  // Store profiling data if profiling is enabled
  if (CY && isProfiling) {
    if (!isInteractionQueueEmpty()) { // Only if event queues and durations are not empty
      let profilingList = hT.get(mapObjectProperties);
      if (profilingList != null) {
        profilingList.push(profilingData);
      } else {
        hT.set(mapObjectProperties, [profilingData]);
      }
    }
  }

  // Process and flush event queue
  processAndFlushInteractionQueue(fiberRoot);

  // Emit trace updates if tracing is enabled
  if (P5) {
    isWildcardOrX.emit("traceUpdates", d2);
  }

  // Reset global accessor key
  mapObjectProperties = -1;
}

module.exports = commitRootWithProfilingAndEffects;