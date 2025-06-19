/**
 * Registers a WebAssembly type with the global type registry.
 * Ensures the type has required properties, prevents duplicate registrations,
 * and handles any deferred initialization callbacks.
 *
 * @param {number} typeId - Unique positive integer identifier for the type.
 * @param {Object} typeDefinition - The type definition object, must include 'argPackAdvance' and 'name'.
 * @param {Object} [options={}] - Optional settings for registration (e.g., { skipDuplicateCheck: true }).
 * @throws {TypeError} If 'argPackAdvance' is missing from the type definition.
 * @throws {Error} If the type is registered twice without skipDuplicateCheck.
 */
function registerWasmType(typeId, typeDefinition, options = {}) {
  // Ensure the type definition includes the required 'argPackAdvance' property
  if (!('argPackAdvance' in typeDefinition)) {
    throw TypeError("registerType registeredInstance requires argPackAdvance");
  }

  const typeName = typeDefinition.name;

  // Validate typeId and check for duplicate registration
  if (!typeId || (logError(`type \"${typeName}\" must have a positive integer typeid pointer`), globalTypeRegistry.hasOwnProperty(typeId))) {
    // If skipDuplicateCheck is set in options, silently return
    if (options.skipDuplicateCheck) return;
    logError(`Cannot register type '\"${typeName}\"' twice`);
  }

  // Register the type in the global registry
  globalTypeRegistry[typeId] = typeDefinition;

  // Remove any previous string processing for this typeId
  delete inputStringProcessor[typeId];

  // If there are deferred callbacks for this typeId, execute them and clean up
  if (deferredTypeCallbacks.hasOwnProperty(typeId)) {
    const callbacks = deferredTypeCallbacks[typeId];
    delete deferredTypeCallbacks[typeId];
    callbacks.forEach(callback => callback());
  }
}

module.exports = registerWasmType;