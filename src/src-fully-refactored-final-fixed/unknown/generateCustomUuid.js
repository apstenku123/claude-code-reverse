/**
 * Generates a custom UUID string with optional suffix based on the provided flag.
 *
 * @param {string} [primaryUuid=yJ.uuid4()] - The primary UUID string, defaults to a new UUID if not provided.
 * @param {string} [secondaryUuidSegment=yJ.uuid4().substring(16)] - The secondary UUID segment, defaults to the last part of a new UUID.
 * @param {boolean} [isNegativeFlag] - Optional flag to append a suffix: '-1' if true, '-0' if false, nothing if undefined.
 * @returns {string} The generated custom UUID string in the format: `${primaryUuid}-${secondaryUuidSegment}${suffix}`.
 */
function generateCustomUuid(
  primaryUuid = yJ.uuid4(),
  secondaryUuidSegment = yJ.uuid4().substring(16),
  isNegativeFlag
) {
  let suffix = "";
  // If the flag is provided, append '-1' for true, '-0' for false
  if (isNegativeFlag !== undefined) {
    suffix = isNegativeFlag ? "-1" : "-0";
  }
  return `${primaryUuid}-${secondaryUuidSegment}${suffix}`;
}

module.exports = generateCustomUuid;