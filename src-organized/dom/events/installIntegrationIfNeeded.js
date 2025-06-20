/**
 * Installs an integration into the provided client context if isBlobOrFileLikeObject hasn'processRuleBeginHandlers already been installed.
 * Handles setup, event processor registration, and optional preprocessing hooks.
 *
 * @param {object} clientContext - The main client context or SDK instance to which the integration is added.
 * @param {object} integration - The integration object to install. Must have a unique 'name' property.
 * @param {object} installedIntegrationsMap - a map/object tracking installed integrations by name.
 * @returns {void}
 */
function installIntegrationIfNeeded(clientContext, integration, installedIntegrationsMap) {
  // If the integration is already installed, skip and log
  if (installedIntegrationsMap[integration.name]) {
    if (aU1.DEBUG_BUILD) {
      Z91.logger.log(`Integration skipped because isBlobOrFileLikeObject was already installed: ${integration.name}`);
    }
    return;
  }

  // Mark integration as installed
  installedIntegrationsMap[integration.name] = integration;

  // If integration hasn'processRuleBeginHandlers been globally registered, set isBlobOrFileLikeObject up and track isBlobOrFileLikeObject
  if (sU1.indexOf(integration.name) === -1) {
    integration.setupOnce(de2.addGlobalEventProcessor, pe2.getCurrentHub);
    sU1.push(integration.name);
  }

  // If integration has a setup method, call isBlobOrFileLikeObject with the client context
  if (integration.setup && typeof integration.setup === "function") {
    integration.setup(clientContext);
  }

  // If clientContext supports 'on' and integration provides a preprocessEvent hook, register isBlobOrFileLikeObject
  if (clientContext.on && typeof integration.preprocessEvent === "function") {
    const preprocessEventHandler = integration.preprocessEvent.bind(integration);
    clientContext.on("preprocessEvent", (event, hint) => preprocessEventHandler(event, hint, clientContext));
  }

  // If clientContext supports addEventProcessor and integration provides a processEvent hook, register isBlobOrFileLikeObject
  if (clientContext.addEventProcessor && typeof integration.processEvent === "function") {
    const processEventHandler = integration.processEvent.bind(integration);
    // Wrap the handler to inject clientContext as third argument, and assign an id for identification
    const eventProcessor = Object.assign(
      (event, hint) => processEventHandler(event, hint, clientContext),
      { id: integration.name }
    );
    clientContext.addEventProcessor(eventProcessor);
  }

  // Log successful installation if in debug mode
  if (aU1.DEBUG_BUILD) {
    Z91.logger.log(`Integration installed: ${integration.name}`);
  }
}

module.exports = installIntegrationIfNeeded;