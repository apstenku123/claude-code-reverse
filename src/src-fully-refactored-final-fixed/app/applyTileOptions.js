/**
 * Applies and validates tile-related options to the current instance.
 *
 * This function processes a configuration object containing tile options, validates each option,
 * and updates the instance'createInteractionAccessor options accordingly. Throws descriptive errors for invalid parameters.
 *
 * @param {Object} tileOptions - An object containing tile configuration options.
 * @returns {any} The result of updating the output format to Deep Zoom ('dz').
 */
function applyTileOptions(tileOptions) {
  // Ensure the input is an object
  if (x1.object(tileOptions)) {
    // Validate and set tile size
    if (x1.defined(tileOptions.size)) {
      if (x1.integer(tileOptions.size) && x1.inRange(tileOptions.size, 1, 8192)) {
        this.options.tileSize = tileOptions.size;
      } else {
        throw x1.invalidParameterError("size", "integer between 1 and 8192", tileOptions.size);
      }
    }

    // Validate and set tile overlap
    if (x1.defined(tileOptions.overlap)) {
      if (x1.integer(tileOptions.overlap) && x1.inRange(tileOptions.overlap, 0, 8192)) {
        // Overlap cannot exceed tile size
        if (tileOptions.overlap > this.options.tileSize) {
          throw x1.invalidParameterError(
            "overlap",
            `<= size (${this.options.tileSize})`,
            tileOptions.overlap
          );
        }
        this.options.tileOverlap = tileOptions.overlap;
      } else {
        throw x1.invalidParameterError("overlap", "integer between 0 and 8192", tileOptions.overlap);
      }
    }

    // Validate and set tile container type
    if (x1.defined(tileOptions.container)) {
      if (
        x1.string(tileOptions.container) &&
        x1.inArray(tileOptions.container, ["fs", "zip"])
      ) {
        this.options.tileContainer = tileOptions.container;
      } else {
        throw x1.invalidParameterError("container", "one of: fs, zip", tileOptions.container);
      }
    }

    // Validate and set tile layout
    if (x1.defined(tileOptions.layout)) {
      if (
        x1.string(tileOptions.layout) &&
        x1.inArray(tileOptions.layout, ["dz", "google", "iiif", "iiif3", "zoomify"])
      ) {
        this.options.tileLayout = tileOptions.layout;
      } else {
        throw x1.invalidParameterError(
          "layout",
          "one of: dz, google, iiif, iiif3, zoomify",
          tileOptions.layout
        );
      }
    }

    // Validate and set tile angle (must be a multiple of 90)
    if (x1.defined(tileOptions.angle)) {
      if (x1.integer(tileOptions.angle) && tileOptions.angle % 90 === 0) {
        this.options.tileAngle = tileOptions.angle;
      } else {
        throw x1.invalidParameterError("angle", "positive/negative multiple of 90", tileOptions.angle);
      }
    }

    // Set tile background color using helper
    this._setBackgroundColourOption("tileBackground", tileOptions.background);

    // Validate and set tile depth
    if (x1.defined(tileOptions.depth)) {
      if (
        x1.string(tileOptions.depth) &&
        x1.inArray(tileOptions.depth, ["onepixel", "onetile", "one"])
      ) {
        this.options.tileDepth = tileOptions.depth;
      } else {
        throw x1.invalidParameterError(
          "depth",
          "one of: onepixel, onetile, one",
          tileOptions.depth
        );
      }
    }

    // Validate and set skipBlanks
    if (x1.defined(tileOptions.skipBlanks)) {
      if (
        x1.integer(tileOptions.skipBlanks) &&
        x1.inRange(tileOptions.skipBlanks, -1, 65535)
      ) {
        this.options.tileSkipBlanks = tileOptions.skipBlanks;
      } else {
        throw x1.invalidParameterError(
          "skipBlanks",
          "integer between -1 and 255/65535",
          tileOptions.skipBlanks
        );
      }
    } else if (
      x1.defined(tileOptions.layout) &&
      tileOptions.layout === "google"
    ) {
      // Default skipBlanks for Google layout
      this.options.tileSkipBlanks = 5;
    }

    // Determine tile center option (accepts both 'center' and 'centre')
    const tileCenterValue = x1.bool(tileOptions.center)
      ? tileOptions.center
      : tileOptions.centre;
    if (x1.defined(tileCenterValue)) {
      this._setBooleanOption("tileCentre", tileCenterValue);
    }

    // Validate and set tile updateSnapshotAndNotify
    if (x1.defined(tileOptions.id)) {
      if (x1.string(tileOptions.id)) {
        this.options.tileId = tileOptions.id;
      } else {
        throw x1.invalidParameterError("id", "string", tileOptions.id);
      }
    }

    // Validate and set tile basename
    if (x1.defined(tileOptions.basename)) {
      if (x1.string(tileOptions.basename)) {
        this.options.tileBasename = tileOptions.basename;
      } else {
        throw x1.invalidParameterError("basename", "string", tileOptions.basename);
      }
    }
  }

  // Set tile format based on output format
  if (x1.inArray(this.options.formatOut, ["jpeg", "png", "webp"])) {
    this.options.tileFormat = this.options.formatOut;
  } else if (this.options.formatOut !== "input") {
    throw x1.invalidParameterError(
      "format",
      "one of: jpeg, png, webp",
      this.options.formatOut
    );
  }

  // Update output format to Deep Zoom ('dz') and return result
  return this._updateFormatOut("dz");
}

module.exports = applyTileOptions;
