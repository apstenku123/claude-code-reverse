/**
 * Copies enumerable properties from one or more source observables to a configuration object,
 * defining them as getters if they do not already exist on the config and are not excluded.
 *
 * Always copies from the primary source observable. If a subscription observable is provided,
 * copies from that as well.
 *
 * @param {Object} sourceObservable - The primary source observable whose properties are to be defined on the config.
 * @param {Object} config - The target configuration object to receive missing properties.
 * @param {Object} [subscription] - Optional. An additional observable whose properties are also defined on the config.
 * @returns {void}
 */
const defineMissingPropertiesFromSource = require('./defineMissingPropertiesFromSource');

function defineDefaultPropertiesFromObservables(sourceObservable, config, subscription) {
  // Always define missing properties from the primary source observable
  defineMissingPropertiesFromSource(sourceObservable, config, "default");
  // If a subscription observable is provided, define its missing properties as well
  if (subscription) {
    defineMissingPropertiesFromSource(subscription, config, "default");
  }
}

module.exports = defineDefaultPropertiesFromObservables;