/**
 * Selects and returns the first matching service configuration from a list, based on percentage, client hostname, and client language criteria.
 *
 * @param {Array<Object>} serviceConfigList - Array of service configuration objects to evaluate.
 * @param {number} requestPercentage - The percentage value to compare against each config'createInteractionAccessor 'percentage' property.
 * @returns {any} The 'serviceConfig' property of the first matching configuration object.
 * @throws {Error} If the input is not an array or if no matching configuration is found.
 */
function selectMatchingServiceConfig(serviceConfigList, requestPercentage) {
  if (!Array.isArray(serviceConfigList)) {
    throw new Error("Invalid service config list");
  }

  for (const configEntry of serviceConfigList) {
    // Process the config entry to extract relevant properties
    const processedConfig = validateAndNormalizeServiceConfigChoice(configEntry);

    // If a percentage is specified and the requestPercentage is greater, skip this config
    if (typeof processedConfig.percentage === "number" && requestPercentage > processedConfig.percentage) {
      continue;
    }

    // If clientHostname is specified, ensure the current hostname matches one of the allowed hostnames
    if (Array.isArray(processedConfig.clientHostname)) {
      let hostnameMatch = false;
      for (const allowedHostname of processedConfig.clientHostname) {
        if (allowedHostname === V46.hostname()) {
          hostnameMatch = true;
          break;
        }
      }
      if (!hostnameMatch) {
        continue;
      }
    }

    // If clientLanguage is specified, ensure the current language matches one of the allowed languages
    if (Array.isArray(processedConfig.clientLanguage)) {
      let languageMatch = false;
      for (const allowedLanguage of processedConfig.clientLanguage) {
        if (allowedLanguage === K46) {
          languageMatch = true;
          break;
        }
      }
      if (!languageMatch) {
        continue;
      }
    }

    // Return the serviceConfig if all criteria are met
    return processedConfig.serviceConfig;
  }

  throw new Error("No matching service config found");
}

module.exports = selectMatchingServiceConfig;