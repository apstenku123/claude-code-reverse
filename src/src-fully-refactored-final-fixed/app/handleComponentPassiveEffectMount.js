/**
 * Handles the start of a component'createInteractionAccessor passive effect mount phase.
 *
 * If either the areArraysEqual (EA) or isProfiling (createM7Instance) flags are true, this function:
 *   - Determines the component'createInteractionAccessor name using the getComponentName function (mapArraysToObjectWithCallback)
 *   - If profiling is enabled (EA), sets the current profiling state (memoizeWithCustomEquality) with component details
 *   - If passive effect logging is enabled (createM7Instance), logs the passive effect mount start event
 *
 * @param {any} componentFiber - The fiber node representing the React component
 * @returns {void}
 */
function handleComponentPassiveEffectMount(componentFiber) {
  // Check if profiling or passive effect logging is enabled
  if (areArraysEqual || isProfiling) {
    // Get the component'createInteractionAccessor display name, or default to "Unknown"
    const componentName = getComponentName(componentFiber) || "Unknown";

    // If profiling is enabled, set the current profiling state
    if (areArraysEqual) {
      currentProfilingState = {
        componentName: componentName,
        duration: 0,
        timestamp: getCurrentTimestamp(),
        type: "passive-effect-mount",
        warning: null
      };
    }

    // If passive effect logging is enabled, log the mount start event
    if (isProfiling) {
      logPassiveEffectEvent(`--component-passive-effect-mount-start-${componentName}`);
    }
  }
}

module.exports = handleComponentPassiveEffectMount;