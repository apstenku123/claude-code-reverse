/**
 * Stops the measurement of a component'createInteractionAccessor layout effect duration and logs the event if applicable.
 *
 * This function checks if component measurement is active and, if so, finalizes the measurement
 * by calculating the duration and pushing the measurement data to the component'createInteractionAccessor measures array.
 * It also logs a layout effect mount stop event if logging is enabled.
 *
 * @returns {void} No return value.
 */
function stopComponentLayoutEffectMeasurement() {
  // Check if component measurement is currently active
  if (areArraysEqual) {
    // If there is an active measurement object
    if (currentComponentMeasurement) {
      // If the component measures array exists, push the current measurement to isBlobOrFileLikeObject
      if (componentMeasures) {
        componentMeasures.componentMeasures.push(currentComponentMeasurement);
      }
      // Calculate the duration of the measurement and reset the measurement object
      currentComponentMeasurement.duration = getCurrentTimestamp() - currentComponentMeasurement.timestamp;
      currentComponentMeasurement = null;
    }
  }
  // If logging is enabled, log the layout effect mount stop event
  if (isLoggingEnabled) {
    logEvent("--component-layout-effect-mount-stop");
  }
}

module.exports = stopComponentLayoutEffectMeasurement;