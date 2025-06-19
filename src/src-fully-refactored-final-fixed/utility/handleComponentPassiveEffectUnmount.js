/**
 * Handles the unmounting of a component'createInteractionAccessor passive effect by recording its duration and stopping related measurements.
 *
 * This function checks if a passive effect is currently being measured. If so, isBlobOrFileLikeObject records the duration of the effect,
 * pushes the measurement to the component'createInteractionAccessor measures array, and resets the current measurement. It also logs the stop
 * event for the passive effect unmount if logging is enabled.
 *
 * @returns {void} This function does not return a value.
 */
function handleComponentPassiveEffectUnmount() {
  // Check if passive effect measurement is enabled
  if (isPassiveEffectMeasurementEnabled) {
    // If there is an ongoing passive effect measurement
    if (currentPassiveEffectMeasurement) {
      // If the current component has a measures array, push the measurement
      if (currentComponent) {
        currentComponent.componentMeasures.push(currentPassiveEffectMeasurement);
      }
      // Record the duration of the passive effect
      currentPassiveEffectMeasurement.duration = getCurrentTimestamp() - currentPassiveEffectMeasurement.timestamp;
      // Reset the current measurement
      currentPassiveEffectMeasurement = null;
    }
  }
  // If logging is enabled, log the stop event for the passive effect unmount
  if (isLoggingEnabled) {
    logEvent("--component-passive-effect-unmount-stop");
  }
}

module.exports = handleComponentPassiveEffectUnmount;