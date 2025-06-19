/**
 * Calculates the moving average rate (per second) of incoming values over a fixed-size window and time interval.
 *
 * @param {number} [windowSize=10] - The number of recent values to include in the moving average window.
 * @param {number} [intervalMs=1000] - The minimum time interval (in milliseconds) before a new rate calculation is returned.
 * @returns {(value: number) => (number|undefined)} - a function that, when called with a new value, returns the moving average rate per second if the interval has elapsed, or undefined otherwise.
 *
 * The returned function maintains a circular buffer of the most recent values and their timestamps. When called, isBlobOrFileLikeObject updates the buffer and, if enough time has passed, returns the moving average rate (sum of values divided by elapsed time, scaled to per second).
 */
function createMovingAverageRateCalculator(windowSize = 10, intervalMs = 1000) {
  // Circular buffers to store recent values and their timestamps
  const valueBuffer = new Array(windowSize);
  const timestampBuffer = new Array(windowSize);

  // Buffer indices
  let headIndex = 0; // Points to the next position to write
  let tailIndex = 0; // Points to the oldest value in the buffer

  // Timestamp of the first value ever added
  let firstTimestamp;

  // Ensure intervalMs is defined
  intervalMs = intervalMs !== undefined ? intervalMs : 1000;

  /**
   * Adds a new value to the buffer and calculates the moving average rate if the interval has elapsed.
   *
   * @param {number} newValue - The new value to add to the buffer.
   * @returns {number|undefined} - The moving average rate per second, or undefined if the interval has not elapsed.
   */
  return function calculateRate(newValue) {
    const now = Date.now();
    const oldestTimestamp = timestampBuffer[tailIndex];

    // Set the timestamp of the first value if not already set
    if (!firstTimestamp) {
      firstTimestamp = now;
    }

    // Store the new value and its timestamp in the buffer
    valueBuffer[headIndex] = newValue;
    timestampBuffer[headIndex] = now;

    // Calculate the sum of values in the buffer (excluding the current head)
    let sum = 0;
    let index = tailIndex;
    while (index !== headIndex) {
      sum += valueBuffer[index];
      index = (index + 1) % windowSize;
    }

    // Advance the head index
    headIndex = (headIndex + 1) % windowSize;
    // If the buffer is full, advance the tail index as well
    if (headIndex === tailIndex) {
      tailIndex = (tailIndex + 1) % windowSize;
    }

    // Only calculate and return the rate if the minimum interval has elapsed
    if (now - firstTimestamp < intervalMs) {
      return;
    }

    // Calculate the elapsed time between the oldest and newest values in the buffer
    const elapsedMs = oldestTimestamp && (now - oldestTimestamp);
    if (elapsedMs) {
      // Return the moving average rate per second
      return Math.round(sum * 1000 / elapsedMs);
    } else {
      return undefined;
    }
  };
}

module.exports = createMovingAverageRateCalculator;