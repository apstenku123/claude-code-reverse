/**
 * Builds an AWS SDK SigV4 configuration object with a normalized auth scheme preference.
 *
 * @param {Object} inputConfig - The input configuration object, expected to contain an optional 'authSchemePreference' property.
 * @returns {Object} The resolved AWS SDK SigV4 configuration object with a normalized 'authSchemePreference' property.
 */
function buildAwsSdkSigV4ConfigWithAuthScheme(inputConfig) {
  // Resolve the base AWS SDK SigV4 configuration from the input
  const resolvedConfig = IF4.resolveAwsSdkSigV4Config(inputConfig);

  // Normalize the authSchemePreference property (default to empty array if undefined)
  const normalizedAuthSchemePreference = Q_1.normalizeProvider(
    inputConfig.authSchemePreference ?? []
  );

  // Merge the normalized authSchemePreference into the resolved config
  return Object.assign(resolvedConfig, {
    authSchemePreference: normalizedAuthSchemePreference
  });
}

module.exports = buildAwsSdkSigV4ConfigWithAuthScheme;
