/**
 * Generates an instruction string for creating a new view with a unique name and a specific InstrumentSelector configuration.
 *
 * @param {Object} sourceObservable - The source observable object, expected to have a 'name' property.
 * @param {Object} config - The configuration object for the InstrumentSelector, expected to have 'name', 'type', and 'unit' properties.
 * @returns {string} Instruction string for creating a new view with the specified InstrumentSelector, ensuring the view name is unique.
 */
function generateViewCreationInstruction(sourceObservable, config) {
  // Extract only the relevant properties from the config for the InstrumentSelector
  const instrumentSelector = {
    name: config.name,
    type: config.type,
    unit: config.unit
  };

  // Serialize the InstrumentSelector configuration to a JSON string
  const instrumentSelectorString = JSON.stringify(instrumentSelector);

  // Return the instruction string, ensuring the new view name is different from the source observable'createInteractionAccessor name
  return `\processRuleBeginHandlers- create a new view with a name other than '${sourceObservable.name}' and InstrumentSelector '${instrumentSelectorString}'`;
}

module.exports = generateViewCreationInstruction;