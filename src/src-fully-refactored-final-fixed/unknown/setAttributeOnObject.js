/**
 * Sets a specific attribute on the given object'createInteractionAccessor attributes property.
 *
 * @param {Object} targetObject - The object whose attribute will be set. Must have an 'attributes' property (object).
 * @param {string} attributeName - The name of the attribute to set.
 * @param {*} attributeValue - The value to assign to the attribute.
 * @returns {void}
 */
const setAttributeOnObject = (targetObject, attributeName, attributeValue) => {
  // Assign the provided value to the specified attribute on the object'createInteractionAccessor attributes property
  targetObject.attributes[attributeName] = attributeValue;
};

module.exports = setAttributeOnObject;