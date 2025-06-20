/**
 * Initializes an Ef6 observable from the provided configuration object.
 *
 * @param {Object} [config={}] - Configuration options to initialize the Ef6 observable.
 * @returns {Ef6Observable} a new Ef6 observable instance initialized with the given configuration.
 */
const initializeEf6FromConfig = (config = {}) => {
  // Spread the configuration object to ensure all properties are passed to Ef6.fromIni
  return Ef6.fromIni({
    ...config
  });
};

module.exports = initializeEf6FromConfig;