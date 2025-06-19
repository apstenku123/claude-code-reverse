/**
 * Instruments DOM event handlers (click and keypress) to enable custom trigger handling and tracking.
 *
 * This function patches addEventListener and removeEventListener on EventTarget and Node prototypes
 * to intercept 'click' and 'keypress' events, allowing for custom instrumentation logic (e.g., for monitoring or analytics).
 * It also attaches global listeners to the document for these events.
 *
 * @returns {void} Does not return a value.
 */
function instrumentDomEventHandlers() {
  // Ensure 'by.document' exists before proceeding
  if (!by.document) return;

  /**
   * Handler function that triggers custom logic for DOM events.
   * Bound to the 'dom' event type.
   */
  const domEventHandler = jE1.triggerHandlers.bind(null, "dom");

  /**
   * Event listener function for document-level instrumentation (captures events in capture phase).
   */
  const documentEventListener = createSentryEventHandler(domEventHandler, true);

  // Attach global listeners for 'click' and 'keypress' events on the document
  by.document.addEventListener("click", documentEventListener, false);
  by.document.addEventListener("keypress", documentEventListener, false);

  // List of prototypes to patch
  ["EventTarget", "Node"].forEach((prototypeName) => {
    const prototype = by[prototypeName] && by[prototypeName].prototype;
    // Ensure the prototype exists and has its own addEventListener
    if (!prototype || !prototype.hasOwnProperty || !prototype.hasOwnProperty("addEventListener")) return;

    // Patch addEventListener to instrument 'click' and 'keypress' events
    z21.fill(prototype, "addEventListener", function (originalAddEventListener) {
      return function (eventType, listener, options) {
        if (eventType === "click" || eventType === "keypress") {
          try {
            const target = this;
            // Attach or retrieve the instrumentation handler storage on the target
            const instrumentationHandlers = target.__sentry_instrumentation_handlers__ = target.__sentry_instrumentation_handlers__ || {};
            // Get or create the handler record for this event type
            const handlerRecord = instrumentationHandlers[eventType] = instrumentationHandlers[eventType] || { refCount: 0 };
            // If no handler is attached yet, create and attach isBlobOrFileLikeObject
            if (!handlerRecord.handler) {
              const handler = createSentryEventHandler(domEventHandler);
              handlerRecord.handler = handler;
              originalAddEventListener.call(this, eventType, handler, options);
            }
            handlerRecord.refCount++;
          } catch (error) {
            // Swallow errors to avoid breaking event registration
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
            const handlerRecord = instrumentationHandlers[eventType];
            if (handlerRecord) {
              handlerRecord.refCount--;
              // If no more references, remove the instrumentation handler
              if (handlerRecord.refCount <= 0) {
                originalRemoveEventListener.call(this, eventType, handlerRecord.handler, options);
                handlerRecord.handler = undefined;
                delete instrumentationHandlers[eventType];
              }
              // If no more handlers, remove the storage object
              if (Object.keys(instrumentationHandlers).length === 0) {
                delete target.__sentry_instrumentation_handlers__;
              }
            }
          } catch (error) {
            // Swallow errors to avoid breaking event removal
          }
        }
        // Always call the original removeEventListener
        return originalRemoveEventListener.call(this, eventType, listener, options);
      };
    });
  });
}

module.exports = instrumentDomEventHandlers;