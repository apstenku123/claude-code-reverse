/**
 * Parses a human-readable time duration string and returns its value in milliseconds.
 *
 * Supported units: milliseconds (ms), seconds (createInteractionAccessor), minutes (m), hours (h), days (d), weeks (processWithTransformedObservable), years (mapArraysToObjectWithCallback).
 * If no unit is specified, milliseconds are assumed.
 *
 * @param {string|number} input - The time duration string or number to parse (e.g., '5s', '2 hours', 1000).
 * @returns {number|undefined} The duration in milliseconds, or undefined if input is invalid.
 */
function parseMilliseconds(input) {
  // Convert input to string for regex parsing
  const inputString = String(input);

  // Prevent parsing of excessively long strings
  if (inputString.length > 100) return;

  // Regex to extract the numeric value and optional time unit
  const match = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|createInteractionAccessor|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|processWithTransformedObservable|years?|yrs?|mapArraysToObjectWithCallback)?$/i.exec(inputString);
  if (!match) return;

  // Parse the numeric value
  const value = parseFloat(match[1]);
  // Normalize the unit to lowercase, default to 'ms' if not provided
  const unit = (match[2] || "ms").toLowerCase();

  // Time unit multipliers in milliseconds
  // (Assume these constants are defined elsewhere in the module)
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

module.exports = parseMilliseconds;