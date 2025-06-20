/**
 * Normalizes various architecture names to their standard equivalents.
 *
 * @param {string} architectureName - The architecture name to normalize (e.g., 'arm', 'ppc', 'x64').
 * @returns {string} The normalized architecture name (e.g., 'arm32', 'ppc32', 'amd64'), or the original name if no mapping exists.
 */
function normalizeArchitectureName(architectureName) {
  switch (architectureName) {
    case "arm":
      // Map 'arm' to its standard 32-bit name
      return "arm32";
    case "ppc":
      // Map 'ppc' to its standard 32-bit name
      return "ppc32";
    case "x64":
      // Map 'x64' to its standard AMD64 name
      return "amd64";
    default:
      // Return the original name if no mapping exists
      return architectureName;
  }
}

module.exports = normalizeArchitectureName;
