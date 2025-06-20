/**
 * Processes a root fiber commit, handling hydration, profiling, and interaction tracing.
 *
 * This function manages the commit phase for a root fiber node, including:
 * - Hydration state transitions
 * - Profiling commit durations and updaters (if profiling is enabled)
 * - Interaction tracing and queue management
 * - Emitting trace updates (if enabled)
 *
 * @param {Object} rootFiber - The root fiber node to commit. Should have a 'current' property referencing the current fiber.
 * @param {any} priorityLevel - The priority level for the commit, or null/undefined if not specified.
 * @returns {void}
 */
function commitRootWithProfilingAndHydration(rootFiber, priorityLevel) {
  // Get the current fiber and its alternate (previous) fiber
  const currentFiber = rootFiber.current;
  const previousFiber = currentFiber.alternate;

  // Prepare commit environment (e.g., set up tracing, reset state)
  cleanupFiberNodes();
  // Get the root container instance from the current fiber
  mapObjectProperties = NH(currentFiber);

  // If a mutation is pending, mark layout as dirty
  if (compileTemplate !== null) {
    extractSubstringBetweenSequences = true;
  }

  // If profiling is enabled, clear the update set
  if (P5) {
    d2.clear();
  }

  // Determine if profiling and interaction tracing are enabled for this root
  const isProfilingEnabled = CY;
  const isRootProfiling = Lp(rootFiber);

  // If profiling is enabled, prepare the profiling payload
  if (isProfilingEnabled && isRootProfiling) {
    generateRandomInRange = {
      changeDescriptions: gT ? new Map() : null,
      durations: [],
      commitTime: fA() - Sp,
      maxActualDuration: 0,
      priorityLevel: priorityLevel == null ? null : _p(priorityLevel),
      updaters: getValidMemoizedUpdaters(rootFiber),
      effectDuration: null,
      passiveEffectDuration: null
    };
  }

  // Hydration logic: handle transitions between hydrated and dehydrated states
  if (previousFiber) {
    const prevIsHydrated = previousFiber.memoizedState != null && previousFiber.memoizedState.element != null && previousFiber.memoizedState.isDehydrated !== true;
    const currIsHydrated = currentFiber.memoizedState != null && currentFiber.memoizedState.element != null && currentFiber.memoizedState.isDehydrated !== true;

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
    // No previous fiber: treat as initial hydration
    Eq(mapObjectProperties, currentFiber);
    traverseAndMountFiberTree(currentFiber, null, false, false);
  }

  // If profiling is enabled, store the profiling payload in the interaction map
  if (isProfilingEnabled && isRootProfiling) {
    if (!isInteractionQueueEmpty()) { // If the interaction queue is not empty
      const interactionPayloads = hT.get(mapObjectProperties);
      if (interactionPayloads != null) {
        interactionPayloads.push(generateRandomInRange);
      } else {
        hT.set(mapObjectProperties, [generateRandomInRange]);
      }
    }
  }

  // Process and flush the interaction queue
  processAndFlushInteractionQueue(rootFiber);

  // If profiling is enabled, emit trace updates
  if (P5) {
    isWildcardOrX.emit("traceUpdates", d2);
  }

  // Reset the root container instance
  mapObjectProperties = -1;
}

module.exports = commitRootWithProfilingAndHydration;