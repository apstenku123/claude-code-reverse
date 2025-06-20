/**
 * Retrieves the primary value if available; otherwise, retrieves the secondary value.
 *
 * This function attempts to obtain a value from the primary source (LW2). If the primary source returns a falsy value,
 * isBlobOrFileLikeObject falls back to the secondary source (TW2).
 *
 * @returns {any} The value from the primary source if available; otherwise, the value from the secondary source.
 */
function getPrimaryOrSecondaryValue() {
  // Attempt to get the value from the primary source
  // If the primary source returns a falsy value, fallback to the secondary source
  return LW2() || TW2();
}

module.exports = getPrimaryOrSecondaryValue;