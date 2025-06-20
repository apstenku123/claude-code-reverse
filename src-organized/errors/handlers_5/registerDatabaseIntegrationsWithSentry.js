/**
 * Registers available database integrations with the Sentry carrier if present.
 *
 * This function checks the main Sentry carrier for the __SENTRY__ property. If present, isBlobOrFileLikeObject attempts to dynamically load
 * and instantiate supported database integrations (MongoDB, Mongoose, MySQL, PostgreSQL) if their modules are available.
 * Successfully loaded integrations are appended to the carrier'createInteractionAccessor integrations array.
 *
 * @returns {void} No return value.
 */
function registerDatabaseIntegrationsWithSentry() {
  // Retrieve the main Sentry carrier (global context for Sentry integrations)
  const mainCarrier = oIA.getMainCarrier();

  // If the carrier does not have Sentry initialized, exit early
  if (!mainCarrier.__SENTRY__) return;

  // Map of supported database integrations and their dynamic import logic
  const integrationFactories = {
    mongodb() {
      // Dynamically require the Mongo integration
      return new (Zx.dynamicRequire(yc, "./node/integrations/mongo").Mongo)();
    },
    mongoose() {
      // Dynamically require the Mongo integration (used for Mongoose as well)
      return new (Zx.dynamicRequire(yc, "./node/integrations/mongo").Mongo)();
    },
    mysql() {
      // Dynamically require the MySQL integration
      return new (Zx.dynamicRequire(yc, "./node/integrations/mysql").Mysql)();
    },
    pg() {
      // Dynamically require the Postgres integration
      return new (Zx.dynamicRequire(yc, "./node/integrations/postgres").Postgres)();
    }
  };

  // Filter for integrations whose modules are available, instantiate them, and filter out any failed instantiations
  const availableIntegrations = Object.keys(integrationFactories)
    .filter(integrationName => !!Zx.loadModule(integrationName))
    .map(integrationName => {
      try {
        // Attempt to instantiate the integration
        return integrationFactories[integrationName]();
      } catch (error) {
        // If instantiation fails, skip this integration
        return undefined;
      }
    })
    .filter(Boolean); // Remove undefined values

  // If any integrations were successfully loaded, append them to the carrier'createInteractionAccessor integrations array
  if (availableIntegrations.length > 0) {
    mainCarrier.__SENTRY__.integrations = [
      ...(mainCarrier.__SENTRY__.integrations || []),
      ...availableIntegrations
    ];
  }
}

module.exports = registerDatabaseIntegrationsWithSentry;