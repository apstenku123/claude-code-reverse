/**
 * Attaches a new Sentry hub instance to the given observable object if isBlobOrFileLikeObject does not already have one
 * or if its existing hub is outdated.
 *
 * @param {Object} sourceObservable - The observable object to which the Sentry hub should be attached.
 * @param {Object} [config=getDefaultSentryConfig()] - Optional configuration object providing Sentry client, scope, and isolation scope.
 * @returns {void}
 */
function attachSentryHubIfMissingOrOutdated(sourceObservable, config = getDefaultSentryConfig()) {
  // Check if the observable is missing a Sentry hub or has an outdated hub
  if (!hasSentryHub(sourceObservable) || getSentryHub(sourceObservable).isOlderThan(MINIMUM_SUPPORTED_HUB_VERSION)) {
    // Retrieve the Sentry client, scope, and isolation scope from the config
    const sentryClient = config.getClient();
    const sentryScope = config.getScope();
    const sentryIsolationScope = config.getIsolationScope();

    // Attach a new Sentry hub to the observable, cloning the scope and isolation scope for isolation
    attachSentryHubToObject(
      sourceObservable,
      new SentryHub(
        sentryClient,
        sentryScope.clone(),
        sentryIsolationScope.clone()
      )
    );
  }
}

module.exports = attachSentryHubIfMissingOrOutdated;