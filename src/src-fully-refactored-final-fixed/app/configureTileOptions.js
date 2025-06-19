/**
 * Configures tile-related options for image processing based on the provided configuration object.
 * Validates and sets various tile options such as size, overlap, container, layout, angle, background, depth, skipBlanks, center, id, and basename.
 * Throws an error if any parameter is invalid.
 *
 * @param {Object} tileConfig - Configuration object containing tile options.
 * @returns {any} The result of updating the output format to 'dz'.
 */
function configureTileOptions(tileConfig) {
  // Ensure the input is an object
  if (x1.object(tileConfig)) {
    // Validate and set tile size
    if (x1.defined(tileConfig.size)) {
      if (x1.integer(tileConfig.size) && x1.inRange(tileConfig.size, 1, 8192)) {
        this.options.tileSize = tileConfig.size;
      } else {
        throw x1.invalidParameterError("size", "integer between 1 and 8192", tileConfig.size);
      }
    }

    // Validate and set tile overlap
    if (x1.defined(tileConfig.overlap)) {
      if (x1.integer(tileConfig.overlap) && x1.inRange(tileConfig.overlap, 0, 8192)) {
        // Overlap cannot be greater than tile size
        if (tileConfig.overlap > this.options.tileSize) {
          throw x1.invalidParameterError(
            "overlap",
            `<= size (${this.options.tileSize})`,
            tileConfig.overlap
          );
        }
        this.options.tileOverlap = tileConfig.overlap;
      } else {
        throw x1.invalidParameterError("overlap", "integer between 0 and 8192", tileConfig.overlap);
      }
    }

    // Validate and set tile container
    if (x1.defined(tileConfig.container)) {
      if (
        x1.string(tileConfig.container) &&
        x1.inArray(tileConfig.container, ["fs", "zip"])
      ) {
        this.options.tileContainer = tileConfig.container;
      } else {
        throw x1.invalidParameterError("container", "one of: fs, zip", tileConfig.container);
      }
    }

    // Validate and set tile layout
    if (x1.defined(tileConfig.layout)) {
      if (
        x1.string(tileConfig.layout) &&
        x1.inArray(tileConfig.layout, ["dz", "google", "iiif", "iiif3", "zoomify"])
      ) {
        this.options.tileLayout = tileConfig.layout;
      } else {
        throw x1.invalidParameterError(
          "layout",
          "one of: dz, google, iiif, iiif3, zoomify",
          tileConfig.layout
        );
      }
    }

    // Validate and set tile angle
    if (x1.defined(tileConfig.angle)) {
      if (x1.integer(tileConfig.angle) && tileConfig.angle % 90 === 0) {
        this.options.tileAngle = tileConfig.angle;
      } else {
        throw x1.invalidParameterError("angle", "positive/negative multiple of 90", tileConfig.angle);
      }
    }

    // Set tile background color (delegated to helper)
    this._setBackgroundColourOption("tileBackground", tileConfig.background);

    // Validate and set tile depth
    if (x1.defined(tileConfig.depth)) {
      if (
        x1.string(tileConfig.depth) &&
        x1.inArray(tileConfig.depth, ["onepixel", "onetile", "one"])
      ) {
        this.options.tileDepth = tileConfig.depth;
      } else {
        throw x1.invalidParameterError(
          "depth",
          "one of: onepixel, onetile, one",
          tileConfig.depth
        );
      }
    }

    // Validate and set skipBlanks
    if (x1.defined(tileConfig.skipBlanks)) {
      if (
        x1.integer(tileConfig.skipBlanks) &&
        x1.inRange(tileConfig.skipBlanks, -1, 65535)
      ) {
        this.options.tileSkipBlanks = tileConfig.skipBlanks;
      } else {
        throw x1.invalidParameterError(
          "skipBlanks",
          "integer between -1 and 255/65535",
          tileConfig.skipBlanks
        );
      }
    } else if (
      x1.defined(tileConfig.layout) &&
      tileConfig.layout === "google"
    ) {
      // Default skipBlanks for Google layout
      this.options.tileSkipBlanks = 5;
    }

    // Determine center/centre option (accepts either spelling)
    const centerValue = x1.bool(tileConfig.center)
      ? tileConfig.center
      : tileConfig.centre;
    if (x1.defined(centerValue)) {
      this._setBooleanOption("tileCentre", centerValue);
    }

    // Validate and set tile updateSnapshotAndNotify
    if (x1.defined(tileConfig.id)) {
      if (x1.string(tileConfig.id)) {
        this.options.tileId = tileConfig.id;
      } else {
        throw x1.invalidParameterError("id", "string", tileConfig.id);
      }
    }

    // Validate and set tile basename
    if (x1.defined(tileConfig.basename)) {
      if (x1.string(tileConfig.basename)) {
        this.options.tileBasename = tileConfig.basename;
      } else {
        throw x1.invalidParameterError("basename", "string", tileConfig.basename);
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

  // Update output format to 'dz' and return result
  return this._updateFormatOut("dz");
}

module.exports = configureTileOptions;
