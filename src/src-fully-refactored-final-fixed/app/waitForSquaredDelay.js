/**
 * Waits asynchronously for a delay calculated as the square of the input value,
 * multiplied by a delay factor, but capped at a maximum delay. Useful for implementing
 * exponential backoff with an upper limit.
 *
 * @async
 * @function waitForSquaredDelay
 * @param {number} multiplier - The value to be squared and multiplied by the delay factor.
 * @returns {Promise<void>} Resolves after the computed delay.
 */
function waitForSquaredDelay(multiplier) {
  // 'hx' is assumed to be an async helper (e.g., a generator runner or similar)
  // 'Pw9' is the delay factor, 'Sw9' is the maximum delay allowed
  return hx(this, void 0, void 0, function* () {
    // Calculate the delay: (multiplier^2) * delayFactor, capped at maxDelay
    const delay = Math.min(Pw9 * (multiplier * multiplier), Sw9);
    // Wait for the computed delay using setTimeout wrapped in a Promise
    yield new Promise(resolve => setTimeout(resolve, delay));
  });
}

module.exports = waitForSquaredDelay;