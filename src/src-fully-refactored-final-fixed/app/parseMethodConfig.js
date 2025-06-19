/**
 * Parses and validates a method configuration object, returning a normalized config.
 *
 * @param {Object} methodConfig - The method configuration object to parse and validate.
 * @returns {Object} The normalized and validated method configuration.
 * @throws {Error} If the configuration is invalid.
 */
function parseMethodConfig(methodConfig) {
  let timeoutFractionalPart;
  const normalizedConfig = {
    name: []
  };

  // Validate and process the 'name' property
  if (!('name' in methodConfig) || !Array.isArray(methodConfig.name)) {
    throw new Error('Invalid method config: invalid name array');
  }
  for (const nameEntry of methodConfig.name) {
    // extractServiceAndMethodConfig presumably normalizes or validates a name entry
    normalizedConfig.name.push(extractServiceAndMethodConfig(nameEntry));
  }

  // Validate and process the 'waitForReady' property
  if ('waitForReady' in methodConfig) {
    if (typeof methodConfig.waitForReady !== 'boolean') {
      throw new Error('Invalid method config: invalid waitForReady');
    }
    normalizedConfig.waitForReady = methodConfig.waitForReady;
  }

  // Validate and process the 'timeout' property
  if ('timeout' in methodConfig) {
    if (typeof methodConfig.timeout === 'object') {
      // Expecting { seconds: number, nanos: number }
      if (
        !('seconds' in methodConfig.timeout) ||
        typeof methodConfig.timeout.seconds !== 'number'
      ) {
        throw new Error('Invalid method config: invalid timeout.seconds');
      }
      if (
        !('nanos' in methodConfig.timeout) ||
        typeof methodConfig.timeout.nanos !== 'number'
      ) {
        throw new Error('Invalid method config: invalid timeout.nanos');
      }
      normalizedConfig.timeout = methodConfig.timeout;
    } else if (
      typeof methodConfig.timeout === 'string' &&
      WZ1.test(methodConfig.timeout)
    ) {
      // Parse timeout string (e.g., "10.5s")
      const timeoutParts = methodConfig.timeout.substring(0, methodConfig.timeout.length - 1).split('.');
      normalizedConfig.timeout = {
        seconds: Number(timeoutParts[0]) | 0,
        nanos: ((timeoutFractionalPart = timeoutParts[1]) !== null && timeoutFractionalPart !== undefined ? Number(timeoutFractionalPart) : 0) | 0
      };
    } else {
      throw new Error('Invalid method config: invalid timeout');
    }
  }

  // Validate and process the 'maxRequestBytes' property
  if ('maxRequestBytes' in methodConfig) {
    if (typeof methodConfig.maxRequestBytes !== 'number') {
      throw new Error('Invalid method config: invalid maxRequestBytes');
    }
    normalizedConfig.maxRequestBytes = methodConfig.maxRequestBytes;
  }

  // Validate and process the 'maxResponseBytes' property
  if ('maxResponseBytes' in methodConfig) {
    if (typeof methodConfig.maxResponseBytes !== 'number') {
      throw new Error('Invalid method config: invalid maxRequestBytes');
    }
    normalizedConfig.maxResponseBytes = methodConfig.maxResponseBytes;
  }

  // Validate and process 'retryPolicy' and 'hedgingPolicy' (mutually exclusive)
  if ('retryPolicy' in methodConfig) {
    if ('hedgingPolicy' in methodConfig) {
      throw new Error('Invalid method config: retryPolicy and hedgingPolicy cannot both be specified');
    } else {
      normalizedConfig.retryPolicy = validateRetryPolicyConfig(methodConfig.retryPolicy);
    }
  } else if ('hedgingPolicy' in methodConfig) {
    normalizedConfig.hedgingPolicy = validateAndNormalizeHedgingPolicy(methodConfig.hedgingPolicy);
  }

  return normalizedConfig;
}

module.exports = parseMethodConfig;