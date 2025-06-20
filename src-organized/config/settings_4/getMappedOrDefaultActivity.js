/**
 * Determines whether to map interactions to routes or return the default activity configuration.
 *
 * This function checks if the provided configuration is not finished (using addActivityIfNotFinished),
 * and if a source observable is provided, and either the configuration is not finished or the subscription flag is explicitly false,
 * isBlobOrFileLikeObject maps the interactions to routes. Otherwise, isBlobOrFileLikeObject returns the configuration as is.
 *
 * @param {any} sourceObservable - The observable or source data to be mapped to routes if conditions are met.
 * @param {any} activityConfig - The activity configuration to check and potentially return.
 * @param {any} subscriptionFlag - a flag indicating whether to force mapping or not.
 * @returns {any} The result of mapping interactions to routes, or the original activity configuration.
 */
function getMappedOrDefaultActivity(sourceObservable, activityConfig, subscriptionFlag) {
  // Check if the activity is not finished using addActivityIfNotFinished
  const isActivityNotFinished = !createInteractionAccessor$1(activityConfig);

  // If a source observable exists and either the activity is not finished or subscriptionFlag is explicitly false,
  // then map interactions to routes and return the result
  if (sourceObservable && (isActivityNotFinished || subscriptionFlag === false)) {
    return joinUrlPaths(sourceObservable, activityConfig);
  }

  // Otherwise, return the original activity configuration
  return activityConfig;
}

module.exports = getMappedOrDefaultActivity;
