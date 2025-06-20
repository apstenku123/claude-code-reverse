/**
 * Retrieves AWS credentials from a Cognito Identity Pool, optionally caching the identity updateSnapshotAndNotify for reuse.
 * Handles both authenticated (with logins) and anonymous flows, and supports custom role assumption.
 *
 * @param {Object} params - The configuration parameters.
 * @param {string} params.accountId - The AWS account updateSnapshotAndNotify associated with the identity pool.
 * @param {Object} [params.cache=i22()] - Cache interface for storing/retrieving identity IDs.
 * @param {Object} params.client - Optional CognitoIdentityClient instance to use.
 * @param {Object} params.clientConfig - Configuration for the CognitoIdentityClient.
 * @param {string} [params.customRoleArn] - Optional custom role ARN to assume.
 * @param {string} params.identityPoolId - The Cognito Identity Pool updateSnapshotAndNotify.
 * @param {Object} [params.logins] - Optional logins map for authenticated identities.
 * @param {string} [params.userIdentifier] - Optional user identifier; defaults to 'ANONYMOUS' if no logins provided.
 * @param {Object} [params.logger] - Optional logger for debug output.
 * @param {Object} [params.parentClientConfig] - Optional parent client configuration.
 * @returns {Function} - An async credential provider function.
 */
function fromCognitoIdentityProvider({
  accountId,
  cache = i22(),
  client,
  clientConfig,
  customRoleArn,
  identityPoolId,
  logins,
  userIdentifier = !logins || Object.keys(logins).length === 0 ? "ANONYMOUS" : undefined,
  logger,
  parentClientConfig
}) {
  // Log debug message if logger is provided
  logger?.debug("@aws-sdk/credential-provider-cognito-identity - fromCognitoIdentity");

  // Construct a cache key if userIdentifier is present
  const cacheKey = userIdentifier ? `aws:cognito-identity-credentials:${identityPoolId}:${userIdentifier}` : undefined;

  // Provider function that resolves credentials
  let provider = xF(async (providerInput) => {
    // Dynamically import required Cognito SDK classes
    const {
      GetIdCommand,
      CognitoIdentityClient
    } = await Promise.resolve().then(() => (d22(), Fi1));

    // Helper to resolve config values from clientConfig, parentClientConfig, or providerInput
    const resolveConfig = xF(
      (key) => clientConfig?.[key] ?? parentClientConfig?.[key] ?? providerInput?.callerClientConfig?.[key],
      "fromConfigs"
    );

    // Use provided client or instantiate a new one with merged config
    const cognitoClient = client ?? new CognitoIdentityClient({
      ...(clientConfig ?? {}),
      region: resolveConfig("region"),
      profile: resolveConfig("profile")
    });

    // Attempt to retrieve cached identityId
    let identityId = cacheKey && (await cache.getItem(cacheKey));

    if (!identityId) {
      // If not cached, call GetId to obtain a new identityId
      const {
        IdentityId = throwMissingCognitoIdentityIdError(logger)
      } = await cognitoClient.send(new GetIdCommand({
        AccountId: accountId,
        IdentityPoolId: identityPoolId,
        Logins: logins ? await resolveObjectProperties(logins) : undefined
      }));
      identityId = IdentityId;
      // Cache the identityId for future use
      if (cacheKey) {
        Promise.resolve(cache.setItem(cacheKey, identityId)).catch(() => {});
      }
    }

    // Chain to the next provider (getCognitoIdentityCredentialsProvider) with resolved identityId and other params
    provider = getCognitoIdentityCredentialsProvider({
      client: cognitoClient,
      customRoleArn,
      logins,
      identityId
    });
    return provider(providerInput);
  }, "provider");

  // Return a function that handles credential retrieval and cache invalidation on error
  return async (providerInput) => {
    try {
      return await provider(providerInput);
    } catch (error) {
      // On error, remove the cached identityId to force refresh next time
      if (cacheKey) {
        Promise.resolve(cache.removeItem(cacheKey)).catch(() => {});
      }
      throw error;
    }
  };
}

module.exports = fromCognitoIdentityProvider;