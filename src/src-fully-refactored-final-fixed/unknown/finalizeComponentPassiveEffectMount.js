/**
 * Finalizes the passive effect mount phase for a component, recording performance measures if applicable.
 *
 * This function checks if a component passive effect is currently being measured. If so, isBlobOrFileLikeObject records the duration,
 * pushes the measure to the component'createInteractionAccessor measures array, and resets the measurement state. It also emits a debug
 * event if passive effect instrumentation is enabled.
 *
 * @returns {void} This function does not return a value.
 */
function finalizeComponentPassiveEffectMount() {
  // Check if passive effect measurement is enabled
  if (isPassiveEffectMeasurementEnabled) {
    // If there is an active passive effect measurement
    if (activePassiveEffectMeasurement) {
      // If the current component has a measures array, push the measurement
      if (currentComponent) {
        currentComponent.componentMeasures.push(activePassiveEffectMeasurement);
      }
      // Record the duration of the passive effect
      activePassiveEffectMeasurement.duration = getCurrentTimestamp() - activePassiveEffectMeasurement.timestamp;
      // Reset the active measurement
      activePassiveEffectMeasurement = null;
    }
  }
  // If instrumentation for passive effect mount is enabled, emit a debug event
  if (isPassiveEffectInstrumentationEnabled) {
    emitDebugEvent("--component-passive-effect-mount-stop");
  }
}

module.exports = finalizeComponentPassiveEffectMount;