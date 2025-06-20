/**
 * Initializes and attaches the React DevTools global hook to the provided window-like object.
 * This hook enables React DevTools to interact with React renderers, manage console overrides,
 * handle event subscriptions, and track internal module ranges for debugging purposes.
 *
 * @param {Object} globalObject - The global object (typically window) to attach the hook to.
 * @returns {Object|null} The React DevTools global hook interface, or null if already present.
 */
function initializeReactDevtoolsGlobalHook(globalObject) {
  // If the hook already exists, do not re-initialize
  if (globalObject.hasOwnProperty("__REACT_DEVTOOLS_GLOBAL_HOOK__")) {
    return null;
  }

  // Store the original console and a copy of its methods
  let originalConsole = console;
  const originalConsoleMethods = {};
  for (const methodName in console) {
    originalConsoleMethods[methodName] = console[methodName];
  }

  /**
   * Updates the reference to the console object and refreshes the method cache.
   * @param {Console} newConsole
   */
  function setConsole(newConsole) {
    originalConsole = newConsole;
    for (const methodName in originalConsole) {
      originalConsoleMethods[methodName] = originalConsole[methodName];
    }
  }

  /**
   * Determines the build type of a React renderer instance.
   * @param {Object} renderer
   * @returns {string} The build type: 'development', 'production', 'unminified', or 'outdated'.
   */
  function getReactBuildType(renderer) {
    try {
      if (typeof renderer.version === "string") {
        if (renderer.bundleType > 0) return "development";
        return "production";
      }
      const fnToString = Function.prototype.toString;
      if (renderer.Mount && renderer.Mount._renderNewRootComponent) {
        const renderFnSource = fnToString.call(renderer.Mount._renderNewRootComponent);
        if (!renderFnSource.startsWith("function")) return "production";
        if (renderFnSource.includes("storedMeasure")) return "development";
        if (renderFnSource.includes("should be a pure function")) {
          if (renderFnSource.includes("NODE_ENV")) return "development";
          if (renderFnSource.includes("development")) return "development";
          if (renderFnSource.includes("true")) return "development";
          if (renderFnSource.includes("nextElement") || renderFnSource.includes("nextComponent")) return "unminified";
          return "development";
        }
        if (renderFnSource.includes("nextElement") || renderFnSource.includes("nextComponent")) return "unminified";
        return "outdated";
      }
    } catch (error) {}
    return "production";
  }

  /**
   * Checks for dead code elimination (DCE) in React builds.
   * Throws an error asynchronously if DCE has not been applied.
   * @param {Function} fn
   */
  function checkDeadCodeElimination(fn) {
    try {
      const fnToString = Function.prototype.toString;
      const fnSource = fnToString.call(fn);
      if (fnSource.includes("^_^")) {
        isDeadCodeDetected = true;
        setTimeout(function () {
          throw new Error(
            "React is running in production mode, but dead code elimination has not been applied. " +
            "Read how to correctly configure React for production: https://react.dev/link/perf-use-production-build"
          );
        });
      }
    } catch (error) {}
  }

  /**
   * Formats console arguments for styling, if appropriate.
   * @param {Array} args
   * @param {string} style
   * @returns {Array}
   */
  function formatConsoleArgsWithStyle(args, style) {
    if (
      args === undefined ||
      args === null ||
      args.length === 0 ||
      (typeof args[0] === "string" && args[0].match(/([^%]|^)(%c)/g)) ||
      style === undefined
    ) {
      return args;
    }
    const formatSpecifierRegex = /([^%]|^)((%%)*)(%([oOdisf]))/g;
    if (typeof args[0] === "string" && args[0].match(formatSpecifierRegex)) {
      return ["%c".concat(args[0]), style, ...sk(args.slice(1))];
    } else {
      // Build a format string based on argument types
      const formatString = args.reduce((acc, arg, idx) => {
        if (idx > 0) acc += " ";
        switch (getTypeWithSymbolSupport(arg)) {
          case "string":
          case "boolean":
          case "symbol":
            acc += "%createInteractionAccessor";
            break;
          case "number":
            acc += Number.isInteger(arg) ? "%i" : "%f";
            break;
          default:
            acc += "%processSubLanguageHighlighting";
        }
        return acc;
      }, "%c");
      return [formatString, style, ...sk(args)];
    }
  }

  /**
   * Formats console arguments, replacing format specifiers with actual values.
   * @param {string} format
   * @param {...any} rest
   * @returns {Array}
   */
  function formatConsoleArgs(format, ...rest) {
    if (rest.length === 0 || typeof format !== "string") {
      return [format, ...rest];
    }
    const remainingArgs = rest.slice();
    let formattedString = "";
    let argIndex = 0;
    for (let i = 0; i < format.length; ++i) {
      const char = format[i];
      if (char !== "%") {
        formattedString += char;
        continue;
      }
      const nextChar = format[++i];
      switch (nextChar) {
        case "c":
        case "createDebouncedFunction":
        case "processSubLanguageHighlighting":
          ++argIndex;
          formattedString += `%${nextChar}`;
          break;
        case "d":
        case "i": {
          const [intArg] = Cp(remainingArgs.splice(argIndex, 1), 1);
          formattedString += parseInt(intArg, 10).toString();
          break;
        }
        case "f": {
          const [floatArg] = Cp(remainingArgs.splice(argIndex, 1), 1);
          formattedString += parseFloat(floatArg).toString();
          break;
        }
        case "createInteractionAccessor": {
          const [strArg] = Cp(remainingArgs.splice(argIndex, 1), 1);
          formattedString += strArg.toString();
          break;
        }
      }
    }
    return [formattedString, ...sk(remainingArgs)];
  }

  // Used to restore console methods when unpatching
  let restoreConsoleMethods = null;

  /**
   * Patches the console methods to override them in strict mode.
   * @param {boolean} hideLogsInStrictMode
   */
  function patchConsoleForStrictMode(hideLogsInStrictMode) {
    const methodsToPatch = [
      "error",
      "group",
      "groupCollapsed",
      "info",
      "log",
      "trace",
      "warn"
    ];
    if (restoreConsoleMethods !== null) return;
    const backupMethods = {};
    restoreConsoleMethods = function restore() {
      for (const methodName in backupMethods) {
        try {
          originalConsole[methodName] = backupMethods[methodName];
        } catch (error) {}
      }
    };
    methodsToPatch.forEach(function (methodName) {
      try {
        const originalMethod = backupMethods[methodName] = originalConsole[methodName].__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__
          ? originalConsole[methodName].__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__
          : originalConsole[methodName];
        const overrideMethod = function (...args) {
          if (!hideLogsInStrictMode) {
            originalMethod.apply(
              undefined,
              [STRICT_MODE_CONSOLE_STYLE, ...sk(formatConsoleArgs(...args))]
            );
          }
        };
        overrideMethod.__REACT_DEVTOOLS_STRICT_MODE_ORIGINAL_METHOD__ = originalMethod;
        originalMethod.__REACT_DEVTOOLS_STRICT_MODE_OVERRIDE_METHOD__ = overrideMethod;
        originalConsole[methodName] = overrideMethod;
      } catch (error) {}
    });
  }

  /**
   * Restores the original console methods if they were patched.
   */
  function unpatchConsoleForStrictMode() {
    if (restoreConsoleMethods !== null) {
      restoreConsoleMethods();
      restoreConsoleMethods = null;
    }
  }

  // Used to generate unique renderer IDs
  let rendererIdCounter = 0;
  let isDeadCodeDetected = false;

  /**
   * Injects a React renderer and returns its assigned updateSnapshotAndNotify.
   * Also registers the renderer interface and emits a 'renderer' event.
   * @param {Object} renderer
   * @returns {number} The renderer updateSnapshotAndNotify
   */
  function injectRenderer(renderer) {
    const rendererId = ++rendererIdCounter;
    renderersMap.set(rendererId, renderer);
    const buildType = isDeadCodeDetected ? "deadcode" : getReactBuildType(renderer);

    // If the global object provides custom console patching, use isBlobOrFileLikeObject
    if (globalObject.hasOwnProperty("__REACT_DEVTOOLS_CONSOLE_FUNCTIONS__")) {
      const {
        registerRendererWithConsole,
        patchConsoleUsingWindowValues
      } = globalObject.__REACT_DEVTOOLS_CONSOLE_FUNCTIONS__;
      if (typeof registerRendererWithConsole === "function" && typeof patchConsoleUsingWindowValues === "function") {
        registerRendererWithConsole(renderer);
        patchConsoleUsingWindowValues();
      }
    }

    // If the global object provides a custom attach function, use isBlobOrFileLikeObject
    const attachFn = globalObject.__REACT_DEVTOOLS_ATTACH__;
    if (typeof attachFn === "function") {
      const rendererInterface = attachFn(devtoolsHook, rendererId, renderer, globalObject);
      devtoolsHook.rendererInterfaces.set(rendererId, rendererInterface);
    }

    devtoolsHook.emit("renderer", {
      id: rendererId,
      renderer,
      reactBuildType: buildType
    });
    return rendererId;
  }

  /**
   * Subscribes to an event and returns an unsubscribe function.
   * @param {string} eventName
   * @param {Function} listener
   * @returns {Function} Unsubscribe function
   */
  function subscribe(eventName, listener) {
    devtoolsHook.on(eventName, listener);
    return function unsubscribe() {
      devtoolsHook.off(eventName, listener);
    };
  }

  /**
   * Registers an event listener for the given event name.
   * @param {string} eventName
   * @param {Function} listener
   */
  function on(eventName, listener) {
    if (!eventListeners[eventName]) {
      eventListeners[eventName] = [];
    }
    eventListeners[eventName].push(listener);
  }

  /**
   * Removes an event listener for the given event name.
   * @param {string} eventName
   * @param {Function} listener
   */
  function off(eventName, listener) {
    if (!eventListeners[eventName]) return;
    const index = eventListeners[eventName].indexOf(listener);
    if (index !== -1) {
      eventListeners[eventName].splice(index, 1);
    }
    if (eventListeners[eventName].length === 0) {
      delete eventListeners[eventName];
    }
  }

  /**
   * Emits an event to all registered listeners.
   * @param {string} eventName
   * @param {any} payload
   */
  function emit(eventName, payload) {
    if (eventListeners[eventName]) {
      eventListeners[eventName].forEach(listener => listener(payload));
    }
  }

  /**
   * Returns the set of fiber roots for a given renderer updateSnapshotAndNotify.
   * @param {number} rendererId
   * @returns {Set}
   */
  function getFiberRoots(rendererId) {
    if (!fiberRootsByRenderer[rendererId]) {
      fiberRootsByRenderer[rendererId] = new Set();
    }
    return fiberRootsByRenderer[rendererId];
  }

  /**
   * Notifies the renderer interface of a fiber unmount.
   * @param {number} rendererId
   * @param {any} fiber
   */
  function onCommitFiberUnmount(rendererId, fiber) {
    const rendererInterface = rendererInterfacesMap.get(rendererId);
    if (rendererInterface != null) {
      rendererInterface.handleCommitFiberUnmount(fiber);
    }
  }

  /**
   * Notifies the renderer interface of a fiber root commit.
   * @param {number} rendererId
   * @param {any} fiberRoot
   * @param {any} priorityLevel
   */
  function onCommitFiberRoot(rendererId, fiberRoot, priorityLevel) {
    const fiberRoots = devtoolsHook.getFiberRoots(rendererId);
    const currentFiber = fiberRoot.current;
    const isKnownRoot = fiberRoots.has(fiberRoot);
    const isUnmounted = currentFiber.memoizedState == null || currentFiber.memoizedState.element == null;
    if (!isKnownRoot && !isUnmounted) {
      fiberRoots.add(fiberRoot);
    } else if (isKnownRoot && isUnmounted) {
      fiberRoots.delete(fiberRoot);
    }
    const rendererInterface = rendererInterfacesMap.get(rendererId);
    if (rendererInterface != null) {
      rendererInterface.handleCommitFiberRoot(fiberRoot, priorityLevel);
    }
  }

  /**
   * Notifies the renderer interface after a fiber root commit.
   * @param {number} rendererId
   * @param {any} fiberRoot
   */
  function onPostCommitFiberRoot(rendererId, fiberRoot) {
    const rendererInterface = rendererInterfacesMap.get(rendererId);
    if (rendererInterface != null) {
      rendererInterface.handlePostCommitFiberRoot(fiberRoot);
    }
  }

  /**
   * Handles patching/unpatching the console for strict mode, depending on the renderer interface.
   * @param {number} rendererId
   * @param {boolean} enableStrictMode
   */
  function setStrictMode(rendererId, enableStrictMode) {
    const rendererInterface = rendererInterfacesMap.get(rendererId);
    if (rendererInterface != null) {
      if (enableStrictMode) {
        rendererInterface.patchConsoleForStrictMode();
      } else {
        rendererInterface.unpatchConsoleForStrictMode();
      }
    } else if (enableStrictMode) {
      const hideLogs = window.__REACT_DEVTOOLS_HIDE_CONSOLE_LOGS_IN_STRICT_MODE__ === true;
      patchConsoleForStrictMode(hideLogs);
    } else {
      unpatchConsoleForStrictMode();
    }
  }

  // Internal module tracking for debugging
  const internalModuleStartStack = [];
  const internalModuleRanges = [];

  /**
   * Extracts the second line from an error stack trace.
   * @param {Error} error
   * @returns {string|null}
   */
  function getSecondStackLine(error) {
    const lines = error.stack.split("\n");
    return lines.length > 1 ? lines[1] : null;
  }

  /**
   * Returns the list of internal module ranges.
   * @returns {Array}
   */
  function getInternalModuleRanges() {
    return internalModuleRanges;
  }

  /**
   * Registers the start of an internal module (for debugging purposes).
   * @param {Error} error
   */
  function registerInternalModuleStart(error) {
    const stackLine = getSecondStackLine(error);
    if (stackLine !== null) {
      internalModuleStartStack.push(stackLine);
    }
  }

  /**
   * Registers the stop of an internal module (for debugging purposes).
   * @param {Error} error
   */
  function registerInternalModuleStop(error) {
    if (internalModuleStartStack.length > 0) {
      const startStackLine = internalModuleStartStack.pop();
      const stopStackLine = getSecondStackLine(error);
      if (stopStackLine !== null) {
        internalModuleRanges.push([startStackLine, stopStackLine]);
      }
    }
  }

  // Data structures for the hook
  const fiberRootsByRenderer = {};
  const rendererInterfacesMap = new Map();
  const eventListeners = {};
  const renderersMap = new Map();
  const backendMap = new Map();

  // The style string used for strict mode console overrides
  const STRICT_MODE_CONSOLE_STYLE = typeof BA !== 'undefined' ? BA : '';

  // The DevTools global hook interface
  const devtoolsHook = {
    rendererInterfaces: rendererInterfacesMap,
    listeners: eventListeners,
    backends: backendMap,
    renderers: renderersMap,
    emit,
    getFiberRoots,
    inject: injectRenderer,
    on,
    off,
    sub: subscribe,
    supportsFiber: true,
    checkDCE: checkDeadCodeElimination,
    onCommitFiberUnmount,
    onCommitFiberRoot,
    onPostCommitFiberRoot,
    setStrictMode,
    getInternalModuleRanges,
    registerInternalModuleStart,
    registerInternalModuleStop
  };

  // Attach the hook to the global object
  Object.defineProperty(globalObject, "__REACT_DEVTOOLS_GLOBAL_HOOK__", {
    configurable: false,
    enumerable: false,
    get: function () {
      return devtoolsHook;
    }
  });

  return devtoolsHook;
}

module.exports = initializeReactDevtoolsGlobalHook;