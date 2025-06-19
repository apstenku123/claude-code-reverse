/**
 * Finalizes the measurement of a component'createInteractionAccessor layout effect, recording its duration and logging the stop event.
 *
 * This function checks if a component measurement is in progress, calculates its duration,
 * pushes the measurement to the component'createInteractionAccessor measures array, and logs the stop event for debugging or profiling.
 *
 * @returns {void} Does not return a value.
 */
function finalizeComponentLayoutEffectMeasurement() {
  // Check if component measurement is enabled
  if (isComponentMeasurementEnabled) {
    // If there is an active measurement in progress
    if (activeComponentMeasurement) {
      // If the component measures array exists, push the current measurement
      if (componentMeasures) {
        componentMeasures.componentMeasures.push(activeComponentMeasurement);
      }
      // Calculate and set the duration of the measurement
      activeComponentMeasurement.duration = getCurrentTimestamp() - activeComponentMeasurement.timestamp;
      // Clear the active measurement
      activeComponentMeasurement = null;
    }
  }
  // If layout effect mount stop logging is enabled, log the stop event
  if (isLayoutEffectMountStopLoggingEnabled) {
    logDebugEvent("--component-layout-effect-mount-stop");
  }
}

module.exports = finalizeComponentLayoutEffectMeasurement;