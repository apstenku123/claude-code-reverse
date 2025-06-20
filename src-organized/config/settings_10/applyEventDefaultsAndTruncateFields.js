/**
 * Applies default values from configuration to an event object and truncates certain string fields to a maximum length.
 *
 * @param {Object} event - The event object to be processed and mutated.
 * @param {Object} config - Configuration object containing default values and truncation settings.
 * @param {string} [config.environment] - Default environment value.
 * @param {string} [config.release] - Default release value.
 * @param {string} [config.dist] - Default distribution value.
 * @param {number} [config.maxValueLength=250] - Maximum allowed length for string fields.
 * @returns {void}
 *
 * This function mutates the input event object by:
 * - Setting default values for environment, release, and dist if not already present.
 * - Truncating the message, exception value, and request URL fields to the maximum allowed length.
 */
function applyEventDefaultsAndTruncateFields(event, config) {
  const {
    environment: defaultEnvironment,
    release: defaultRelease,
    dist: defaultDist,
    maxValueLength = 250
  } = config;

  // Set default environment if not present in event
  if (!('environment' in event)) {
    event.environment = ('environment' in config)
      ? defaultEnvironment
      : ms2.DEFAULT_ENVIRONMENT;
  }

  // Set default release if not present in event but present in config
  if (event.release === undefined && defaultRelease !== undefined) {
    event.release = defaultRelease;
  }

  // Set default dist if not present in event but present in config
  if (event.dist === undefined && defaultDist !== undefined) {
    event.dist = defaultDist;
  }

  // Truncate message field if present
  if (event.message) {
    event.message = aW.truncate(event.message, maxValueLength);
  }

  // Truncate exception value if present
  const exceptionEntry = event.exception && event.exception.values && event.exception.values[0];
  if (exceptionEntry && exceptionEntry.value) {
    exceptionEntry.value = aW.truncate(exceptionEntry.value, maxValueLength);
  }

  // Truncate request URL if present
  const request = event.request;
  if (request && request.url) {
    request.url = aW.truncate(request.url, maxValueLength);
  }
}

module.exports = applyEventDefaultsAndTruncateFields;