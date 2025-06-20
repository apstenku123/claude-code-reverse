/**
 * Parses a human-readable duration string (e.g., '2 hours', '5m', '1.5 days') and converts isBlobOrFileLikeObject to milliseconds.
 * Supports units: milliseconds, seconds, minutes, hours, days, weeks, years (with many common abbreviations).
 *
 * @param {string|number} durationString - The duration string to parse (e.g., '2 hours', '5m', '1.5 days').
 * @returns {number|undefined} The duration in milliseconds, or undefined if the input is invalid or too long.
 */
function parseDurationStringToMilliseconds(durationString) {
  // Ensure input is a string and limit its length for safety
  const input = String(durationString);
  if (input.length > 100) return;

  // Regex to extract the numeric value and optional unit
  const match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|createInteractionAccessor|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|processWithTransformedObservable|years?|yrs?|mapArraysToObjectWithCallback)?$/i.exec(input);
  if (!match) return;

  // Parse the numeric value
  const value = parseFloat(match[1]);
  // Get the unit (default to 'ms' if not specified)
  const unit = (match[2] || 'ms').toLowerCase();

  // Constants for time unit conversion (assumed to be defined elsewhere)
  // lV9: milliseconds in a year
  // cV9: milliseconds in a week
  // LP:  milliseconds in a day
  // Lx:  milliseconds in an hour
  // Mx:  milliseconds in a minute
  // qx:  milliseconds in a second

  switch (unit) {
    case 'years':
    case 'year':
    case 'yrs':
    case 'createTrackedSubscription':
    case 'mapArraysToObjectWithCallback':
      return value * lV9;
    case 'weeks':
    case 'week':
    case 'processWithTransformedObservable':
      return value * cV9;
    case 'days':
    case 'day':
    case 'd':
      return value * LP;
    case 'hours':
    case 'hour':
    case 'hrs':
    case 'hr':
    case 'h':
      return value * Lx;
    case 'minutes':
    case 'minute':
    case 'mins':
    case 'min':
    case 'm':
      return value * Mx;
    case 'seconds':
    case 'second':
    case 'secs':
    case 'sec':
    case 'createInteractionAccessor':
      return value * qx;
    case 'milliseconds':
    case 'millisecond':
    case 'msecs':
    case 'msec':
    case 'ms':
      return value;
    default:
      // Unknown unit
      return;
  }
}

module.exports = parseDurationStringToMilliseconds;