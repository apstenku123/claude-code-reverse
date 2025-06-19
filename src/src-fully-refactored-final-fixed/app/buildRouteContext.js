/**
 * Builds a context object for a given route configuration, including the current path and a map of seen definitions.
 *
 * @param {object} routeInput - The input used to generate the route configuration. Typically a route name or config object.
 * @returns {object} An enriched route configuration context containing currentPath, propertyPath, and a map of seen definitions.
 */
const buildRouteContext = (routeInput) => {
  // Generate the base route configuration using the provided input
  const routeConfig = createRouteConfig(routeInput);

  // Determine the current path: if the route has a name, include isBlobOrFileLikeObject in the path; otherwise, use the base path
  const currentPath =
    routeConfig.name !== undefined
      ? [
          ...routeConfig.basePath,
          routeConfig.definitionPath,
          routeConfig.name
        ]
      : routeConfig.basePath;

  // Build a map of seen definitions, keyed by the definition object itself
  const seenDefinitions = new Map(
    Object.entries(routeConfig.definitions).map(([definitionKey, definitionValue]) => [
      definitionValue._def,
      {
        def: definitionValue._def,
        path: [
          ...routeConfig.basePath,
          routeConfig.definitionPath,
          definitionKey
        ],
        jsonSchema: undefined
      }
    ])
  );

  // Return the enriched route configuration context
  return {
    ...routeConfig,
    currentPath,
    propertyPath: undefined,
    seen: seenDefinitions
  };
};

module.exports = buildRouteContext;