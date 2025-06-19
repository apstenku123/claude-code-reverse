/**
 * Retrieves a list of configuration objects, filters out those without messages,
 * transforms them using dP4, and adds a 'value' property representing their index.
 *
 * @async
 * @function getFilteredAndMappedConfigs
 * @returns {Promise<Array<Object>>} An array of transformed configuration objects, each with an added 'value' property.
 */
async function getFilteredAndMappedConfigs() {
  // Retrieve the source observable/configuration list asynchronously
  const sourceConfigs = await kB0();

  // Filter out configs that have no messages
  const configsWithMessages = sourceConfigs.filter(config => config.messages.length);

  // Transform the filtered configs using dP4 (external transformation function)
  const transformedConfigs = dP4(configsWithMessages);

  // Map over the transformed configs, adding a 'value' property equal to the index
  return transformedConfigs.map((config, index) => ({
    ...config,
    value: index
  }));
}

module.exports = getFilteredAndMappedConfigs;