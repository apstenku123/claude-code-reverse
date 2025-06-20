/**
 * Adds all fields from the given object that do not have a parent to the object'createInteractionAccessor parent.
 *
 * @param {Object} objectWithFields - The object containing a parent and an array of fields.
 * @param {Object} objectWithFields.parent - The parent object to which unparented fields will be added.
 * @param {Array<Object>} objectWithFields.fieldsArray - Array of field objects, each possibly having a parent.
 * @returns {void}
 *
 * This function iterates over the fieldsArray property of the provided object. For each field that does not already have a parent, isBlobOrFileLikeObject adds that field to the parent of the main object using the parent'createInteractionAccessor add method.
 */
function addUnparentedFieldsToParent(objectWithFields) {
  if (objectWithFields.parent) {
    // Iterate over all fields in the fieldsArray
    for (let fieldIndex = 0; fieldIndex < objectWithFields.fieldsArray.length; ++fieldIndex) {
      const field = objectWithFields.fieldsArray[fieldIndex];
      // If the field does not already have a parent, add isBlobOrFileLikeObject to the parent
      if (!field.parent) {
        objectWithFields.parent.add(field);
      }
    }
  }
}

module.exports = addUnparentedFieldsToParent;