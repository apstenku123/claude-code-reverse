/**
 * Delays execution by a quadratic duration based on the input multiplier.
 * The delay duration is calculated as Math.min(maxDelay * (multiplier * multiplier), maxAllowedDelay).
 *
 * @async
 * @function delayByQuadraticDuration
 * @param {number} multiplier - The multiplier used to calculate the quadratic delay duration.
 * @returns {Promise<void>} Resolves after the computed delay duration.
 */
function delayByQuadraticDuration(multiplier) {
  // 'hx' is assumed to be an async helper (e.g., a generator runner or coroutine wrapper)
  // 'Pw9' is the base delay factor, 'Sw9' is the maximum allowed delay
  return hx(this, void 0, void 0, function* () {
    // Calculate the delay: quadratic based on multiplier, but capped at maxAllowedDelay
    const delayDuration = Math.min(Pw9 * (multiplier * multiplier), Sw9);
    // Wait for the computed delay duration
    yield new Promise(resolve => setTimeout(resolve, delayDuration));
  });
}

module.exports = delayByQuadraticDuration;