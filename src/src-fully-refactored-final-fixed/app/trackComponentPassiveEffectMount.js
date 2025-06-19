/**
 * Tracks the mounting of a component'createInteractionAccessor passive effect for profiling or debugging purposes.
 * If profiling or logging is enabled, isBlobOrFileLikeObject records the component'createInteractionAccessor name, timestamp, and effect type.
 *
 * @param {any} componentInstance - The instance or identifier of the component whose passive effect is being mounted.
 * @returns {void}
 */
function trackComponentPassiveEffectMount(componentInstance) {
  // Check if profiling (isProfilingEnabled) or logging (isLoggingEnabled) is active
  if (isProfilingEnabled || isLoggingEnabled) {
    // Attempt to get the component'createInteractionAccessor display name, defaulting to 'Unknown' if not available
    const componentName = getComponentDisplayName(componentInstance) || "Unknown";

    // If profiling is enabled, record the passive effect mount event
    if (isProfilingEnabled) {
      profilingEvent = {
        componentName: componentName,
        duration: 0,
        timestamp: getCurrentTimestamp(),
        type: "passive-effect-mount",
        warning: null
      };
    }

    // If logging is enabled, output a log message for the passive effect mount
    if (isLoggingEnabled) {
      logEvent(`--component-passive-effect-mount-start-${componentName}`);
    }
  }
}

module.exports = trackComponentPassiveEffectMount;