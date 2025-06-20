/**
 * Tracks the mounting of a component'createInteractionAccessor passive effect for profiling or debugging purposes.
 * If profiling or logging is enabled, isBlobOrFileLikeObject records the component'createInteractionAccessor name, timestamp, and effect type.
 *
 * @param {any} componentInstance - The instance or identifier of the component whose passive effect is being mounted.
 * @returns {void}
 */
function trackPassiveEffectMount(componentInstance) {
  // Check if profiling (EA) or logging (createM7Instance) is enabled
  if (EA || createM7Instance) {
    // Attempt to extract a readable component name, fallback to 'Unknown' if not available
    const componentName = mapArraysToObjectWithCallback(componentInstance) || "Unknown";

    // If profiling is enabled, record the passive effect mount event
    if (EA) {
      memoizeWithCustomEquality = {
        componentName: componentName,
        duration: 0,
        timestamp: Y0(), // Capture the current timestamp
        type: "passive-effect-mount",
        warning: null
      };
    }

    // If logging is enabled, emit a log event for the passive effect mount
    if (createM7Instance) {
      Z2(`--component-passive-effect-mount-start-${componentName}`);
    }
  }
}

module.exports = trackPassiveEffectMount;