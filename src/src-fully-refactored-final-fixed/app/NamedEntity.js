/**
 * Represents a named entity with configurable options.
 * Validates the provided name and options, and initializes instance properties.
 *
 * @class NamedEntity
 * @param {string} entityName - The name of the entity. Must be a string.
 * @param {Object} [options] - Optional configuration object for the entity.
 * @throws {TypeError} If entityName is not a string.
 * @throws {TypeError} If options is provided but is not an object.
 */
function NamedEntity(entityName, options) {
  // Validate that the entity name is a string
  if (!kZ1.isString(entityName)) {
    throw new TypeError("name must be a string");
  }

  // If options are provided, validate that they are an object
  if (options && !kZ1.isObject(options)) {
    throw new TypeError("options must be an object");
  }

  // Assign options (may be undefined)
  this.options = options;
  // Will hold parsed options after processing (if any)
  this.parsedOptions = null;
  // Store the entity name
  this.name = entityName;
  // Reference to parent entity, if any
  this.parent = null;
  // Indicates if the entity has been resolved
  this.resolved = false;
  // Optional comment for the entity
  this.comment = null;
  // Filename associated with the entity, if any
  this.filename = null;
}

module.exports = NamedEntity;