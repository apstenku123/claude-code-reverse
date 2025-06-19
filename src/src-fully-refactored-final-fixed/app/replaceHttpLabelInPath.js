/**
 * Replaces an HTTP label placeholder in a path string with a provided value, after validating its presence and non-emptiness.
 *
 * @param {string} pathTemplate - The path template containing a placeholder to be replaced (e.g., '/users/{userId}').
 * @param {object} labelValues - An object containing possible label values keyed by label name.
 * @param {string} labelName - The name of the label to replace in the path (e.g., 'userId').
 * @param {function} getLabelValue - Function that returns the value to insert for the label (should return a string).
 * @param {RegExp} labelPattern - Regular expression matching the label placeholder in the path (e.g., /\{userId\}/g).
 * @param {boolean} splitAndEncode - If true, splits the label value by '/', encodes each part, and joins them back; otherwise, encodes the whole value.
 * @returns {string} The path with the label placeholder replaced by the encoded value.
 * @throws {Error} If the label value is missing or empty.
 */
function replaceHttpLabelInPath(
  pathTemplate,
  labelValues,
  labelName,
  getLabelValue,
  labelPattern,
  splitAndEncode
) {
  // Check if the label value exists in the provided object and is not undefined
  if (labelValues != null && labelValues[labelName] !== undefined) {
    const labelValue = getLabelValue();
    // Ensure the label value is not empty
    if (labelValue.length <= 0) {
      throw new Error(
        `Empty value provided for input HTTP label: ${labelName}.`
      );
    }
    // Replace the label placeholder in the path with the encoded value
    const encodedValue = splitAndEncode
      ? labelValue
          .split("/")
          .map(part => QP1(part))
          .join("/")
      : QP1(labelValue);
    pathTemplate = pathTemplate.replace(labelPattern, encodedValue);
  } else {
    throw new Error(
      `No value provided for input HTTP label: ${labelName}.`
    );
  }
  return pathTemplate;
}

module.exports = replaceHttpLabelInPath;