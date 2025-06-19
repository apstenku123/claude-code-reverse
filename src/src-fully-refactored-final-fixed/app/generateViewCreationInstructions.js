/**
 * Generates instructions for creating new views based on provided source and configuration objects.
 *
 * @param {Object} sourceView - The source view object containing at least 'name' and 'description' properties.
 * @param {Object} instrumentConfig - The instrument configuration object containing 'name', 'type', and 'unit' properties.
 * @returns {string} Multi-line string with instructions for creating new views with different combinations of names and instrument selectors.
 */
function generateViewCreationInstructions(sourceView, instrumentConfig) {
  // Build a minimal instrument selector object from the configuration
  const instrumentSelector = {
    name: instrumentConfig.name,
    type: instrumentConfig.type,
    unit: instrumentConfig.unit
  };

  // Serialize the instrument selector for display in the instructions
  const instrumentSelectorString = JSON.stringify(instrumentSelector);

  // Return formatted instructions for creating new views
  return `
	- create a new view with a name other than '${sourceView.name}' and InstrumentSelector '${instrumentSelectorString}'
    	- OR - create a new view with the name ${sourceView.name} and description '${sourceView.description}' and InstrumentSelector ${instrumentSelectorString}
    	- OR - create a new view with the name ${instrumentConfig.name} and description '${sourceView.description}' and InstrumentSelector ${instrumentSelectorString}`;
}

module.exports = generateViewCreationInstructions;