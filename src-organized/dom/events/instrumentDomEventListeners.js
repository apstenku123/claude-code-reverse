/**
 * Instruments DOM event listeners for 'click' and 'keypress' events to enable custom handler injection and tracking.
 *
 * This function patches the addEventListener and removeEventListener methods on EventTarget and Node prototypes
 * to inject custom handlers for 'click' and 'keypress' events, allowing for instrumentation (e.g., for error tracking).
 * It also attaches global listeners to the document for these events.
 *
 * @function instrumentDomEventListeners
 * @returns {void} Does not return a value
 */
function instrumentDomEventListeners() {
  // Ensure the document object is available
  if (!by.document) return;

  /**
   * Handler function that will be triggered for DOM events.
   * Bound to 'dom' event type.
   */
  const domEventHandler = jE1.triggerHandlers.bind(null, "dom");

  /**
   * Global event listener for document-level 'click' and 'keypress' events.
   * The second argument (true) may indicate capturing phase or a config flag.
   */
  const globalDomEventListener = createSentryEventHandler(domEventHandler, true);

  // Attach global listeners to the document for 'click' and 'keypress' events
  by.document.addEventListener("click", globalDomEventListener, false);
  by.document.addEventListener("keypress", globalDomEventListener, false);

  // List of prototypes to patch
  ["EventTarget", "Node"].forEach((prototypeName) => {
    const prototype = by[prototypeName] && by[prototypeName].prototype;
    if (!prototype || !prototype.hasOwnProperty || !prototype.hasOwnProperty("addEventListener")) {
      return;
    }

    // Patch addEventListener to inject instrumentation handler for 'click' and 'keypress'
    z21.fill(prototype, "addEventListener", function (originalAddEventListener) {
      return function (eventType, listener, options) {
        if (eventType === "click" || eventType === "keypress") {
          try {
            const target = this;
            // Store instrumentation handlers on the target instance
            const instrumentationHandlers = target.__sentry_instrumentation_handlers__ = target.__sentry_instrumentation_handlers__ || {};
            const handlerData = instrumentationHandlers[eventType] = instrumentationHandlers[eventType] || { refCount: 0 };
            if (!handlerData.handler) {
              // Create and store the instrumentation handler
              const instrumentationHandler = createSentryEventHandler(domEventHandler);
              handlerData.handler = instrumentationHandler;
              // Attach the instrumentation handler
              originalAddEventListener.call(this, eventType, instrumentationHandler, options);
            }
            handlerData.refCount++;
          } catch (error) {
            // Suppress errors to avoid breaking addEventListener
          }
        }
        // Always call the original addEventListener
        return originalAddEventListener.call(this, eventType, listener, options);
      };
    });

    // Patch removeEventListener to manage instrumentation handler lifecycle
    z21.fill(prototype, "removeEventListener", function (originalRemoveEventListener) {
      return function (eventType, listener, options) {
        if (eventType === "click" || eventType === "keypress") {
          try {
            const target = this;
            const instrumentationHandlers = target.__sentry_instrumentation_handlers__ || {};
            const handlerData = instrumentationHandlers[eventType];
            if (handlerData) {
              handlerData.refCount--;
              if (handlerData.refCount <= 0) {
                // Remove the instrumentation handler when no longer needed
                originalRemoveEventListener.call(this, eventType, handlerData.handler, options);
                handlerData.handler = undefined;
                delete instrumentationHandlers[eventType];
              }
              // Clean up the handlers object if empty
              if (Object.keys(instrumentationHandlers).length === 0) {
                delete target.__sentry_instrumentation_handlers__;
              }
            }
          } catch (error) {
            // Suppress errors to avoid breaking removeEventListener
          }
        }
        // Always call the original removeEventListener
        return originalRemoveEventListener.call(this, eventType, listener, options);
      };
    });
  });
}

module.exports = instrumentDomEventListeners;