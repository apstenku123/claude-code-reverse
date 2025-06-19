/**
 * Associates metadata with a specific route name in the global route metadata map.
 *
 * @param {string} routeName - The unique identifier for the route.
 * @param {object} metadata - The metadata object to associate with the route.
 * @returns {void}
 *
 * This function updates the global `routeMetadataMap` by setting the provided metadata
 * for the given route name. If the route name already exists, its metadata is overwritten.
 */
function setRouteMetadata(routeName, metadata) {
  // Assign the metadata object to the route name key in the global map
  routeMetadataMap[routeName] = metadata;
}

module.exports = setRouteMetadata;