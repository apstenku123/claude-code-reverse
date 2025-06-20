/**
 * Builds an AWS SigV4 configuration object with a normalized auth scheme preference.
 *
 * @param {Object} inputConfig - The input configuration object, expected to have an optional 'authSchemePreference' property.
 * @returns {Object} The resolved AWS SigV4 configuration object with a normalized 'authSchemePreference' property.
 */
function buildAwsSigV4ConfigWithAuthScheme(inputConfig) {
  // Resolve the base AWS SigV4 configuration from the input
  const resolvedConfig = Ku6.resolveAwsSdkSigV4Config(inputConfig);

  // Normalize the authSchemePreference array (default to empty array if undefined)
  const normalizedAuthSchemePreference = Zn1.normalizeProvider(
    inputConfig.authSchemePreference ?? []
  );

  // Merge the normalized authSchemePreference into the resolved configuration
  return Object.assign(resolvedConfig, {
    authSchemePreference: normalizedAuthSchemePreference
  });
}

module.exports = buildAwsSigV4ConfigWithAuthScheme;