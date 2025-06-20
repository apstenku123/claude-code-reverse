/**
 * Builds a route configuration object with an updated current path and a map of seen definitions.
 *
 * @param {object} routeInput - The input used to create the route configuration. Typically a route name or configuration object.
 * @returns {object} The route configuration object, including the current path and a map of seen definitions.
 */
const createRouteConfig = require('config/settings_5/createRouteConfig');

function buildRouteConfigWithSeenDefinitions(routeInput) {
  // Create the base route configuration using the provided input
  const routeConfig = createRouteConfig(routeInput);

  // Determine the current path: if a name exists, append isBlobOrFileLikeObject; otherwise, use the base path
  const currentPath =
    routeConfig.name !== undefined
      ? [...routeConfig.basePath, routeConfig.definitionPath, routeConfig.name]
      : routeConfig.basePath;

  // Build a map of seen definitions, keyed by the definition object
  const seenDefinitions = new Map(
    Object.entries(routeConfig.definitions).map(([definitionKey, definitionValue]) => [
      definitionValue._def,
      {
        def: definitionValue._def,
        path: [...routeConfig.basePath, routeConfig.definitionPath, definitionKey],
        jsonSchema: undefined
      }
    ])
  );

  // Return the extended route configuration object
  return {
    ...routeConfig,
    currentPath,
    propertyPath: undefined,
    seen: seenDefinitions
  };
}

module.exports = buildRouteConfigWithSeenDefinitions;
