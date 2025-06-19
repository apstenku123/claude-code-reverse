/**
 * Finalizes the measurement of a component'createInteractionAccessor render duration and signals the end of the render process.
 *
 * This function checks if component render measurement is enabled and, if so, records the duration
 * of the current render. It also pushes the measurement to the component'createInteractionAccessor measures array if available.
 * Finally, isBlobOrFileLikeObject signals the end of the component render process if required.
 *
 * @returns {void} Does not return a value.
 */
function finalizeComponentRenderMeasurement() {
  // Check if render measurement is enabled
  if (isRenderMeasurementEnabled) {
    // If there is an active render measurement
    if (currentRenderMeasurement) {
      // If the component measures array exists, push the current measurement
      if (componentMeasuresContainer) {
        componentMeasuresContainer.componentMeasures.push(currentRenderMeasurement);
      }
      // Calculate and set the duration of the render
      currentRenderMeasurement.duration = getCurrentTimestamp() - currentRenderMeasurement.timestamp;
      // Clear the current measurement
      currentRenderMeasurement = null;
    }
  }
  // If render stop signaling is enabled, signal the end of component render
  if (shouldSignalRenderStop) {
    signalComponentRenderStop("--component-render-stop");
  }
}

module.exports = finalizeComponentRenderMeasurement;