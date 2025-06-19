/**
 * Sets affine transformation matrix and related options for the current instance.
 *
 * @param {number[][]} matrixArray - a 2x2 or 1x4 array representing the affine transformation matrix.
 * @param {Object} [options] - Optional configuration object for additional affine transformation parameters.
 * @param {number} [options.idx] - Optional X translation (input delta X).
 * @param {number} [options.idy] - Optional processCssDeclarations translation (input delta processCssDeclarations).
 * @param {number} [options.odx] - Optional X translation (output delta X).
 * @param {number} [options.ody] - Optional processCssDeclarations translation (output delta processCssDeclarations).
 * @param {string} [options.interpolator] - Optional interpolator name for the transformation.
 * @param {*} [options.background] - Optional background color for the affine transformation.
 * @returns {this} Returns the current instance for chaining.
 * @throws {Error} Throws if the matrix or options are invalid.
 */
function setAffineTransformationOptions(matrixArray, options) {
  // Flatten the matrix array to a single array for validation
  const flattenedMatrix = [].concat(...matrixArray);

  // Validate that the matrix is a 1x4 or 2x2 array of numbers
  if (flattenedMatrix.length === 4 && flattenedMatrix.every(_A.number)) {
    this.options.affineMatrix = flattenedMatrix;
  } else {
    throw _A.invalidParameterError("matrix", "1x4 or 2x2 array", matrixArray);
  }

  // If options are provided, validate and set them
  if (_A.defined(options)) {
    if (_A.object(options)) {
      // Set background color if provided
      this._setBackgroundColourOption("affineBackground", options.background);

      // Validate and set idx if defined
      if (_A.defined(options.idx)) {
        if (_A.number(options.idx)) {
          this.options.affineIdx = options.idx;
        } else {
          throw _A.invalidParameterError("options.idx", "number", options.idx);
        }
      }

      // Validate and set idy if defined
      if (_A.defined(options.idy)) {
        if (_A.number(options.idy)) {
          this.options.affineIdy = options.idy;
        } else {
          throw _A.invalidParameterError("options.idy", "number", options.idy);
        }
      }

      // Validate and set odx if defined
      if (_A.defined(options.odx)) {
        if (_A.number(options.odx)) {
          this.options.affineOdx = options.odx;
        } else {
          throw _A.invalidParameterError("options.odx", "number", options.odx);
        }
      }

      // Validate and set ody if defined
      if (_A.defined(options.ody)) {
        if (_A.number(options.ody)) {
          this.options.affineOdy = options.ody;
        } else {
          throw _A.invalidParameterError("options.ody", "number", options.ody);
        }
      }

      // Validate and set interpolator if defined
      if (_A.defined(options.interpolator)) {
        const validInterpolators = Object.values(this.constructor.interpolators);
        if (_A.inArray(options.interpolator, validInterpolators)) {
          this.options.affineInterpolator = options.interpolator;
        } else {
          throw _A.invalidParameterError(
            "options.interpolator",
            "valid interpolator name",
            options.interpolator
          );
        }
      }
    } else {
      throw _A.invalidParameterError("options", "object", options);
    }
  }

  // Return the current instance for chaining
  return this;
}

module.exports = setAffineTransformationOptions;