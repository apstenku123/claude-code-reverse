/**
 * Configures the serialization utilities for the application.
 *
 * This function initializes and configures the utility, writer, and reader modules
 * with their respective buffer implementations. It ensures that the serialization
 * and deserialization mechanisms are properly set up before use.
 *
 * @returns {void} This function does not return a value.
 */
function configureSerializationUtilities() {
  // Configure general utility settings
  mY.util._configure();

  // Configure the Writer with the BufferWriter implementation
  mY.Writer._configure(mY.BufferWriter);

  // Configure the Reader with the BufferReader implementation
  mY.Reader._configure(mY.BufferReader);
}

module.exports = configureSerializationUtilities;