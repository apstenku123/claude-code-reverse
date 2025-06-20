/**
 * Registers a new type instance in the global type registry.
 * Ensures the type definition is valid and not already registered.
 * If there are pending callbacks for this type, executes them after registration.
 *
 * @param {number} typeId - The unique positive integer identifier for the type.
 * @param {Object} typeDefinition - The type definition object. Must have an 'argPackAdvance' property and a 'name' property.
 * @param {Object} [options={}] - Optional configuration object. If 'options.ta' is truthy, duplicate registration is ignored.
 * @throws {TypeError} If the type definition does not have 'argPackAdvance'.
 * @throws {Error} If the typeId is invalid or the type is already registered (unless options.ta is set).
 */
function registerTypeInstance(typeId, typeDefinition, options = {}) {
  // Ensure the type definition has the required 'argPackAdvance' property
  if (!('argPackAdvance' in typeDefinition)) {
    throw TypeError("registerType registeredInstance requires argPackAdvance");
  }

  const typeName = typeDefinition.name;

  // Validate typeId and check for duplicate registration
  if (!typeId) {
    // B1 is assumed to be an error handler/logger
    B1(`type \"${typeName}\" must have a positive integer typeid pointer`);
  } else if (typeRegistry.hasOwnProperty(typeId)) {
    // If 'ta' option is set, silently ignore duplicate registration
    if (options.ta) return;
    B1(`Cannot register type '\"${typeName}\"' twice`);
  }

  // Register the type
  typeRegistry[typeId] = typeDefinition;

  // Remove any pending deletion for this type
  delete pendingTypeDeletions[typeId];

  // If there are pending callbacks for this type, execute them and clean up
  if (pendingTypeCallbacks.hasOwnProperty(typeId)) {
    const callbacks = pendingTypeCallbacks[typeId];
    delete pendingTypeCallbacks[typeId];
    callbacks.forEach(callback => callback());
  }
}

// Export the function for use in other modules
module.exports = registerTypeInstance;