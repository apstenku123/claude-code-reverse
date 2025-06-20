/**
 * Configures the message serialization and deserialization utilities for the application.
 *
 * This function initializes the utility, writer, and reader components of the message system
 * by calling their respective _configure methods. It ensures that the BufferWriter and BufferReader
 * are properly set up for use with the application'createInteractionAccessor message handling.
 *
 * @returns {void} This function does not return a value.
 */
function configureMessageSerialization() {
  // Initialize general utility configuration for message handling
  mY.util._configure();

  // Configure the Writer to use BufferWriter for serialization
  mY.Writer._configure(mY.BufferWriter);

  // Configure the Reader to use BufferReader for deserialization
  mY.Reader._configure(mY.BufferReader);
}

module.exports = configureMessageSerialization;