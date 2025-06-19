/**
 * Attaches Statsig metadata to the request body of the provided request object.
 *
 * This function extracts the sdkKey and fallbackUrl from the request object, retrieves
 * the stable updateSnapshotAndNotify, session updateSnapshotAndNotify, and SDK type using external providers, and then merges
 * these values (along with additional Statsig metadata) into the request body. The
 * resulting body is a JSON string containing the original config and the enriched
 * statsigMetadata object.
 *
 * @param {Object} requestObject - The object representing the request, must contain sdkKey and fallbackUrl.
 * @param {Object} config - The configuration object to be merged into the request body.
 * @returns {void} This function mutates the requestObject by setting its 'body' property.
 */
function attachStatsigMetadataToRequestBody(requestObject, config) {
  // Destructure sdkKey and fallbackUrl from the request object
  const {
    sdkKey,
    fallbackUrl
  } = requestObject;

  // Retrieve stableID, sessionID, and sdkType using external providers
  const stableID = Lw9.StableID.get(sdkKey);
  const sessionID = fVA.SessionID.get(sdkKey);
  const sdkType = xVA.SDKType._get(sdkKey);

  // Retrieve additional Statsig metadata
  const statsigMetadata = {
    ...vVA.StatsigMetadataProvider.get(),
    stableID,
    sessionID,
    sdkType,
    fallbackUrl
  };

  // Merge the config with the statsigMetadata and stringify the result
  requestObject.body = JSON.stringify({
    ...config,
    statsigMetadata
  });
}

module.exports = attachStatsigMetadataToRequestBody;