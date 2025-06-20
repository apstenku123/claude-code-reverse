/**
 * Checks if Node.js was built with full ICU (International Components for Unicode) support.
 * If so, and if the Spanish locale is available and working, returns the default locale and timezone.
 *
 * @returns {{ locale: string, timezone: string } | undefined} An object with the default locale and timezone, or undefined if ICU is not supported or Spanish locale is not available.
 */
function getDefaultLocaleAndTimezoneIfICUSupported() {
  try {
    // Check if ICU data is available in the current Node.js process
    if (typeof process.versions.icu !== "string") {
      return;
    }

    // Use a fixed date to test Spanish month formatting
    const testDate = new Date(900000000);
    const spanishMonth = new Intl.DateTimeFormat("es", { month: "long" }).format(testDate);

    // If the formatted month in Spanish is 'enero', ICU and Spanish locale are working
    if (spanishMonth === "enero") {
      const resolvedOptions = Intl.DateTimeFormat().resolvedOptions();
      return {
        locale: resolvedOptions.locale,
        timezone: resolvedOptions.timeZone
      };
    }
  } catch (error) {
    // Silently ignore any errors
  }
  return;
}

module.exports = getDefaultLocaleAndTimezoneIfICUSupported;