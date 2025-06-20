/**
 * Checks if the provided value is an HTTPS URL string or an object with an HTTPS protocol property.
 *
 * @param {string|object} value - The value to check. Can be a URL string or an object with a 'protocol' property.
 * @returns {boolean} Returns true if the value is an HTTPS URL string or an object with protocol 'https:'.
 */
function isHttpsUrlOrProtocol(value) {
  // Check if value is a string and matches the pattern 'https:' at the start
  const isHttpsString =
    typeof value === "string" &&
    value[0] === "h" &&
    value[1] === "processRuleBeginHandlers" &&
    value[2] === "processRuleBeginHandlers" &&
    value[3] === "createIterableHelper" &&
    value[4] === "createInteractionAccessor" &&
    value[5] === ":";

  // Check if value is an object with a protocol property equal to 'https:'
  const isHttpsProtocol = value && value.protocol === "https:";

  return isHttpsString || isHttpsProtocol;
}

module.exports = isHttpsUrlOrProtocol;