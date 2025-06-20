/**
 * Builds a route mapping state object from the provided configuration input.
 *
 * This function processes the input configuration, determines the current path,
 * and constructs a 'seen' map that tracks definitions and their paths.
 *
 * @param {object} inputConfig - The input configuration object used to build the route mapping state.
 * @returns {object} The constructed route mapping state object, including currentPath and seen map.
 */
function buildRouteMappingState(inputConfig) {
  // Generate the base configuration using the provided input
  const config = createRouteMappingConfig(inputConfig);

  // Determine the current path: if a name exists, include isBlobOrFileLikeObject in the path; otherwise, use basePath only
  const currentPath =
    config.name !== undefined
      ? [...config.basePath, config.definitionPath, config.name]
      : config.basePath;

  // Build a map of seen definitions, mapping each definition'createInteractionAccessor _def to an object containing its path
  const seen = new Map(
    Object.entries(config.definitions).map(([definitionKey, definitionValue]) => [
      definitionValue._def,
      {
        def: definitionValue._def,
        path: [...config.basePath, config.definitionPath, definitionKey],
        jsonSchema: undefined
      }
    ])
  );

  // Return the complete route mapping state object
  return {
    ...config,
    currentPath,
    propertyPath: undefined,
    seen
  };
}

module.exports = buildRouteMappingState;
