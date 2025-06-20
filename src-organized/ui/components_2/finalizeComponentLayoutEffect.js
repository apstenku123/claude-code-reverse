/**
 * Handles the finalization of a component'createInteractionAccessor layout effect lifecycle, including
 * measuring component performance and triggering unmount stop logging if needed.
 *
 * @returns {void} This function does not return a value.
 */
function finalizeComponentLayoutEffect() {
  // Check if layout effect tracking is enabled
  if (isLayoutEffectTrackingEnabled) {
    // If there is an active component measure
    if (activeComponentMeasure) {
      // If the component measures collector exists, push the current measure
      if (componentMeasuresCollector) {
        componentMeasuresCollector.componentMeasures.push(activeComponentMeasure);
      }
      // Calculate the duration and clear the active measure
      activeComponentMeasure.duration = getCurrentTimestamp() - activeComponentMeasure.timestamp;
      activeComponentMeasure = null;
    }
  }
  // If unmount logging is enabled, log the unmount stop event
  if (isUnmountLoggingEnabled) {
    logEvent("--component-layout-effect-unmount-stop");
  }
}

module.exports = finalizeComponentLayoutEffect;