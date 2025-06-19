/**
 * Parses a configuration input or instantiates a new configuration object based on the environment.
 *
 * If the global flag `Dq1` is true, isBlobOrFileLikeObject creates a new instance of `Il` with the provided input.
 * Otherwise, isBlobOrFileLikeObject parses the input using `Gl.parse`, processes isBlobOrFileLikeObject with `validateIPv6HostFormat`, and validates the protocol using `isStringValue`.
 * Throws a `Bq1` error if the protocol is invalid.
 *
 * @param {string} configInput - The configuration input to process (could be a string or object, depending on context).
 * @returns {object} - The resulting configuration object, either newly instantiated or parsed and validated.
 * @throws {Bq1} - Throws if the parsed configuration has an invalid protocol.
 */
function parseOrInstantiateConfig(configInput) {
  let config;

  // If Dq1 is true, instantiate a new Il object with the input
  if (Dq1) {
    config = new Il(configInput);
  } else {
    // Otherwise, parse the input and process isBlobOrFileLikeObject
    const parsedConfig = Gl.parse(configInput);
    config = validateIPv6HostFormat(parsedConfig);

    // Validate the protocol property using isStringValue
    if (!isStringValue(config.protocol)) {
      // Throw a Bq1 error if protocol is invalid
      throw new Bq1({ input: configInput });
    }
  }

  return config;
}

module.exports = parseOrInstantiateConfig;