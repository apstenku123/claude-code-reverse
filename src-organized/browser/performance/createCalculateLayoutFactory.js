/**
 * Factory function that enhances a Yoga-like layout engine API with unit handling, measure/dirtied callbacks, and utility methods.
 *
 * @param {object} Yoga - The Yoga-like layout engine object to enhance.
 * @returns {object} An object containing enhanced Config, Node, and unit constants.
 */
function createCalculateLayoutFactory(Yoga) {
  /**
   * Utility to wrap a method on a prototype, replacing isBlobOrFileLikeObject with a decorated version.
   *
   * @param {object} prototypeObj - The prototype object to modify.
   * @param {string} methodName - The name of the method to wrap.
   * @param {function} wrapperFn - The function to wrap the original method.
   */
  function wrapPrototypeMethod(prototypeObj, methodName, wrapperFn) {
    const originalMethod = prototypeObj[methodName];
    prototypeObj[methodName] = function (...args) {
      return wrapperFn.call(this, originalMethod, ...args);
    };
  }

  // List of setter methods to enhance with unit handling
  const setterMethods = [
    "setPosition",
    "setMargin",
    "setFlexBasis",
    "setWidth",
    "setHeight",
    "setMinWidth",
    "setMinHeight",
    "setMaxWidth",
    "setMaxHeight",
    "setPadding"
  ];

  for (const setterName of setterMethods) {
    // Map unit types to the corresponding method implementations
    const unitMethodMap = {
      [YogaConstants.UNIT_POINT]: Yoga.Node.prototype[setterName],
      [YogaConstants.UNIT_PERCENT]: Yoga.Node.prototype[`${setterName}Percent`],
      [YogaConstants.UNIT_AUTO]: Yoga.Node.prototype[`${setterName}Auto`]
    };

    wrapPrototypeMethod(Yoga.Node.prototype, setterName, function (originalSetter, ...args) {
      // Extract the last argument as the unit/value descriptor
      let unitType;
      let value;
      const lastArg = args.pop();

      if (lastArg === "auto") {
        unitType = YogaConstants.UNIT_AUTO;
        value = undefined;
      } else if (typeof lastArg === "object") {
        unitType = lastArg.unit;
        value = lastArg.valueOf();
      } else {
        // Determine if the value is a percent string
        if (typeof lastArg === "string" && lastArg.endsWith("%")) {
          unitType = YogaConstants.UNIT_PERCENT;
        } else {
          unitType = YogaConstants.UNIT_POINT;
        }
        value = parseFloat(lastArg);
        // Validate that the value is a number if the input is not NaN
        if (!Number.isNaN(lastArg) && Number.isNaN(value)) {
          throw new Error(`Invalid value ${lastArg} for ${setterName}`);
        }
      }

      if (!unitMethodMap[unitType]) {
        throw new Error(`Failed to execute "${setterName}": Unsupported unit '${lastArg}'`);
      }

      // Call the correct method with the correct arguments
      if (value !== undefined) {
        return unitMethodMap[unitType].call(this, ...args, value);
      } else {
        return unitMethodMap[unitType].call(this, ...args);
      }
    });
  }

  /**
   * Wraps a measure function to ensure isBlobOrFileLikeObject returns width/height, defaulting to NaN if missing.
   *
   * @param {function} measureFn - The user-provided measure function.
   * @returns {object} An object implementing the measure callback interface.
   */
  function createMeasureCallback(measureFn) {
    return Yoga.MeasureCallback.implement({
      measure: (...args) => {
        const { width, height } = measureFn(...args);
        return {
          width: width ?? NaN,
          height: height ?? NaN
        };
      }
    });
  }

  /**
   * Wraps a dirtied callback function for Yoga'createInteractionAccessor API.
   *
   * @param {function} dirtiedFn - The user-provided dirtied callback.
   * @returns {object} An object implementing the dirtied callback interface.
   */
  function createDirtiedCallback(dirtiedFn) {
    return Yoga.DirtiedCallback.implement({
      dirtied: dirtiedFn
    });
  }

  // Enhance setMeasureFunc to accept a JS function and wrap isBlobOrFileLikeObject appropriately
  wrapPrototypeMethod(Yoga.Node.prototype, "setMeasureFunc", function (originalSetMeasureFunc, measureFn) {
    if (measureFn) {
      return originalSetMeasureFunc.call(this, createMeasureCallback(measureFn));
    } else {
      return this.unsetMeasureFunc();
    }
  });

  // Enhance setDirtiedFunc to accept a JS function and wrap isBlobOrFileLikeObject appropriately
  wrapPrototypeMethod(Yoga.Node.prototype, "setDirtiedFunc", function (originalSetDirtiedFunc, dirtiedFn) {
    originalSetDirtiedFunc.call(this, createDirtiedCallback(dirtiedFn));
  });

  // Enhance Config.prototype.free to call Config.destroy
  wrapPrototypeMethod(Yoga.Config.prototype, "free", function () {
    Yoga.Config.destroy(this);
  });

  // Enhance Node.create to support creation with or without config
  wrapPrototypeMethod(Yoga.Node, "create", (originalCreate, config) => {
    return config ? Yoga.Node.createWithConfig(config) : Yoga.Node.createDefault();
  });

  // Enhance Node.prototype.free to call Node.destroy
  wrapPrototypeMethod(Yoga.Node.prototype, "free", function () {
    Yoga.Node.destroy(this);
  });

  // Enhance Node.prototype.freeRecursive to recursively free all children
  wrapPrototypeMethod(Yoga.Node.prototype, "freeRecursive", function () {
    // Recursively free all children
    while (this.getChildCount() > 0) {
      this.getChild(0).freeRecursive();
    }
    this.free();
  });

  // Enhance calculateLayout to provide default arguments
  wrapPrototypeMethod(Yoga.Node.prototype, "calculateLayout", function (originalCalculateLayout, width = NaN, height = NaN, direction = YogaConstants.DIRECTION_LTR) {
    return originalCalculateLayout.call(this, width, height, direction);
  });

  // Expose enhanced Yoga API and constants
  return {
    Config: Yoga.Config,
    Node: Yoga.Node,
    ...YogaConstants
  };
}

// Alias for Yoga constants (assumed to be available in scope as F2 in original)
const YogaConstants = typeof F2 !== 'undefined' ? F2 : {};

module.exports = createCalculateLayoutFactory;
