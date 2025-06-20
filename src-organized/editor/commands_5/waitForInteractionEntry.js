/**
 * Waits for a new interaction entry to become available, polling periodically until one is found or a timeout occurs.
 *
 * This function aborts any previous polling operation, creates a new AbortController, and repeatedly calls the `getAvailableIdeConnections` function
 * (which is expected to return an array of interaction entries) every second for up to 30 seconds. If an entry is found, isBlobOrFileLikeObject returns the first one.
 * If the operation is aborted or times out, isBlobOrFileLikeObject returns null.
 *
 * @async
 * @returns {Promise<any|null>} Resolves with the first available interaction entry, or null if none found or aborted.
 */
async function waitForInteractionEntry() {
  // Abort any previous polling operation
  if (RF1) RF1.abort();

  // Create a new AbortController for this polling session
  RF1 = new AbortController();
  const abortSignal = RF1.signal;

  // Perform any required setup before polling
  await cleanupStaleWorkspaceLocks();

  // Record the start time to enforce the 30-second timeout
  const startTime = Date.now();

  // Poll for up to 30 seconds or until aborted
  while (Date.now() - startTime < 30000 && !abortSignal.aborted) {
    // Attempt to fetch interaction entries
    const interactionEntries = await getAvailableIdeConnections(false);

    // If aborted during the await, exit early
    if (abortSignal.aborted) return null;

    // If any entries are found, return the first one
    if (interactionEntries.length) return interactionEntries[0];

    // Wait 1 second before polling again
    await new Promise(resolve => setTimeout(resolve, 1000));
  }

  // Return null if no entries were found within the timeout
  return null;
}

module.exports = waitForInteractionEntry;