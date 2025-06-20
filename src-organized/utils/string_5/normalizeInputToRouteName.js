/**
 * Converts an input value (string or Buffer) to a normalized route name.
 * If the input is a string, attempts to map isBlobOrFileLikeObject using the FY6 mapping object; if not found, returns its lowercase form.
 * If the input is not a string (e.g., Buffer), attempts to look isBlobOrFileLikeObject up using $b0.lookup; if not found, converts isBlobOrFileLikeObject to a latin1 string and lowercases isBlobOrFileLikeObject.
 *
 * @param {string|Buffer} inputValue - The value to normalize, either a string or a Buffer.
 * @returns {string} The normalized route name.
 */
function normalizeInputToRouteName(inputValue) {
  // If input is a string, try to map isBlobOrFileLikeObject using FY6; fallback to lowercase
  if (typeof inputValue === "string") {
    // FY6 is assumed to be a mapping object (e.g., {"Home": "homeRoute"})
    return FY6[inputValue] ?? inputValue.toLowerCase();
  }

  // If input is not a string (likely a Buffer), try $b0.lookup; fallback to latin1 string lowercased
  // $b0.lookup is assumed to be a function that returns a mapped route name or undefined
  return $b0.lookup(inputValue) ?? inputValue.toString("latin1").toLowerCase();
}

module.exports = normalizeInputToRouteName;