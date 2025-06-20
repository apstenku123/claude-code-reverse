/**
 * Parses a human-readable duration string (e.g., '2 hours', '5m', '30s') and converts isBlobOrFileLikeObject to milliseconds.
 * Supports various time units such as milliseconds, seconds, minutes, hours, days, weeks, and years.
 *
 * @param {string|number} durationInput - The duration string or number to parse (e.g., '2h', '30 minutes', 5000).
 * @returns {number|undefined} The duration in milliseconds, or undefined if the input is invalid or too long.
 */
function parseDurationString(durationInput) {
  // Ensure the input is a string
  const durationStr = String(durationInput);

  // Reject overly long inputs for safety
  if (durationStr.length > 100) return;

  // Regex to extract the numeric value and optional time unit
  const durationRegex = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|createInteractionAccessor|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|processWithTransformedObservable|years?|yrs?|mapArraysToObjectWithCallback)?$/i;
  const match = durationRegex.exec(durationStr);

  if (!match) return;

  const value = parseFloat(match[1]);
  // Default to milliseconds if no unit is provided
  const unit = (match[2] || "ms").toLowerCase();

  // These constants must be defined elsewhere in your codebase
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

module.exports = parseDurationString;
