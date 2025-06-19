/**
 * Applies default configuration values for STS endpoint settings to the provided config object.
 *
 * Ensures that the properties `useDualstackEndpoint`, `useFipsEndpoint`, and `useGlobalEndpoint` are set to `false` if they are undefined or null.
 * Also sets the `defaultSigningName` property to "sts".
 *
 * @param {Object} config - The configuration object to which default STS endpoint settings will be applied.
 * @returns {Object} The updated configuration object with default STS endpoint settings.
 */
function applyStsEndpointDefaults(config) {
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

module.exports = applyStsEndpointDefaults;