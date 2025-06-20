/**
 * Synchronizes application state changes with configuration and triggers side effects as needed.
 *
 * @function syncAppStateWithConfig
 * @param {Object} params - The parameters object.
 * @param {Object} params.newState - The new application state after an update.
 * @param {Object|null} params.oldState - The previous application state before the update. Can be null if no previous state exists.
 * @returns {void}
 *
 * This function compares the new and old application states and performs side effects
 * such as updating user settings, configuration, and feature flags when relevant changes are detected.
 */
function syncAppStateWithConfig({
  newState,
  oldState
}) {
  // Handle changes to the mainLoopModel property
  if (
    oldState !== null &&
    newState.mainLoopModel !== oldState.mainLoopModel &&
    newState.mainLoopModel === null
  ) {
    // If mainLoopModel was set and is now null, clear the userSettings model and reset related state
    saveSettingsWithMerge("userSettings", { model: undefined });
    setMainLoopModelOverride(null);
  }

  if (
    oldState !== null &&
    newState.mainLoopModel !== oldState.mainLoopModel &&
    newState.mainLoopModel !== null
  ) {
    // If mainLoopModel changed to a non-null value, update userSettings model and related state
    saveSettingsWithMerge("userSettings", { model: newState.mainLoopModel });
    setMainLoopModelOverride(newState.mainLoopModel);
  }

  // Handle changes to maxRateLimitFallbackActive flag
  if (newState.maxRateLimitFallbackActive !== pT()) {
    setMaxRateLimitFallbackActive(newState.maxRateLimitFallbackActive);
  }

  // Handle changes to todoFeatureEnabled flag
  if (
    oldState !== null &&
    newState.todoFeatureEnabled !== oldState.todoFeatureEnabled &&
    getCachedOrFreshConfig().todoFeatureEnabled !== newState.todoFeatureEnabled
  ) {
    updateProjectsAccessor({
      ...getCachedOrFreshConfig(),
      todoFeatureEnabled: newState.todoFeatureEnabled
    });
  }

  // Handle changes to verbose flag
  if (
    oldState !== null &&
    newState.verbose !== oldState.verbose &&
    getCachedOrFreshConfig().verbose !== newState.verbose
  ) {
    updateProjectsAccessor({
      ...getCachedOrFreshConfig(),
      verbose: newState.verbose
    });
  }

  // Handle changes to toolPermissionContext
  if (newState.toolPermissionContext !== oldState?.toolPermissionContext) {
    setInteractionEntriesObservable(newState.toolPermissionContext);
  }
}

module.exports = syncAppStateWithConfig;