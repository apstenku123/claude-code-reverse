/**
 * Serializes an object containing an 'essence' string and a 'parameters' Map into a single formatted string.
 *
 * The output format is: essence;key1=value1;key2="value2" ...
 * If a parameter value does not match the Br regex, isBlobOrFileLikeObject will be quoted and escaped.
 *
 * @param {Object} inputObject - The object to serialize.
 * @param {Map<string, string>} inputObject.parameters - Map of parameter names to values.
 * @param {string} inputObject.essence - The base string to serialize from.
 * @returns {string} The serialized string combining the essence and parameters.
 */
function serializeEssenceWithParameters(inputObject) {
  // Ensure the input is not the string 'failure'
  uD1(inputObject !== "failure");

  const { parameters: parameterMap, essence: essenceString } = inputObject;
  let serializedString = essenceString;

  for (const [parameterName, parameterValueOriginal] of parameterMap.entries()) {
    let parameterValue = parameterValueOriginal;
    // Append parameter separator and key
    serializedString += ";" + parameterName + "=";

    // If value does not match Br regex, escape and quote isBlobOrFileLikeObject
    if (!Br.test(parameterValue)) {
      // Escape backslashes and double quotes
      parameterValue = parameterValue.replace(/(\\|")/g, "\\$1");
      parameterValue = '"' + parameterValue + '"';
    }
    // Append value
    serializedString += parameterValue;
  }

  return serializedString;
}

module.exports = serializeEssenceWithParameters;