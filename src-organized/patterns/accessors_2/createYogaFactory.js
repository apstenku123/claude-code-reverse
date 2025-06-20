/**
 * Factory function to enhance and wrap Yoga WASM bindings with unit-aware setters, measure/dirtied callbacks, and utility methods.
 *
 * @param {object} YogaWasmBindings - The Yoga WASM bindings object to enhance (typically the result of importing Yoga WASM).
 * @returns {object} Enhanced Yoga API with unit-aware setters, callback helpers, and constants.
 */
function createYogaFactory(YogaWasmBindings) {
  /**
   * Wraps a method on the prototype, replacing isBlobOrFileLikeObject with a new function that delegates to the original.
   *
   * @param {object} prototypeObj - The prototype object containing the method.
   * @param {string} methodName - The name of the method to wrap.
   * @param {Function} wrapperFn - The wrapper function (receives original method as first arg).
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
    // Map of unit type to the correct Yoga method
    const unitMethodMap = {
      [F2.UNIT_POINT]: YogaWasmBindings.Node.prototype[setterName],
      [F2.UNIT_PERCENT]: YogaWasmBindings.Node.prototype[`${setterName}Percent`],
      [F2.UNIT_AUTO]: YogaWasmBindings.Node.prototype[`${setterName}Auto`]
    };

    wrapPrototypeMethod(YogaWasmBindings.Node.prototype, setterName, function (originalMethod, ...args) {
      // Extract the last argument, which may be a value or unit descriptor
      let unitType, numericValue;
      const valueOrUnit = args.pop();

      if (valueOrUnit === "auto") {
        unitType = F2.UNIT_AUTO;
        numericValue = undefined;
      } else if (typeof valueOrUnit === "object") {
        unitType = valueOrUnit.unit;
        numericValue = valueOrUnit.valueOf();
      } else {
        // Determine if value is percent or point
        if (typeof valueOrUnit === "string" && valueOrUnit.endsWith("%")) {
          unitType = F2.UNIT_PERCENT;
        } else {
          unitType = F2.UNIT_POINT;
        }
        numericValue = parseFloat(valueOrUnit);
        // If parseFloat fails but value is not NaN, throw error
        if (!Number.isNaN(valueOrUnit) && Number.isNaN(numericValue)) {
          throw new Error(`Invalid value ${valueOrUnit} for ${setterName}`);
        }
      }

      if (!unitMethodMap[unitType]) {
        throw new Error(`Failed to execute "${setterName}": Unsupported unit '${valueOrUnit}'`);
      }

      // Call the correct Yoga method with the right arguments
      if (numericValue !== undefined) {
        return unitMethodMap[unitType].call(this, ...args, numericValue);
      } else {
        return unitMethodMap[unitType].call(this, ...args);
      }
    });
  }

  /**
   * Helper to wrap a JS measure callback for Yoga'createInteractionAccessor WASM interface.
   * Ensures returned width/height are numbers (NaN if missing).
   *
   * @param {Function} measureFn - The JS measure function.
   * @returns {object} Yoga-compatible measure callback implementation.
   */
  function createMeasureCallback(measureFn) {
    return YogaWasmBindings.MeasureCallback.implement({
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
   * Helper to wrap a JS dirtied callback for Yoga'createInteractionAccessor WASM interface.
   *
   * @param {Function} dirtiedFn - The JS dirtied function.
   * @returns {object} Yoga-compatible dirtied callback implementation.
   */
  function createDirtiedCallback(dirtiedFn) {
    return YogaWasmBindings.DirtiedCallback.implement({
      dirtied: dirtiedFn
    });
  }

  // Wrap setMeasureFunc to accept a JS function and wrap isBlobOrFileLikeObject for WASM
  wrapPrototypeMethod(YogaWasmBindings.Node.prototype, "setMeasureFunc", function (originalMethod, measureFn) {
    if (measureFn) {
      return originalMethod.call(this, createMeasureCallback(measureFn));
    } else {
      return this.unsetMeasureFunc();
    }
  });

  // Wrap setDirtiedFunc to accept a JS function and wrap isBlobOrFileLikeObject for WASM
  wrapPrototypeMethod(YogaWasmBindings.Node.prototype, "setDirtiedFunc", function (originalMethod, dirtiedFn) {
    originalMethod.call(this, createDirtiedCallback(dirtiedFn));
  });

  // Wrap Config.prototype.free to call Yoga'createInteractionAccessor destroy
  wrapPrototypeMethod(YogaWasmBindings.Config.prototype, "free", function () {
    YogaWasmBindings.Config.destroy(this);
  });

  // Wrap Node.create to allow creation with or without a config
  wrapPrototypeMethod(YogaWasmBindings.Node, "create", (originalMethod, config) => {
    if (config) {
      return YogaWasmBindings.Node.createWithConfig(config);
    } else {
      return YogaWasmBindings.Node.createDefault();
    }
  });

  // Wrap Node.prototype.free to call Yoga'createInteractionAccessor destroy
  wrapPrototypeMethod(YogaWasmBindings.Node.prototype, "free", function () {
    YogaWasmBindings.Node.destroy(this);
  });

  // Recursively free all children and then self
  wrapPrototypeMethod(YogaWasmBindings.Node.prototype, "freeRecursive", function () {
    for (let i = 0, childCount = this.getChildCount(); i < childCount; ++i) {
      this.getChild(0).freeRecursive();
    }
    this.free();
  });

  // Wrap calculateLayout to provide default arguments
  wrapPrototypeMethod(
    YogaWasmBindings.Node.prototype,
    "calculateLayout",
    function (originalMethod, width = NaN, height = NaN, direction = F2.DIRECTION_LTR) {
      return originalMethod.call(this, width, height, direction);
    }
  );

  // Return enhanced Yoga API and constants
  return {
    Config: YogaWasmBindings.Config,
    Node: YogaWasmBindings.Node,
    ...F2
  };
}

module.exports = createYogaFactory;