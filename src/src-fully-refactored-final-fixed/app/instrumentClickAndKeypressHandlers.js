/**
 * Instruments addEventListener and removeEventListener for 'click' and 'keypress' events
 * to ensure custom handlers are attached and removed correctly for Sentry instrumentation.
 *
 * This function monkey-patches EventTarget and Node prototypes to wrap their event listener methods,
 * tracking handler references and reference counts to avoid duplicate instrumentation and ensure cleanup.
 *
 * @returns {void} No return value.
 */
function instrumentClickAndKeypressHandlers() {
  // Ensure 'by.document' exists before proceeding
  if (!by.document) return;

  // Handler function to be triggered for 'dom' events
  const domEventHandler = jE1.triggerHandlers.bind(null, "dom");

  // Create a wrapper handler for document-level instrumentation
  const documentEventListener = createSentryEventHandler(domEventHandler, true);

  // Attach instrumentation handlers to the document for 'click' and 'keypress' events
  by.document.addEventListener("click", documentEventListener, false);
  by.document.addEventListener("keypress", documentEventListener, false);

  // List of prototypes to patch
  const prototypesToPatch = ["EventTarget", "Node"];

  prototypesToPatch.forEach((prototypeName) => {
    const prototype = by[prototypeName] && by[prototypeName].prototype;
    if (!prototype || !prototype.hasOwnProperty || !prototype.hasOwnProperty("addEventListener")) {
      return;
    }

    // Patch addEventListener to inject instrumentation handler
    z21.fill(prototype, "addEventListener", function (originalAddEventListener) {
      return function (eventType, listener, options) {
        // Only instrument 'click' and 'keypress' events
        if (eventType === "click" || eventType === "keypress") {
          try {
            const target = this;
            // Store instrumentation handlers on the target instance
            const instrumentationHandlers = target.__sentry_instrumentation_handlers__ =
              target.__sentry_instrumentation_handlers__ || {};
            // Track handler info for this event type
            const handlerInfo = instrumentationHandlers[eventType] =
              instrumentationHandlers[eventType] || { refCount: 0 };

            // If no handler is attached yet, create and attach isBlobOrFileLikeObject
            if (!handlerInfo.handler) {
              const handler = createSentryEventHandler(domEventHandler);
              handlerInfo.handler = handler;
              originalAddEventListener.call(this, eventType, handler, options);
            }
            handlerInfo.refCount++;
          } catch (error) {
            // Swallow errors to avoid breaking addEventListener
          }
        }
        // Always call the original addEventListener
        return originalAddEventListener.call(this, eventType, listener, options);
      };
    });

    // Patch removeEventListener to manage instrumentation handler cleanup
    z21.fill(prototype, "removeEventListener", function (originalRemoveEventListener) {
      return function (eventType, listener, options) {
        // Only handle 'click' and 'keypress' events
        if (eventType === "click" || eventType === "keypress") {
          try {
            const target = this;
            const instrumentationHandlers = target.__sentry_instrumentation_handlers__ || {};
            const handlerInfo = instrumentationHandlers[eventType];
            if (handlerInfo) {
              handlerInfo.refCount--;
              // If no more references, remove the handler and clean up
              if (handlerInfo.refCount <= 0) {
                originalRemoveEventListener.call(this, eventType, handlerInfo.handler, options);
                handlerInfo.handler = undefined;
                delete instrumentationHandlers[eventType];
              }
              // If no handlers remain, remove the property
              if (Object.keys(instrumentationHandlers).length === 0) {
                delete target.__sentry_instrumentation_handlers__;
              }
            }
          } catch (error) {
            // Swallow errors to avoid breaking removeEventListener
          }
        }
        // Always call the original removeEventListener
        return originalRemoveEventListener.call(this, eventType, listener, options);
      };
    });
  });
}

module.exports = instrumentClickAndKeypressHandlers;
