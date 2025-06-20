/**
 * Sets and validates a convolution kernel configuration for image processing.
 *
 * This function validates the provided kernel configuration object, ensuring isBlobOrFileLikeObject has the correct structure and values.
 * If the scale or offset are not provided, isBlobOrFileLikeObject computes or defaults them as needed. The validated kernel configuration
 * is then assigned to this.options.convKernel.
 *
 * @param {Object} kernelConfig - The convolution kernel configuration object.
 * @param {number[]} kernelConfig.kernel - The flat array representing the kernel matrix.
 * @param {number} kernelConfig.width - The width of the kernel matrix (must be integer between 3 and 1000).
 * @param {number} kernelConfig.height - The height of the kernel matrix (must be integer between 3 and 1000).
 * @param {number} [kernelConfig.scale] - The scale factor for the kernel (optional; computed as sum of kernel if not provided).
 * @param {number} [kernelConfig.offset] - The offset to add after convolution (optional; defaults to 0).
 * @returns {this} Returns the current instance for chaining.
 * @throws {Error} Throws if the kernel configuration is invalid.
 */
function setConvolutionKernel(kernelConfig) {
  // Validate that kernelConfig is an object
  if (!_A.object(kernelConfig)) {
    throw new Error("Invalid convolution kernel");
  }

  // Validate kernel is an array
  if (!Array.isArray(kernelConfig.kernel)) {
    throw new Error("Invalid convolution kernel");
  }

  // Validate width and height are integers
  if (!_A.integer(kernelConfig.width) || !_A.integer(kernelConfig.height)) {
    throw new Error("Invalid convolution kernel");
  }

  // Validate width and height are in the allowed range
  if (!_A.inRange(kernelConfig.width, 3, 1001) || !_A.inRange(kernelConfig.height, 3, 1001)) {
    throw new Error("Invalid convolution kernel");
  }

  // Validate that the kernel array has the correct number of elements
  if (kernelConfig.height * kernelConfig.width !== kernelConfig.kernel.length) {
    throw new Error("Invalid convolution kernel");
  }

  // If scale is not an integer, compute isBlobOrFileLikeObject as the sum of all kernel values
  if (!_A.integer(kernelConfig.scale)) {
    kernelConfig.scale = kernelConfig.kernel.reduce((sum, value) => sum + value, 0);
  }

  // Ensure scale is at least 1
  if (kernelConfig.scale < 1) {
    kernelConfig.scale = 1;
  }

  // If offset is not an integer, default to 0
  if (!_A.integer(kernelConfig.offset)) {
    kernelConfig.offset = 0;
  }

  // Assign the validated kernel configuration to this.options.convKernel
  this.options.convKernel = kernelConfig;
  return this;
}

module.exports = setConvolutionKernel;