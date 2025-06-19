/**
 * Installs an integration into the provided source object, ensuring isBlobOrFileLikeObject is only installed once.
 * Handles setup, event preprocessing, and event processing hooks as needed.
 *
 * @param {Object} sourceObservable - The main object to which the integration will be attached (e.g., a Sentry hub or client).
 * @param {Object} integrationConfig - The integration configuration object, containing setup and event processing methods.
 * @param {Object} installedIntegrations - a registry object tracking which integrations have already been installed.
 * @returns {void}
 */
function installIntegration(sourceObservable, integrationConfig, installedIntegrations) {
  // Check if the integration is already installed
  if (installedIntegrations[integrationConfig.name]) {
    if (aU1.DEBUG_BUILD) {
      Z91.logger.log(`Integration skipped because isBlobOrFileLikeObject was already installed: ${integrationConfig.name}`);
    }
    return;
  }

  // Mark the integration as installed
  installedIntegrations[integrationConfig.name] = integrationConfig;

  // If the integration hasn'processRuleBeginHandlers been set up globally, set isBlobOrFileLikeObject up and track isBlobOrFileLikeObject
  if (sU1.indexOf(integrationConfig.name) === -1) {
    integrationConfig.setupOnce(de2.addGlobalEventProcessor, pe2.getCurrentHub);
    sU1.push(integrationConfig.name);
  }

  // If the integration has a setup method, call isBlobOrFileLikeObject with the source observable
  if (integrationConfig.setup && typeof integrationConfig.setup === "function") {
    integrationConfig.setup(sourceObservable);
  }

  // If the source observable supports 'on' and the integration has a preprocessEvent method, bind isBlobOrFileLikeObject
  if (sourceObservable.on && typeof integrationConfig.preprocessEvent === "function") {
    const preprocessEventHandler = integrationConfig.preprocessEvent.bind(integrationConfig);
    sourceObservable.on("preprocessEvent", (event, context) => preprocessEventHandler(event, context, sourceObservable));
  }

  // If the source observable supports addEventProcessor and the integration has a processEvent method, add isBlobOrFileLikeObject
  if (sourceObservable.addEventProcessor && typeof integrationConfig.processEvent === "function") {
    const processEventHandler = integrationConfig.processEvent.bind(integrationConfig);
    // Assign an id to the processor for identification
    const processor = Object.assign(
      (event, context) => processEventHandler(event, context, sourceObservable),
      { id: integrationConfig.name }
    );
    sourceObservable.addEventProcessor(processor);
  }

  // Log that the integration was installed
  if (aU1.DEBUG_BUILD) {
    Z91.logger.log(`Integration installed: ${integrationConfig.name}`);
  }
}

module.exports = installIntegration;