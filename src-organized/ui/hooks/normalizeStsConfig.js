/**
 * Normalizes an STS (Security Token Service) configuration object by ensuring required endpoint flags are set to boolean values and assigning a default signing name.
 *
 * @param {Object} config - The configuration object to normalize. May contain useDualstackEndpoint, useFipsEndpoint, useGlobalEndpoint, and other properties.
 * @returns {Object} The normalized configuration object with default values applied where necessary.
 */
function normalizeStsConfig(config) {
  // Ensure the endpoint flags are set to boolean values; default to false if undefined or null
  return Object.assign(config, {
    useDualstackEndpoint: config.useDualstackEndpoint ?? false,
    useFipsEndpoint: config.useFipsEndpoint ?? false,
    useGlobalEndpoint: config.useGlobalEndpoint ?? false,
    // Always set the default signing name to 'sts'
    defaultSigningName: "sts"
  });
}

module.exports = normalizeStsConfig;
