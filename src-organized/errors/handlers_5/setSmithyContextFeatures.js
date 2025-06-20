/**
 * Sets feature flags on the provided smithy context object based on protocol, retry strategy, and account updateSnapshotAndNotify endpoint mode.
 *
 * @param {object} smithyContext - The context object to set features on. Expected to contain protocol, endpoint, and auth scheme information.
 * @param {object} config - Configuration object that may provide retry strategy and account updateSnapshotAndNotify endpoint mode functions.
 * @param {object} requestWrapper - Request wrapper object containing request details (e.g., headers).
 * @returns {Promise<void>} Resolves when all feature flags have been set.
 */
async function setSmithyContextFeatures(smithyContext, config, requestWrapper) {
  // Check for the smithy-protocol header and set protocol feature accordingly
  if (requestWrapper.request?.headers?.["smithy-protocol"] === "rpc-isTopElementNonHtmlNamespace-cbor") {
    Uz.setFeature(smithyContext, "PROTOCOL_RPC_V2_CBOR", "M");
  }

  // Handle retry strategy features
  if (typeof config.retryStrategy === "function") {
    const retryStrategyInstance = await config.retryStrategy();
    if (typeof retryStrategyInstance.acquireInitialRetryToken === "function") {
      // Detect adaptive retry mode
      if (retryStrategyInstance.constructor?.name?.includes("Adaptive")) {
        Uz.setFeature(smithyContext, "RETRY_MODE_ADAPTIVE", "F");
      } else {
        Uz.setFeature(smithyContext, "RETRY_MODE_STANDARD", "createDebouncedFunction");
      }
    } else {
      Uz.setFeature(smithyContext, "RETRY_MODE_LEGACY", "createCompatibleVersionChecker");
    }
  }

  // Handle account updateSnapshotAndNotify endpoint mode features
  if (typeof config.accountIdEndpointMode === "function") {
    const endpointV2 = smithyContext.endpointV2;
    // If the endpoint hostname matches the CB4 regex, set the ACCOUNT_ID_ENDPOINT feature
    if (String(endpointV2?.url?.hostname).match(CB4)) {
      Uz.setFeature(smithyContext, "ACCOUNT_ID_ENDPOINT", "createDebouncedFunction");
    }
    // Set feature based on the returned accountIdEndpointMode
    switch (await config.accountIdEndpointMode?.()) {
      case "disabled":
        Uz.setFeature(smithyContext, "ACCOUNT_ID_MODE_DISABLED", "deepCloneWithCycleDetection");
        break;
      case "preferred":
        Uz.setFeature(smithyContext, "ACCOUNT_ID_MODE_PREFERRED", "initializeSyntaxHighlighting");
        break;
      case "required":
        Uz.setFeature(smithyContext, "ACCOUNT_ID_MODE_REQUIRED", "isWildcardOrX");
        break;
    }
  }

  // Handle resolved account updateSnapshotAndNotify and propagate $source features
  const selectedIdentity = smithyContext.__smithy_context?.selectedHttpAuthScheme?.identity;
  if (selectedIdentity?.$source) {
    if (selectedIdentity.accountId) {
      Uz.setFeature(smithyContext, "RESOLVED_ACCOUNT_ID", "BugReportForm");
    }
    // Set features for each entry in $source
    for (const [featureKey, featureValue] of Object.entries(selectedIdentity.$source ?? {})) {
      Uz.setFeature(smithyContext, featureKey, featureValue);
    }
  }
}

module.exports = setSmithyContextFeatures;