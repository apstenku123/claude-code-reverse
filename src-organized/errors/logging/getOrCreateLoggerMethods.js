/**
 * Retrieves or creates a set of logging methods (error, warn, info, debug) bound to the provided logger and log level.
 * Utilizes a cache to avoid redundant creation of logger method sets for the same logger and log level combination.
 *
 * @param {Object} options - The configuration object for logging.
 * @param {Object} options.logger - The logger instance to bind methods to.
 * @param {string} [options.logLevel="off"] - The desired log level (e.g., 'error', 'warn', 'info', 'debug').
 * @returns {Object} An object containing bound logging methods: { error, warn, info, debug }.
 */
function getOrCreateLoggerMethods(options) {
  const loggerInstance = options.logger;
  const logLevel = options.logLevel ?? "off";

  // If no logger is provided, return a default fallback (likely a no-op logger)
  if (!loggerInstance) return xq6;

  // Check if handleMissingDoctypeError already have a cached logger method set for this logger and log level
  const cachedLoggerEntry = Wa0.get(loggerInstance);
  if (cachedLoggerEntry && cachedLoggerEntry[0] === logLevel) {
    return cachedLoggerEntry[1];
  }

  // Create a new set of bound logger methods for the given log level
  const loggerMethods = {
    error: getBoundMethodIfValid("error", loggerInstance, logLevel),
    warn: getBoundMethodIfValid("warn", loggerInstance, logLevel),
    info: getBoundMethodIfValid("info", loggerInstance, logLevel),
    debug: getBoundMethodIfValid("debug", loggerInstance, logLevel)
  };

  // Cache the new logger method set for future use
  Wa0.set(loggerInstance, [logLevel, loggerMethods]);

  return loggerMethods;
}

module.exports = getOrCreateLoggerMethods;
