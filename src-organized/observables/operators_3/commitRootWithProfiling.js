/**
 * Processes and commits the root fiber tree, handling profiling, hydration, and update tracing.
 *
 * This function is responsible for finalizing the commit phase of a React-like fiber tree. It manages profiling data,
 * handles hydration state transitions, and emits update traces if enabled. It also updates global state and caches
 * commit profiling information for later inspection.
 *
 * @param {object} rootFiber - The root fiber node to commit. Should have a `current` property pointing to the current fiber.
 * @param {number|null} priorityLevel - The priority level of the commit, or null if not applicable.
 * @returns {void}
 */
function commitRootWithProfiling(rootFiber, priorityLevel) {
  // Get the current and alternate (previous) fiber nodes
  const currentFiber = rootFiber.current;
  const previousFiber = currentFiber.alternate;

  // Prepare for commit phase (e.g., reset timers, global state)
  cleanupFiberNodes();
  // Get the root container instance for the current fiber
  mapObjectProperties = NH(currentFiber);

  // If a mutation is in progress, mark that a layout has occurred
  if (compileTemplate !== null) {
    extractSubstringBetweenSequences = true;
  }

  // If update tracing is enabled, clear the set of updated fibers
  if (P5) {
    d2.clear();
  }

  // Determine if this is a profiling commit
  const isProfilingCommit = Lp(rootFiber);

  // If profiling and profiling commit, prepare profiling summary object
  if (CY && isProfilingCommit) {
    generateRandomInRange = {
      changeDescriptions: gT ? new Map() : null,
      durations: [],
      commitTime: fA() - Sp, // Time since profiling started
      maxActualDuration: 0,
      priorityLevel: priorityLevel == null ? null : _p(priorityLevel),
      updaters: getValidMemoizedUpdaters(rootFiber),
      effectDuration: null,
      passiveEffectDuration: null
    };
  }

  // Handle hydration and state transitions between previous and current fibers
  if (previousFiber) {
    const prevIsHydrated = previousFiber.memoizedState != null &&
      previousFiber.memoizedState.element != null &&
      previousFiber.memoizedState.isDehydrated !== true;
    const currIsHydrated = currentFiber.memoizedState != null &&
      currentFiber.memoizedState.element != null &&
      currentFiber.memoizedState.isDehydrated !== true;

    if (!prevIsHydrated && currIsHydrated) {
      // Transitioned from dehydrated to hydrated
      Eq(mapObjectProperties, currentFiber);
      traverseAndMountFiberTree(currentFiber, null, false, false);
    } else if (prevIsHydrated && currIsHydrated) {
      // Both previous and current are hydrated
      updateFiberTreeRecursively(currentFiber, previousFiber, null, false);
    } else if (prevIsHydrated && !currIsHydrated) {
      // Transitioned from hydrated to dehydrated
      extractMatchesWithFallback(mapObjectProperties);
      unmountFiberNode(currentFiber, false);
    }
  } else {
    // No previous fiber, treat as initial mount
    Eq(mapObjectProperties, currentFiber);
    traverseAndMountFiberTree(currentFiber, null, false, false);
  }

  // If profiling, cache the profiling summary for this root
  if (CY && isProfilingCommit) {
    if (!isInteractionQueueEmpty()) {
      const profilingCache = hT.get(mapObjectProperties);
      if (profilingCache != null) {
        profilingCache.push(generateRandomInRange);
      } else {
        hT.set(mapObjectProperties, [generateRandomInRange]);
      }
    }
  }

  // Flush and process accessor state
  processAndFlushInteractionQueue(rootFiber);

  // If update tracing is enabled, emit the set of updated fibers
  if (P5) {
    isWildcardOrX.emit("traceUpdates", d2);
  }

  // Reset global root container reference
  mapObjectProperties = -1;
}

module.exports = commitRootWithProfiling;