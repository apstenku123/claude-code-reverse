/**
 * Waits asynchronously for a calculated delay based on the square of the input multiplier.
 * The delay is capped at a maximum value.
 *
 * @async
 * @function waitForCalculatedDelay
 * @param {number} multiplier - The multiplier used to calculate the delay (delay = Pw9 * multiplier^2, capped at Sw9).
 * @returns {Promise<void>} Resolves after the calculated delay.
 */
function waitForCalculatedDelay(multiplier) {
  // 'hx' is assumed to be an async helper (e.g., a generator runner or coroutine handler)
  // Pw9: base delay multiplier (ms), Sw9: maximum allowed delay (ms)
  return hx(this, void 0, void 0, function* () {
    // Calculate the delay: base * (multiplier^2), but do not exceed the maximum
    const calculatedDelay = Math.min(Pw9 * (multiplier * multiplier), Sw9);
    // Wait for the calculated delay
    yield new Promise(resolve => setTimeout(resolve, calculatedDelay));
  });
}

module.exports = waitForCalculatedDelay;