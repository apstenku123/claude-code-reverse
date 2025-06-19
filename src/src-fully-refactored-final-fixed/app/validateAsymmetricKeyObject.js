/**
 * Validates that the provided value is a valid asymmetric key object.
 *
 * This function checks that the input is not a Buffer or string, that the cryptographic
 * environment is available, and that the object has the required properties for an
 * asymmetric key: 'type' and 'asymmetricKeyType' as strings, and an 'export' method.
 *
 * @param {object|string|Buffer} keyCandidate - The value to validate as an asymmetric key object.
 * @throws {Error} Throws an error if the input is not a valid asymmetric key object.
 * @returns {void} Returns nothing if validation passes.
 */
function validateAsymmetricKeyObject(keyCandidate) {
  // If the input is a Buffer, do not proceed
  if (Ed.isBuffer(keyCandidate)) return;

  // If the input is a string, do not proceed
  if (typeof keyCandidate === "string") return;

  // Ensure the cryptographic environment is available
  if (!Fs1) throw createFormattedTypeError(wd);

  // The input must be an object
  if (typeof keyCandidate !== "object") throw createFormattedTypeError(wd);

  // The object must have a 'type' property of type string
  if (typeof keyCandidate.type !== "string") throw createFormattedTypeError(wd);

  // The object must have an 'asymmetricKeyType' property of type string
  if (typeof keyCandidate.asymmetricKeyType !== "string") throw createFormattedTypeError(wd);

  // The object must have an 'export' method
  if (typeof keyCandidate.export !== "function") throw createFormattedTypeError(wd);
}

module.exports = validateAsymmetricKeyObject;