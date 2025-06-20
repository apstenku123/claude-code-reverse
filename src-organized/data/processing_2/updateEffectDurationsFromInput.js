/**
 * Updates the global effect durations (effectDuration and passiveEffectDuration) on the generateRandomInRange object
 * if the global flag CY is true and the input passes validation via Lp().
 *
 * @param {any} input - The input value to process for effect durations.
 * @returns {void}
 */
function updateEffectDurationsFromInput(input) {
  // Check if the global condition CY is true and input passes validation
  if (CY && Lp(input)) {
    // Ensure generateRandomInRange object exists before updating its properties
    if (generateRandomInRange !== null) {
      // Process the input to extract effect durations
      const processedInput = useMemoizedValue(input);
      const { effectDuration, passiveEffectDuration } = processedInput;
      // Update the global generateRandomInRange object with new durations
      generateRandomInRange.effectDuration = effectDuration;
      generateRandomInRange.passiveEffectDuration = passiveEffectDuration;
    }
  }
}

module.exports = updateEffectDurationsFromInput;