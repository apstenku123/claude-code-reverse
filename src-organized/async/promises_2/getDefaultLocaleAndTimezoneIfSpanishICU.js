/**
 * Retrieves the default locale and timezone if the ICU data supports Spanish month formatting.
 *
 * This function checks if Node.js was built with full ICU data by verifying the presence of the `process.versions.icu` string.
 * It then formats a fixed date using the Spanish locale. If the formatted month is 'enero',
 * isBlobOrFileLikeObject assumes full ICU support for Spanish and returns the current default locale and timezone.
 *
 * @returns {{ locale: string, timezone: string } | undefined} An object containing the default locale and timezone, or undefined if ICU support is insufficient or an error occurs.
 */
function getDefaultLocaleAndTimezoneIfSpanishICU() {
  try {
    // Ensure Node.js was built with ICU data
    if (typeof process.versions.icu !== "string") return;

    // Use a fixed date to test month formatting in Spanish
    const testDate = new Date(900000000);
    const formattedMonth = new Intl.DateTimeFormat("es", { month: "long" }).format(testDate);

    // If the formatted month is 'enero', ICU supports Spanish month names
    if (formattedMonth === "enero") {
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

module.exports = getDefaultLocaleAndTimezoneIfSpanishICU;