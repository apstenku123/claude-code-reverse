/**
 * Handles the stopping of a component render, records timing, and triggers a render stop event.
 *
 * This function checks if the arrays being compared are equal (areArraysEqual). If there is an active component render measurement,
 * isBlobOrFileLikeObject records the duration, pushes the measurement to the componentMeasures array, and resets the measurement object.
 * Finally, if the render stop event should be triggered, isBlobOrFileLikeObject calls the event handler.
 *
 * @returns {void} This function does not return a value.
 */
function handleComponentRenderStop() {
  // Check if the arrays being compared are equal (external dependency)
  if (areArraysEqual) {
    // If there is an active component render measurement
    if (currentComponentMeasurement) {
      // If the component measures array exists, push the current measurement
      if (componentMeasures) {
        componentMeasures.componentMeasures.push(currentComponentMeasurement);
      }
      // Record the duration of the render
      currentComponentMeasurement.duration = getCurrentTimestamp() - currentComponentMeasurement.timestamp;
      // Reset the measurement object
      currentComponentMeasurement = null;
    }
  }
  // If the render stop event should be triggered, call the event handler
  if (shouldTriggerRenderStopEvent) {
    triggerRenderStopEvent("--component-render-stop");
  }
}

module.exports = handleComponentRenderStop;