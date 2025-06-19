/**
 * Generates a composite UUID string with an optional suffix based on a boolean flag.
 *
 * @param {string} [primaryUuid] - The primary UUID string. If not provided, a new UUID is generated.
 * @param {string} [secondaryUuidSuffix] - The secondary UUID suffix. If not provided, a new UUID is generated and its last 16 characters are used.
 * @param {boolean} [isNegative] - Optional flag to append a suffix: '-1' if true, '-0' if false, nothing if undefined.
 * @returns {string} The composite UUID string in the format: `${primaryUuid}-${secondaryUuidSuffix}[-1|-0]`
 */
function generateCompositeUuid(
  primaryUuid = yJ.uuid4(),
  secondaryUuidSuffix = yJ.uuid4().substring(16),
  isNegative
) {
  let suffix = "";
  // If isNegative is provided, append '-1' for true, '-0' for false
  if (isNegative !== undefined) {
    suffix = isNegative ? "-1" : "-0";
  }
  return `${primaryUuid}-${secondaryUuidSuffix}${suffix}`;
}

module.exports = generateCompositeUuid;
