/**
 * Applies default STS (Security Token Service) configuration options to the provided config object.
 *
 * Ensures that the properties 'useDualstackEndpoint', 'useFipsEndpoint', and 'useGlobalEndpoint' are set to boolean values (defaulting to false if undefined).
 * Also sets the 'defaultSigningName' property to 'sts'.
 *
 * @param {Object} config - The configuration object to which default STS options will be applied.
 * @returns {Object} The updated configuration object with default STS options applied.
 */
function applyDefaultStsConfig(config) {
  return Object.assign(config, {
    // Use dualstack endpoint if specified, otherwise default to false
    useDualstackEndpoint: config.useDualstackEndpoint ?? false,
    // Use FIPS endpoint if specified, otherwise default to false
    useFipsEndpoint: config.useFipsEndpoint ?? false,
    // Use global endpoint if specified, otherwise default to false
    useGlobalEndpoint: config.useGlobalEndpoint ?? false,
    // Always set the default signing name to 'sts'
    defaultSigningName: "sts"
  });
}

module.exports = applyDefaultStsConfig;
