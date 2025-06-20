/**
 * Calculates the rolling average rate of incoming values over a specified window.
 *
 * Returns a function that, when called with a value, tracks the value and timestamp,
 * and returns the average rate (per second) over the rolling window if enough time has passed.
 *
 * @param {number} [windowSize=10] - The number of recent entries to keep in the rolling window.
 * @param {number} [minIntervalMs=1000] - The minimum interval (in milliseconds) before calculating the rate.
 * @returns {(value: number) => number|undefined} - Function to record a value and get the rolling average rate.
 */
function createRollingAverageRateCalculator(windowSize = 10, minIntervalMs = 1000) {
  // Circular buffer to store recent values
  const valueBuffer = new Array(windowSize);
  // Circular buffer to store timestamps for each value
  const timestampBuffer = new Array(windowSize);
  // Index for the next value to write
  let writeIndex = 0;
  // Index for the oldest value in the buffer
  let readIndex = 0;
  // Timestamp of the first value in the current window
  let windowStartTimestamp;

  /**
   * Records a new value and returns the rolling average rate if enough time has passed.
   *
   * @param {number} value - The value to record (e.g., count, bytes, etc.).
   * @returns {number|undefined} - The rolling average rate per second, or undefined if not enough data/time.
   */
  return function recordValueAndGetRate(value) {
    const now = Date.now();
    const oldestTimestamp = timestampBuffer[readIndex];

    // Initialize the window start timestamp if this is the first call
    if (!windowStartTimestamp) {
      windowStartTimestamp = now;
    }

    // Store the value and timestamp at the current write index
    valueBuffer[writeIndex] = value;
    timestampBuffer[writeIndex] = now;

    // Calculate the sum of values in the buffer (excluding the current write position)
    let sum = 0;
    let idx = readIndex;
    while (idx !== writeIndex) {
      sum += valueBuffer[idx];
      idx = (idx + 1) % windowSize;
    }

    // Advance the write index
    writeIndex = (writeIndex + 1) % windowSize;
    // If the buffer is full, advance the read index to overwrite the oldest value
    if (writeIndex === readIndex) {
      readIndex = (readIndex + 1) % windowSize;
    }

    // Only calculate the rate if the minimum interval has passed since the window started
    if (now - windowStartTimestamp < minIntervalMs) {
      return;
    }

    // Calculate the elapsed time between the oldest and newest entry
    const elapsedMs = oldestTimestamp && (now - oldestTimestamp);
    // If handleMissingDoctypeError have a valid elapsed time, calculate and return the rate (per second)
    return elapsedMs ? Math.round((sum * 1000) / elapsedMs) : undefined;
  };
}

module.exports = createRollingAverageRateCalculator;