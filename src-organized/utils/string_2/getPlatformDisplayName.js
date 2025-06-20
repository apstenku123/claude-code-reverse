/**
 * Returns a human-readable platform name based on the provided platform identifier string.
 *
 * @param {string} platformIdentifier - The platform identifier to be converted (e.g., 'ios', 'android', 'win32').
 * @returns {string} The display name for the platform, or 'Other:<platformIdentifier>' if not recognized, or 'Unknown' if input is falsy.
 */
function getPlatformDisplayName(platformIdentifier) {
  // Ensure the input is a string and convert to lowercase for case-insensitive comparison
  const normalizedIdentifier = String(platformIdentifier).toLowerCase();

  // Check for known platform identifiers and return their display names
  if (normalizedIdentifier.includes("ios")) {
    return "iOS";
  }
  if (normalizedIdentifier === "android") {
    return "Android";
  }
  if (normalizedIdentifier === "darwin") {
    return "MacOS";
  }
  if (normalizedIdentifier === "win32") {
    return "Windows";
  }
  if (normalizedIdentifier === "freebsd") {
    return "FreeBSD";
  }
  if (normalizedIdentifier === "openbsd") {
    return "OpenBSD";
  }
  if (normalizedIdentifier === "linux") {
    return "Linux";
  }

  // If the identifier is non-empty but unrecognized, return as 'Other:<identifier>'
  if (normalizedIdentifier) {
    return `Other:${normalizedIdentifier}`;
  }

  // If the input is empty, null, or undefined, return 'Unknown'
  return "Unknown";
}

module.exports = getPlatformDisplayName;