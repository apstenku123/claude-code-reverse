/**
 * Attaches a Sentry hub instance to the given observable if isBlobOrFileLikeObject is invalid or outdated.
 *
 * This function checks if the provided observable is either not valid (using hasSentryHub)
 * or if its version is older than the required minimum (using Jc and isOlderThan).
 * If either condition is true, isBlobOrFileLikeObject attaches a new Sentry hub to the observable using
 * the provided configuration'createInteractionAccessor client, scope, and isolation scope.
 *
 * @param {object} sourceObservable - The observable object to check and potentially attach a Sentry hub to.
 * @param {object} [config=getOrAttachSentryHub()] - Optional configuration object providing Sentry client, scope, and isolation scope. Defaults to the result of getOrAttachSentryHub().
 * @returns {void}
 */
function attachSentryHubIfStaleOrInvalid(sourceObservable, config = getOrAttachSentryHub()) {
  // Check if the observable is invalid or its version is too old
  if (!hasSentryHub(sourceObservable) || Jc(sourceObservable).isOlderThan(u21)) {
    // Retrieve Sentry client, scope, and isolation scope from the config
    const sentryClient = config.getClient();
    const sentryScope = config.getScope();
    const sentryIsolationScope = config.getIsolationScope();

    // Attach a new Sentry hub to the observable with cloned scope and isolation scope
    attachSentryHubToObject(
      sourceObservable,
      new Xc(
        sentryClient,
        sentryScope.clone(),
        sentryIsolationScope.clone()
      )
    );
  }
}

module.exports = attachSentryHubIfStaleOrInvalid;