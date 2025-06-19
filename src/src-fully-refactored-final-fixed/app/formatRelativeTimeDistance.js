/**
 * Formats the distance between two dates as a human-readable relative time string (e.g., 'about 1 hour ago').
 *
 * @param {Date|number} dateLeft - The earlier or later date (depending on comparison).
 * @param {Date|number} dateRight - The other date to compare against.
 * @param {Object} [options] - Optional configuration object.
 * @param {boolean} [options.addSuffix] - Whether to add a suffix like 'ago' or 'in'.
 * @param {boolean} [options.includeSeconds] - Whether to include seconds in formatting for short durations.
 * @param {string} [options.locale] - Locale object for formatting.
 * @param {string} [options.in] - Optional direction for comparison.
 * @returns {string} Human-readable relative time string.
 */
function formatRelativeTimeDistance(dateLeft, dateRight, options) {
  // Get default locale from nT2(), fallback to NAA if not provided
  const defaultLocale = nT2();
  const locale = options?.locale ?? defaultLocale.locale ?? NAA;
  const MINUTES_IN_42_HOURS = 2520; // 42 * 60

  // Calculate the difference in milliseconds between the two dates
  const comparison = cu(dateLeft, dateRight);
  if (isNaN(comparison)) {
    throw new RangeError("Invalid time value");
  }

  // Prepare options for formatting
  const formatOptions = Object.assign({}, options, {
    addSuffix: options?.addSuffix,
    comparison
  });

  // Determine the order of dates for formatting
  const [startDate, endDate] = pu(options?.in, ...(comparison > 0 ? [dateRight, dateLeft] : [dateLeft, dateRight]));

  // Calculate the difference in seconds and minutes
  const secondsDifference = (getMillisecondsSinceUtcMidnight(endDate) - getMillisecondsSinceUtcMidnight(startDate)) / 1000;
  const roundedSeconds = getRoundedObservableDuration(endDate, startDate);
  const minutesDifference = Math.round((roundedSeconds - secondsDifference) / 60);

  let monthsDifference;

  // Handle durations less than 2 minutes
  if (minutesDifference < 2) {
    if (options?.includeSeconds) {
      if (roundedSeconds < 5) {
        return locale.formatDistance("lessThanXSeconds", 5, formatOptions);
      } else if (roundedSeconds < 10) {
        return locale.formatDistance("lessThanXSeconds", 10, formatOptions);
      } else if (roundedSeconds < 20) {
        return locale.formatDistance("lessThanXSeconds", 20, formatOptions);
      } else if (roundedSeconds < 40) {
        return locale.formatDistance("halfAMinute", 0, formatOptions);
      } else if (roundedSeconds < 60) {
        return locale.formatDistance("lessThanXMinutes", 1, formatOptions);
      } else {
        return locale.formatDistance("xMinutes", 1, formatOptions);
      }
    } else if (minutesDifference === 0) {
      return locale.formatDistance("lessThanXMinutes", 1, formatOptions);
    } else {
      return locale.formatDistance("xMinutes", minutesDifference, formatOptions);
    }
  }

  // Handle durations less than 45 minutes
  if (minutesDifference < 45) {
    return locale.formatDistance("xMinutes", minutesDifference, formatOptions);
  }

  // Handle durations less than 90 minutes
  if (minutesDifference < 90) {
    return locale.formatDistance("aboutXHours", 1, formatOptions);
  }

  // wAA: Minutes in an hour (should be 60)
  if (minutesDifference < wAA) {
    const hours = Math.round(minutesDifference / 60);
    return locale.formatDistance("aboutXHours", hours, formatOptions);
  }

  // Handle durations less than 42 hours (2520 minutes)
  if (minutesDifference < MINUTES_IN_42_HOURS) {
    return locale.formatDistance("xDays", 1, formatOptions);
  }

  // WA1: Minutes in a day (should be 1440)
  if (minutesDifference < WA1) {
    const days = Math.round(minutesDifference / wAA);
    return locale.formatDistance("xDays", days, formatOptions);
  }

  // Handle durations less than 2 months
  if (minutesDifference < WA1 * 2) {
    const approxMonths = Math.round(minutesDifference / WA1);
    return locale.formatDistance("aboutXMonths", approxMonths, formatOptions);
  }

  // Calculate the number of months difference
  monthsDifference = calculatePeriodOffset(endDate, startDate);

  // Handle durations less than a year
  if (monthsDifference < 12) {
    const months = Math.round(minutesDifference / WA1);
    return locale.formatDistance("xMonths", months, formatOptions);
  } else {
    // Handle durations of a year or more
    const remainingMonths = monthsDifference % 12;
    const years = Math.trunc(monthsDifference / 12);
    if (remainingMonths < 3) {
      return locale.formatDistance("aboutXYears", years, formatOptions);
    } else if (remainingMonths < 9) {
      return locale.formatDistance("overXYears", years, formatOptions);
    } else {
      return locale.formatDistance("almostXYears", years + 1, formatOptions);
    }
  }
}

module.exports = formatRelativeTimeDistance;