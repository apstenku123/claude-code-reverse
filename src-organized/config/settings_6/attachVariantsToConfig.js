/**
 * Attaches a 'variants' property to the provided configuration object.
 *
 * @param {any} variants - The variants data to attach (could be any type, typically an object or array).
 * @param {Object} [config={}] - The configuration object to which the variants will be attached. If not provided, a new object is used.
 * @returns {Object} The configuration object with the 'variants' property set to the provided variants.
 */
function attachVariantsToConfig(variants, config = {}) {
  // Assign the variants to the config object
  config.variants = variants;
  return config;
}

module.exports = attachVariantsToConfig;