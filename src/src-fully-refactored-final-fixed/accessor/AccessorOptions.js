/**
 * Class representing accessor options for configuring locator behavior.
 *
 * @class AccessorOptions
 * @param {Object} [options] - Configuration options for the accessor.
 * @param {Object} [options.locator] - Locator-specific configuration.
 *
 * @example
 * const accessor = new AccessorOptions({ locator: { region: 'us-east' } });
 */
class AccessorOptions {
  /**
   * Creates an instance of AccessorOptions.
   * @param {Object} [options] - Optional configuration object.
   */
  constructor(options) {
    // If options are provided, use them; otherwise, default to an object with an empty locator
    this.options = options || { locator: {} };
  }
}

module.exports = AccessorOptions;