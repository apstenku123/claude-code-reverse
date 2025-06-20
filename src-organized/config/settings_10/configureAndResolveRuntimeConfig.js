/**
 * Configures and resolves runtime configuration for an AWS client using provided extension modules.
 *
 * @param {object} clientConfig - The initial client configuration object to be extended and resolved.
 * @param {Array<{configure: function}>} extensionModules - Array of extension modules, each with a configure method.
 * @returns {object} The updated client configuration object with all resolved runtime configurations applied.
 */
function configureAndResolveRuntimeConfig(clientConfig, extensionModules) {
  // Merge all extension configurations into a single config object
  const mergedConfig = Object.assign(
    s00.getAwsRegionExtensionConfiguration(clientConfig),
    o00.getDefaultExtensionConfiguration(clientConfig),
    r00.getHttpHandlerExtensionConfiguration(clientConfig),
    t00.getHttpAuthExtensionConfiguration(clientConfig)
  );

  // Allow each extension module to further configure the merged config
  extensionModules.forEach(extension => {
    extension.configure(mergedConfig);
  });

  // Resolve all runtime configurations and merge them back into the original client config
  return Object.assign(
    clientConfig,
    s00.resolveAwsRegionExtensionConfiguration(mergedConfig),
    o00.resolveDefaultRuntimeConfig(mergedConfig),
    r00.resolveHttpHandlerRuntimeConfig(mergedConfig),
    t00.resolveHttpAuthRuntimeConfig(mergedConfig)
  );
}

module.exports = configureAndResolveRuntimeConfig;