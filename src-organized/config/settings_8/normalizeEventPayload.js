/**
 * Normalizes and truncates event payload fields according to configuration.
 *
 * Ensures that the event object has the correct environment, release, and dist fields set,
 * and truncates the message, exception value, and request URL fields to a maximum length.
 *
 * @param {Object} eventPayload - The event object to normalize and mutate.
 * @param {Object} config - Configuration options for normalization.
 * @param {string} [config.environment] - The environment to set if not present in eventPayload.
 * @param {string} [config.release] - The release version to set if not present in eventPayload.
 * @param {string} [config.dist] - The distribution identifier to set if not present in eventPayload.
 * @param {number} [config.maxValueLength=250] - The maximum length for truncating string fields.
 * @returns {void}
 */
function normalizeEventPayload(eventPayload, config) {
  const {
    environment: configEnvironment,
    release: configRelease,
    dist: configDist,
    maxValueLength = 250
  } = config;

  // Set environment if not present in eventPayload
  if (!('environment' in eventPayload)) {
    eventPayload.environment = ('environment' in config)
      ? configEnvironment
      : ms2.DEFAULT_ENVIRONMENT;
  }

  // Set release if not present in eventPayload but provided in config
  if (eventPayload.release === undefined && configRelease !== undefined) {
    eventPayload.release = configRelease;
  }

  // Set dist if not present in eventPayload but provided in config
  if (eventPayload.dist === undefined && configDist !== undefined) {
    eventPayload.dist = configDist;
  }

  // Truncate message field if present
  if (eventPayload.message) {
    eventPayload.message = aW.truncate(eventPayload.message, maxValueLength);
  }

  // Truncate exception value if present
  const exceptionEntry = eventPayload.exception && eventPayload.exception.values && eventPayload.exception.values[0];
  if (exceptionEntry && exceptionEntry.value) {
    exceptionEntry.value = aW.truncate(exceptionEntry.value, maxValueLength);
  }

  // Truncate request URL if present
  const request = eventPayload.request;
  if (request && request.url) {
    request.url = aW.truncate(request.url, maxValueLength);
  }
}

module.exports = normalizeEventPayload;