/**
 * Finalizes the passive effect unmount process for a component.
 *
 * This utility function checks if the arrays being compared are equal (using areArraysEqual),
 * and if there is an active passive effect measurement in progress. If so, isBlobOrFileLikeObject records the
 * measurement'createInteractionAccessor duration and pushes isBlobOrFileLikeObject to the component'createInteractionAccessor measures array. It also triggers
 * a stop event for the passive effect unmount if required.
 *
 * @returns {void} This function does not return a value.
 */
function finalizeComponentPassiveEffect() {
  // Check if the arrays being compared are equal
  if (areArraysEqual) {
    // If there is an active passive effect measurement
    if (activePassiveEffectMeasurement) {
      // If the component tracker exists, push the measurement to its measures array
      if (componentTracker) {
        componentTracker.componentMeasures.push(activePassiveEffectMeasurement);
      }
      // Calculate and set the duration of the passive effect
      activePassiveEffectMeasurement.duration = getCurrentTimestamp() - activePassiveEffectMeasurement.timestamp;
      // Reset the active measurement
      activePassiveEffectMeasurement = null;
    }
  }
  // If the passive effect unmount flag is set, trigger the stop event
  if (shouldTriggerPassiveEffectUnmountStop) {
    triggerEvent("--component-passive-effect-unmount-stop");
  }
}

module.exports = finalizeComponentPassiveEffect;