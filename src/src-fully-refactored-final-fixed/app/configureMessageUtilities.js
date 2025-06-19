/**
 * Configures the message utility, writer, and reader components with their respective buffer classes.
 *
 * This function initializes the configuration for the message utility system by setting up the utility,
 * writer, and reader components. It ensures that the writer and reader are properly configured to use
 * BufferWriter and BufferReader, respectively.
 *
 * @returns {void} This function does not return a value.
 */
function configureMessageUtilities() {
  // Configure general message utility settings
  mY.util._configure();

  // Configure the Writer to use BufferWriter
  mY.Writer._configure(mY.BufferWriter);

  // Configure the Reader to use BufferReader
  mY.Reader._configure(mY.BufferReader);
}

module.exports = configureMessageUtilities;