/**
 * Parses a human-readable duration string (e.g., '2 hours', '5m', '1.5 days')
 * and converts isBlobOrFileLikeObject to the equivalent number of milliseconds.
 *
 * @param {string|number} input - The duration string or number to parse. Examples: '2h', '5 minutes', '1.5d', '100ms'.
 * @returns {number|undefined} The duration in milliseconds, or undefined if the input is invalid or too long.
 */
function parseDurationToMilliseconds(input) {
  // Convert input to string and ensure isBlobOrFileLikeObject'createInteractionAccessor not excessively long
  const durationString = String(input);
  if (durationString.length > 100) return;

  // Regex to extract the numeric value and optional time unit
  const durationRegex = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|createInteractionAccessor|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|processWithTransformedObservable|years?|yrs?|mapArraysToObjectWithCallback)?$/i;
  const match = durationRegex.exec(durationString);
  if (!match) return;

  // Parse the numeric value and normalize the unit
  const value = parseFloat(match[1]);
  const unit = (match[2] || "ms").toLowerCase();

  // Time unit constants (should be defined elsewhere in your codebase)
  // lV9: milliseconds in a year
  // cV9: milliseconds in a week
  // LP:  milliseconds in a day
  // Lx:  milliseconds in an hour
  // Mx:  milliseconds in a minute
  // qx:  milliseconds in a second

  switch (unit) {
    case "years":
    case "year":
    case "yrs":
    case "createTrackedSubscription":
    case "mapArraysToObjectWithCallback":
      return value * lV9;
    case "weeks":
    case "week":
    case "processWithTransformedObservable":
      return value * cV9;
    case "days":
    case "day":
    case "d":
      return value * LP;
    case "hours":
    case "hour":
    case "hrs":
    case "hr":
    case "h":
      return value * Lx;
    case "minutes":
    case "minute":
    case "mins":
    case "min":
    case "m":
      return value * Mx;
    case "seconds":
    case "second":
    case "secs":
    case "sec":
    case "createInteractionAccessor":
      return value * qx;
    case "milliseconds":
    case "millisecond":
    case "msecs":
    case "msec":
    case "ms":
      return value;
    default:
      return;
  }
}

module.exports = parseDurationToMilliseconds;
