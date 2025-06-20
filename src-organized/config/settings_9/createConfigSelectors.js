/**
 * Creates selector functions for retrieving configuration values from environment variables or config files.
 *
 * @param {string} sourceKey - The base key or identifier used to build configuration selectors.
 * @returns {object} An object containing selector functions for environment variables and config files.
 */
function createConfigSelectors(sourceKey) {
  return {
    /**
     * Selects an environment variable value from the provided environment object.
     *
     * @param {object} envVars - The environment variables object (e.g., process.env).
     * @returns {string|undefined} The selected environment variable value, or undefined if not found.
     */
    environmentVariableSelector: (envVars) => {
      // Split the sourceKey by spaces and convert each part to uppercase
      const upperCaseParts = sourceKey.split(" ").map(part => part.toUpperCase());
      // Build the environment variable key: SlA + '_' + upperCaseParts.join('_')
      const envVarKey = [SlA, ...upperCaseParts].join("_");
      const envVarValue = envVars[envVarKey];
      if (envVarValue) return envVarValue;
      // Fallback: try just SlA as the key
      const fallbackValue = envVars[SlA];
      if (fallbackValue) return fallbackValue;
      // Not found
      return undefined;
    },

    /**
     * Selects a configuration value from a config file object, optionally using a services section.
     *
     * @param {object} config - The configuration object.
     * @param {object} [servicesSection] - Optional services section from the config file.
     * @returns {string|undefined} The selected config value, or undefined if not found.
     */
    configFileSelector: (config, servicesSection) => {
      // If a services section is provided and config.services exists
      if (servicesSection && config.services) {
        // Build the key for the services section: 'services' + CONFIG_PREFIX_SEPARATOR + config.services
        const servicesKey = ["services", config.services].join(PlA.CONFIG_PREFIX_SEPARATOR);
        const servicesConfig = servicesSection[servicesKey];
        if (servicesConfig) {
          // Split the sourceKey by spaces and convert each part to lowercase
          const lowerCaseParts = sourceKey.split(" ").map(part => part.toLowerCase());
          // Build the key for the config value: lowerCaseParts.join('_') + CONFIG_PREFIX_SEPARATOR + _lA
          const configValueKey = [lowerCaseParts.join("_"), _lA].join(PlA.CONFIG_PREFIX_SEPARATOR);
          const configValue = servicesConfig[configValueKey];
          if (configValue) return configValue;
        }
      }
      // Fallback: try _lA as the key in the config object
      const fallbackValue = config[_lA];
      if (fallbackValue) return fallbackValue;
      // Not found
      return undefined;
    },

    // Default value is undefined
    default: undefined
  };
}

module.exports = createConfigSelectors;