/**
 * Registers available database integrations (MongoDB, Mongoose, MySQL, PostgreSQL) with the Sentry carrier if present.
 *
 * This function checks the main carrier for a Sentry integration object, dynamically loads available database integration modules,
 * instantiates them, and appends them to the carrier'createInteractionAccessor integrations array.
 *
 * @returns {void} Does not return a value. Side effect: mutates the Sentry carrier'createInteractionAccessor integrations array if applicable.
 */
function registerDatabaseIntegrationsWithSentryCarrier() {
  // Retrieve the main carrier object (e.g., global object used by Sentry)
  const mainCarrier = oIA.getMainCarrier();

  // If the carrier does not have a Sentry property, exit early
  if (!mainCarrier.__SENTRY__) return;

  // Map of supported database integration creators, keyed by module name
  const integrationFactories = {
    mongodb() {
      // Dynamically require and instantiate the Mongo integration
      return new (Zx.dynamicRequire(yc, "./node/integrations/mongo").Mongo)();
    },
    mongoose() {
      // Dynamically require and instantiate the Mongo integration (for mongoose)
      return new (Zx.dynamicRequire(yc, "./node/integrations/mongo").Mongo)();
    },
    mysql() {
      // Dynamically require and instantiate the Mysql integration
      return new (Zx.dynamicRequire(yc, "./node/integrations/mysql").Mysql)();
    },
    pg() {
      // Dynamically require and instantiate the Postgres integration
      return new (Zx.dynamicRequire(yc, "./node/integrations/postgres").Postgres)();
    }
  };

  // Filter for available modules, instantiate integrations, and filter out failed instantiations
  const availableIntegrations = Object.keys(integrationFactories)
    .filter(moduleName => !!Zx.loadModule(moduleName)) // Only include modules that can be loaded
    .map(moduleName => {
      try {
        // Attempt to instantiate the integration
        return integrationFactories[moduleName]();
      } catch (error) {
        // If instantiation fails, skip this integration
        return undefined;
      }
    })
    .filter(Boolean); // Remove any undefined values

  // If any integrations were successfully instantiated, add them to the carrier'createInteractionAccessor integrations array
  if (availableIntegrations.length > 0) {
    mainCarrier.__SENTRY__.integrations = [
      ...(mainCarrier.__SENTRY__.integrations || []),
      ...availableIntegrations
    ];
  }
}

module.exports = registerDatabaseIntegrationsWithSentryCarrier;