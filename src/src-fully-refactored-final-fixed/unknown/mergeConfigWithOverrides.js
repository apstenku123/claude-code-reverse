/**
 * Merges a base configuration object with override values, specifically merging nested 'chars' and 'style' objects.
 * If no base configuration is provided, a default is generated via fK5().
 *
 * @param {Object} [overrides={}] - An object containing override values for the configuration.
 * @param {Object} [baseConfig=fK5()] - The base configuration object to merge with. If not provided, defaults to the result of fK5().
 * @returns {Object} - The merged configuration object, with 'chars' and 'style' properties deeply merged.
 */
function mergeConfigWithOverrides(overrides = {}, baseConfig = fK5()) {
  // Merge baseConfig and overrides at the top level
  const mergedConfig = Object.assign({}, baseConfig, overrides);

  // Deep merge 'chars' property
  mergedConfig.chars = Object.assign({}, baseConfig.chars, overrides.chars);

  // Deep merge 'style' property
  mergedConfig.style = Object.assign({}, baseConfig.style, overrides.style);

  return mergedConfig;
}

module.exports = mergeConfigWithOverrides;
