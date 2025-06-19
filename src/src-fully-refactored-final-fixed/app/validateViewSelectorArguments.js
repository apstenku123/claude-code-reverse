/**
 * Validates the arguments provided for creating a view selector.
 * Throws descriptive errors if the arguments are invalid.
 *
 * @param {Object} viewSelectorArgs - The arguments used to create a view selector.
 * @param {string} [viewSelectorArgs.name] - The optional name of the view.
 * @param {string} [viewSelectorArgs.instrumentName] - The optional instrument name selector.
 * @throws {Error} If no selector arguments are supplied or if a named view is declared with an invalid instrument selector.
 */
function validateViewSelectorArguments(viewSelectorArgs) {
  // Check if no selector arguments are supplied
  if (areAllInstrumentAndMeterFieldsNull(viewSelectorArgs)) {
    throw new Error("Cannot create view with no selector arguments supplied");
  }

  // If a name is specified, ensure instrumentName is present and does not contain wildcards
  const hasName = viewSelectorArgs.name != null;
  const instrumentNameMissing = viewSelectorArgs?.instrumentName == null;
  const instrumentNameHasWildcard = W16.PatternPredicate.hasWildcard(viewSelectorArgs.instrumentName);

  if (
    hasName && (instrumentNameMissing || instrumentNameHasWildcard)
  ) {
    throw new Error(
      "Views with a specified name must be declared with an instrument selector that selects at most one instrument per meter."
    );
  }
}

module.exports = validateViewSelectorArguments;