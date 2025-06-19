/**
 * Waits for the first available interaction entry within a 30-second window, polling every second.
 * Aborts if the AbortController is triggered during the wait.
 *
 * @async
 * @returns {Promise<any|null>} Resolves with the first interaction entry if available, otherwise null.
 */
async function waitForFirstInteractionEntry() {
  // Abort any previous ongoing operation
  if (RF1) RF1.abort();

  // Create a new AbortController for this operation
  RF1 = new AbortController();
  const abortSignal = RF1.signal;

  // Perform any necessary setup before polling (e.g., initializing listeners)
  await cleanupStaleWorkspaceLocks();

  const startTime = Date.now();
  const timeout = 30000; // 30 seconds
  const pollInterval = 1000; // 1 second

  // Poll for interaction entries until one is found, aborted, or timeout is reached
  while (Date.now() - startTime < timeout && !abortSignal.aborted) {
    const interactionEntries = await getAvailableIdeConnections(false);

    // If operation was aborted during polling, exit early
    if (abortSignal.aborted) return null;

    // If any interaction entries are found, return the first one
    if (interactionEntries.length) return interactionEntries[0];

    // Wait for the next poll interval
    await new Promise(resolve => setTimeout(resolve, pollInterval));
  }

  // Return null if no interaction entry was found within the timeout
  return null;
}

module.exports = waitForFirstInteractionEntry;