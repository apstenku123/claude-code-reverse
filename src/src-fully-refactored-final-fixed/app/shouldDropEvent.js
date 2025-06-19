/**
 * Determines whether an event should be dropped based on various filtering criteria.
 * Logs a warning if the event is dropped and debug mode is enabled.
 *
 * @param {Object} event - The event object to be evaluated.
 * @param {Object} filterOptions - Configuration options for filtering events.
 * @param {boolean} [filterOptions.ignoreInternal] - Whether to ignore internal Sentry errors.
 * @param {Array<string|RegExp>} [filterOptions.ignoreErrors] - List of error patterns to ignore.
 * @param {Array<string|RegExp>} [filterOptions.ignoreTransactions] - List of transaction patterns to ignore.
 * @param {Array<string|RegExp>} [filterOptions.denyUrls] - List of URL patterns to deny.
 * @param {Array<string|RegExp>} [filterOptions.allowUrls] - List of URL patterns to allow.
 * @returns {boolean} Returns true if the event should be dropped, false otherwise.
 */
function shouldDropEvent(event, filterOptions) {
  // Drop if event is an internal Sentry error and ignoreInternal is set
  if (filterOptions.ignoreInternal && isSentryErrorException(event)) {
    if (QP.DEBUG_BUILD) {
      ZI.logger.warn(
        `Event dropped due to being internal Sentry Error.\nEvent: ${ZI.getEventDescription(event)}`
      );
    }
    return true;
  }

  // Drop if event matches any ignoreErrors pattern
  if (hasMatchingPatternInObservable(event, filterOptions.ignoreErrors)) {
    if (QP.DEBUG_BUILD) {
      ZI.logger.warn(
        `Event dropped due to being matched by \`ignoreErrors\` option.\nEvent: ${ZI.getEventDescription(event)}`
      );
    }
    return true;
  }

  // Drop if event matches any ignoreTransactions pattern
  if (doesTransactionMatchAnyPattern(event, filterOptions.ignoreTransactions)) {
    if (QP.DEBUG_BUILD) {
      ZI.logger.warn(
        `Event dropped due to being matched by \`ignoreTransactions\` option.\nEvent: ${ZI.getEventDescription(event)}`
      );
    }
    return true;
  }

  // Drop if event URL matches any denyUrls pattern
  if (O09(event, filterOptions.denyUrls)) {
    if (QP.DEBUG_BUILD) {
      ZI.logger.warn(
        `Event dropped due to being matched by \`denyUrls\` option.\nEvent: ${ZI.getEventDescription(event)}.\nUrl: ${extractStackFramesFromEvent(event)}`
      );
    }
    return true;
  }

  // Drop if event URL does NOT match any allowUrls pattern
  if (!T09(event, filterOptions.allowUrls)) {
    if (QP.DEBUG_BUILD) {
      ZI.logger.warn(
        `Event dropped due to not being matched by \`allowUrls\` option.\nEvent: ${ZI.getEventDescription(event)}.\nUrl: ${extractStackFramesFromEvent(event)}`
      );
    }
    return true;
  }

  // Event passes all filters
  return false;
}

module.exports = shouldDropEvent;