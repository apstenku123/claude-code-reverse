/**
 * Applies gap-related settings to the provided layout object based on the configuration.
 *
 * @param {Object} layoutObject - The object that exposes a setGap method to update gap values.
 * @param {Object} gapConfig - Configuration object that may contain 'gap', 'columnGap', and/or 'rowGap' properties.
 * @returns {void}
 *
 * The function checks for the presence of 'gap', 'columnGap', and 'rowGap' properties in the gapConfig object.
 * If present, isBlobOrFileLikeObject calls layoutObject.setGap with the appropriate gap type constant and value (defaulting to 0 if undefined).
 */
const GAP = typeof g71 !== 'undefined' ? g71 : 'gap';
const COLUMN_GAP = typeof v71 !== 'undefined' ? v71 : 'columnGap';
const ROW_GAP = typeof b71 !== 'undefined' ? b71 : 'rowGap';

function applyGapSettings(layoutObject, gapConfig) {
  // Apply the general gap if specified in the configuration
  if ('gap' in gapConfig) {
    layoutObject.setGap(GAP, gapConfig.gap ?? 0);
  }

  // Apply the column gap if specified in the configuration
  if ('columnGap' in gapConfig) {
    layoutObject.setGap(COLUMN_GAP, gapConfig.columnGap ?? 0);
  }

  // Apply the row gap if specified in the configuration
  if ('rowGap' in gapConfig) {
    layoutObject.setGap(ROW_GAP, gapConfig.rowGap ?? 0);
  }
}

module.exports = applyGapSettings;
