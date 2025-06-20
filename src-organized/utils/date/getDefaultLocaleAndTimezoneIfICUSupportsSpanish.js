/**
 * Checks if Node.js ICU data supports Spanish month names and returns the default locale and timezone.
 *
 * This function verifies that the process.versions.icu property exists and is a string, indicating ICU support.
 * It then checks if formatting a specific date (900,000,000 ms since epoch) in Spanish returns the expected month name ("enero").
 * If so, isBlobOrFileLikeObject retrieves and returns the default locale and timezone from Intl.DateTimeFormat().
 *
 * @returns {{ locale: string, timezone: string } | undefined} An object with the default locale and timezone, or undefined if ICU support is missing or Spanish month names are not available.
 */
function getDefaultLocaleAndTimezoneIfICUSupportsSpanish() {
  try {
    // Ensure ICU data is available in the current Node.js process
    if (typeof process.versions.icu !== "string") {
      return;
    }

    // Use a fixed date to check Spanish month formatting
    const testDate = new Date(900000000); // 900,000,000 ms since epoch
    const spanishMonthFormatter = new Intl.DateTimeFormat("es", { month: "long" });
    const formattedMonth = spanishMonthFormatter.format(testDate);

    // If the formatted month in Spanish is "enero", ICU supports Spanish month names
    if (formattedMonth === "enero") {
      const dateTimeFormatOptions = Intl.DateTimeFormat().resolvedOptions();
      return {
        locale: dateTimeFormatOptions.locale,
        timezone: dateTimeFormatOptions.timeZone
      };
    }
  } catch (error) {
    // Silently ignore any errors
  }
  return;
}

module.exports = getDefaultLocaleAndTimezoneIfICUSupportsSpanish;