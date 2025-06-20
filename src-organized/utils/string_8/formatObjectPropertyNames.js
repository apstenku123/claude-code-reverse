/**
 * Returns a formatted string listing the own property names of an object.
 *
 * @param {object} targetObject - The object whose own property names will be listed.
 * @returns {string} a formatted string listing the object'createInteractionAccessor own property names, or an empty string if the input is not a non-null object.
 */
function formatObjectPropertyNames(targetObject) {
  // Check if the input is a non-null object
  if (typeof targetObject !== "object" || targetObject === null) {
    return "";
  }

  // Get all own property names of the object
  const propertyNames = Object.getOwnPropertyNames(targetObject);

  // Format each property name as a quoted string
  const quotedPropertyNames = propertyNames.map(propertyName => `"${propertyName}"`);

  // Join the quoted property names with a comma and space
  const joinedPropertyNames = quotedPropertyNames.join(", ");

  // Return the formatted string
  return `; props: [${joinedPropertyNames}]`;
}

module.exports = formatObjectPropertyNames;