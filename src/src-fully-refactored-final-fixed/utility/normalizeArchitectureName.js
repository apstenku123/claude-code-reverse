/**
 * Normalizes various architecture name strings to a standard set of values.
 *
 * @param {string} architectureName - The architecture name to normalize (e.g., 'x32', 'x86_64', 'arm', etc.).
 * @returns {string} The normalized architecture name. Returns 'x32', 'x64', 'arm', or 'arm64' for known values.
 * Returns 'other:<input>' for unknown but defined values, or 'unknown' if input is falsy.
 */
function normalizeArchitectureName(architectureName) {
  // Return 'x32' if input matches exactly
  if (architectureName === "x32") {
    return "x32";
  }

  // Normalize both 'x86_64' and 'x64' to 'x64'
  if (architectureName === "x86_64" || architectureName === "x64") {
    return "x64";
  }

  // Return 'arm' if input matches exactly
  if (architectureName === "arm") {
    return "arm";
  }

  // Normalize both 'aarch64' and 'arm64' to 'arm64'
  if (architectureName === "aarch64" || architectureName === "arm64") {
    return "arm64";
  }

  // For any other non-empty string, return as 'other:<input>'
  if (architectureName) {
    return `other:${architectureName}`;
  }

  // If input is falsy (null, undefined, empty), return 'unknown'
  return "unknown";
}

module.exports = normalizeArchitectureName;