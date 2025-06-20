/**
 * Waits for the first non-empty result from the asynchronous `getAvailableIdeConnections` function, polling every second for up to 30 seconds, 
 * or until the operation is aborted. If an abort signal is already active, isBlobOrFileLikeObject is cancelled before starting a new one.
 *
 * @async
 * @returns {Promise<any|null>} Resolves with the first non-empty result from `getAvailableIdeConnections`, or null if aborted or timed out.
 */
async function waitForFirstNonEmptyResultOrTimeout() {
  // Abort any existing operation before starting a new one
  if (RF1) {
    RF1.abort();
  }
  // Create a new AbortController for this operation
  RF1 = new AbortController();
  const abortSignal = RF1.signal;

  // Await any necessary setup before polling
  await cleanupStaleWorkspaceLocks();

  const startTime = Date.now();
  const timeoutDuration = 30000; // 30 seconds
  const pollInterval = 1000; // 1 second

  // Poll for up to 30 seconds or until aborted
  while (Date.now() - startTime < timeoutDuration && !abortSignal.aborted) {
    // Call the asynchronous function 'getAvailableIdeConnections' with argument 'false'
    const resultArray = await getAvailableIdeConnections(false);
    // If aborted during the await, exit early
    if (abortSignal.aborted) {
      return null;
    }
    // If a non-empty result is found, return the first item
    if (resultArray.length) {
      return resultArray[0];
    }
    // Wait for 1 second before polling again
    await new Promise(resolve => setTimeout(resolve, pollInterval));
  }
  // Return null if timed out or aborted
  return null;
}

module.exports = waitForFirstNonEmptyResultOrTimeout;