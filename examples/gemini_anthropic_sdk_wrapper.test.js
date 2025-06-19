const GeminiAnthropicSDKWrapper = require('./gemini_anthropic_sdk_wrapper');

// Mock the @google/generative-ai library
jest.mock("@google/generative-ai", () => {
    const mockGetGenerativeModel = jest.fn().mockReturnValue({
        generateContentStream: jest.fn(),
        countTokens: jest.fn(), // Mock countTokens
    });
    const mockGoogleGenerativeAI = jest.fn().mockImplementation(() => ({
        getGenerativeModel: mockGetGenerativeModel,
    }));
    return {
        GoogleGenerativeAI: mockGoogleGenerativeAI,
        HarmCategory: {
            HARM_CATEGORY_HARASSMENT: "HARM_CATEGORY_HARASSMENT",
            HARM_CATEGORY_HATE_SPEECH: "HARM_CATEGORY_HATE_SPEECH",
            HARM_CATEGORY_SEXUALLY_EXPLICIT: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
            HARM_CATEGORY_DANGEROUS_CONTENT: "HARM_CATEGORY_DANGEROUS_CONTENT",
        },
        HarmBlockThreshold: {
            BLOCK_NONE: "BLOCK_NONE",
        },
    };
});

describe('GeminiAnthropicSDKWrapper', () => {
    let wrapper;
    const mockApiKey = 'test-gemini-api-key';

    beforeEach(() => {
        // Clear all instances and calls to constructor and all methods:
        jest.clearAllMocks();
        wrapper = new GeminiAnthropicSDKWrapper(mockApiKey, 'gemini-2.5-pro-preview-05-06');
        // You might want to enable debug for tests to see logs if needed
        // wrapper.debug = true; 
    });

    describe('_transformClaudeRequestToGemini', () => {
        it('should transform a simple text-only Claude request', () => {
            const claudeRequest = {
                model: "claude-3-opus-20240229",
                messages: [{ role: "user", content: "Hello, world!" }],
                max_tokens: 100,
                temperature: 0.7,
            };
            const geminiRequest = wrapper._transformClaudeRequestToGemini(claudeRequest);

            expect(geminiRequest.contents).toEqual([
                { role: "user", parts: [{ text: "Hello, world!" }] },
            ]);
            expect(geminiRequest.generationConfig.maxOutputTokens).toBe(100);
            expect(geminiRequest.generationConfig.temperature).toBe(0.7);
            expect(geminiRequest.systemInstruction).toBeNull();
            expect(geminiRequest.tools).toEqual([]);
        });

        it('should transform a Claude request with a system prompt', () => {
            const claudeRequest = {
                model: "claude-3-opus-20240229",
                system: "You are a helpful assistant.",
                messages: [{ role: "user", content: "How are you?" }],
            };
            const geminiRequest = wrapper._transformClaudeRequestToGemini(claudeRequest);

            expect(geminiRequest.systemInstruction).toEqual({
                role: "system",
                parts: [{ text: "You are a helpful assistant." }],
            });
            expect(geminiRequest.contents).toEqual([
                { role: "user", parts: [{ text: "How are you?" }] },
            ]);
        });

        it('should transform a Claude request with multiple messages (user and assistant)', () => {
            const claudeRequest = {
                model: "claude-3-sonnet-20240229",
                messages: [
                    { role: "user", content: "First question?" },
                    { role: "assistant", content: "First answer." },
                    { role: "user", content: "Second question?" },
                ],
            };
            const geminiRequest = wrapper._transformClaudeRequestToGemini(claudeRequest);

            expect(geminiRequest.contents).toEqual([
                { role: "user", parts: [{ text: "First question?" }] },
                { role: "model", parts: [{ text: "First answer." }] }, // Gemini uses "model"
                { role: "user", parts: [{ text: "Second question?" }] },
            ]);
        });

        it('should transform Claude messages with array content (text block)', () => {
            const claudeRequest = {
                model: "claude-3-haiku-20240307",
                messages: [
                    { 
                        role: "user", 
                        content: [
                            { type: "text", text: "Hello there." }
                        ] 
                    }
                ],
            };
            const geminiRequest = wrapper._transformClaudeRequestToGemini(claudeRequest);
            expect(geminiRequest.contents).toEqual([
                { role: "user", parts: [{ text: "Hello there." }] },
            ]);
        });

        it('should correctly map generation parameters', () => {
            const claudeRequest = {
                model: "claude-3-opus-20240229",
                messages: [{ role: "user", content: "Test params" }],
                max_tokens: 2048,
                temperature: 0.5,
                top_p: 0.9,
                top_k: 40,
                stop_sequences: ["\nUser:", "\nAssistant:"],
            };
            const geminiRequest = wrapper._transformClaudeRequestToGemini(claudeRequest);

            expect(geminiRequest.generationConfig.maxOutputTokens).toBe(2048);
            expect(geminiRequest.generationConfig.temperature).toBe(0.5);
            expect(geminiRequest.generationConfig.topP).toBe(0.9);
            expect(geminiRequest.generationConfig.topK).toBe(40);
            expect(geminiRequest.generationConfig.stopSequences).toEqual(["\nUser:", "\nAssistant:"]);
        });

        describe('Tool Transformation', () => {
            const claudeTool = {
                name: "get_weather",
                description: "Get the current weather in a given location",
                input_schema: {
                    type: "object",
                    properties: {
                        location: { type: "string", description: "The city and state, e.g. San Francisco, CA" },
                        unit: { type: "string", enum: ["celsius", "fahrenheit"], description: "Unit for temperature" }
                    },
                    required: ["location"]
                }
            };

            it('should transform Claude tools to Gemini function declarations', () => {
                const claudeRequest = {
                    model: "claude-3-opus-20240229",
                    messages: [{ role: "user", content: "What's the weather in London?" }],
                    tools: [claudeTool],
                };
                const geminiRequest = wrapper._transformClaudeRequestToGemini(claudeRequest);

                expect(geminiRequest.tools).toEqual([{
                    functionDeclarations: [{
                        name: "get_weather",
                        description: "Get the current weather in a given location",
                        parameters: claudeTool.input_schema,
                    }]
                }]);
            });

            it('should handle tool_choice: "auto"', () => {
                const claudeRequest = {
                    messages: [{ role: "user", content: "Weather?" }],
                    tools: [claudeTool],
                    tool_choice: { type: "auto" }
                };
                const geminiRequest = wrapper._transformClaudeRequestToGemini(claudeRequest);
                expect(geminiRequest.toolConfig).toEqual({ functionCallingConfig: { mode: "AUTO" } });
            });
            
            it('should handle tool_choice: "any" (maps to AUTO for Gemini if tools present)', () => {
                const claudeRequest = {
                    messages: [{ role: "user", content: "Weather?" }],
                    tools: [claudeTool],
                    tool_choice: { type: "any" }
                };
                const geminiRequest = wrapper._transformClaudeRequestToGemini(claudeRequest);
                expect(geminiRequest.toolConfig).toEqual({ functionCallingConfig: { mode: "ANY" } });
            });

            it('should handle tool_choice: "tool" for a specific tool', () => {
                const claudeRequest = {
                    messages: [{ role: "user", content: "Weather in Paris?" }],
                    tools: [claudeTool, { name: "other_tool", description: "...", input_schema: {} }],
                    tool_choice: { type: "tool", name: "get_weather" }
                };
                const geminiRequest = wrapper._transformClaudeRequestToGemini(claudeRequest);
                expect(geminiRequest.toolConfig).toEqual({
                    functionCallingConfig: {
                        mode: "ANY",
                        allowedFunctionNames: ["get_weather"]
                    }
                });
            });
            
            it('should default tool_choice to AUTO if chosen tool in "tool" type does not exist', () => {
                const claudeRequest = {
                    messages: [{ role: "user", content: "Weather in Paris?" }],
                    tools: [claudeTool],
                    tool_choice: { type: "tool", name: "non_existent_tool" }
                };
                // Suppress console.warn for this specific test
                const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
                const geminiRequest = wrapper._transformClaudeRequestToGemini(claudeRequest);
                expect(geminiRequest.toolConfig).toEqual({ functionCallingConfig: { mode: "AUTO" } });
                expect(consoleWarnSpy).toHaveBeenCalledWith(
                    "[GeminiWrapper] Chosen tool 'non_existent_tool' not found in tool declarations. Defaulting to AUTO mode for toolConfig."
                );
                consoleWarnSpy.mockRestore();
            });

            it('should warn and ignore tool_choice if no tools are defined', () => {
                const claudeRequest = {
                    messages: [{ role: "user", content: "Hello" }],
                    tool_choice: { type: "auto" } // No tools defined
                };
                const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
                const geminiRequest = wrapper._transformClaudeRequestToGemini(claudeRequest);
                expect(geminiRequest.toolConfig).toBeUndefined(); // Or whatever the default is when not set
                expect(consoleWarnSpy).toHaveBeenCalledWith(
                    "[GeminiWrapper] 'tool_choice' was provided, but no tools were defined. Ignoring 'tool_choice'."
                );
                consoleWarnSpy.mockRestore();
            });


            it('should transform assistant message with tool_use to Gemini model message with functionCall', () => {
                const claudeRequest = {
                    messages: [
                        { role: "user", content: "What is the weather in Boston?" },
                        {
                            role: "assistant",
                            content: [
                                {
                                    type: "tool_use",
                                    id: "toolu_01ABC",
                                    name: "get_weather",
                                    input: { location: "Boston, MA", unit: "fahrenheit" }
                                }
                            ]
                        }
                    ]
                };
                const geminiRequest = wrapper._transformClaudeRequestToGemini(claudeRequest);
                expect(geminiRequest.contents[1]).toEqual({
                    role: "model",
                    parts: [{
                        functionCall: {
                            name: "get_weather",
                            args: { location: "Boston, MA", unit: "fahrenheit" }
                        }
                    }]
                });
                // Check if tool call was stored (optional, internal detail but good for debugging)
                expect(wrapper.currentToolCalls.get("toolu_01ABC")).toEqual({
                    name: "get_weather",
                    input: { location: "Boston, MA", unit: "fahrenheit" }
                });
            });

            describe('Tool Result Transformation (tool_result)', () => {
                beforeEach(() => {
                    // Ensure currentToolCalls is clean before each tool_result test
                    // and populated as if an assistant message with tool_use was processed.
                    wrapper.currentToolCalls.clear();
                });

                const processAssistantToolUse = (toolUseId, toolName, toolInput) => {
                    // Helper to simulate the state after an assistant's tool_use message part
                    // This populates wrapper.currentToolCalls
                    const assistantMessage = {
                        role: "assistant",
                        content: [{ type: "tool_use", id: toolUseId, name: toolName, input: toolInput }]
                    };
                    wrapper._transformClaudeRequestToGemini({ messages: [assistantMessage] });
                };

                it('should transform user message with tool_result (string content)', () => {
                    const toolUseId = "toolu_01XYZ";
                    const toolName = "get_weather";
                    processAssistantToolUse(toolUseId, toolName, { location: "SF" });

                    const claudeRequest = {
                        messages: [
                            // ... previous messages ...
                            { role: "assistant", content: [{ type: "tool_use", id: toolUseId, name: toolName, input: { location: "SF" } }] },
                            {
                                role: "user",
                                content: [
                                    { type: "tool_result", tool_use_id: toolUseId, content: "70F and sunny" }
                                ]
                            }
                        ]
                    };
                    const geminiRequest = wrapper._transformClaudeRequestToGemini(claudeRequest);
                    const functionResponsePart = geminiRequest.contents.find(c => c.role === "user").parts.find(p => p.functionResponse);
                    
                    expect(functionResponsePart.functionResponse).toEqual({
                        name: toolName,
                        response: { result: "70F and sunny" }
                    });
                });

                it('should transform tool_result with JSON string content', () => {
                    const toolUseId = "toolu_01JSON";
                    const toolName = "fetch_data";
                    processAssistantToolUse(toolUseId, toolName, { id: 1 });

                    const claudeRequest = {
                        messages: [
                            { role: "assistant", content: [{ type: "tool_use", id: toolUseId, name: toolName, input: { id: 1 } }] },
                            {
                                role: "user",
                                content: [
                                    { type: "tool_result", tool_use_id: toolUseId, content: JSON.stringify({ temp: 22, unit: "C" }) }
                                ]
                            }
                        ]
                    };
                    const geminiRequest = wrapper._transformClaudeRequestToGemini(claudeRequest);
                    const functionResponsePart = geminiRequest.contents.find(c => c.role === "user").parts.find(p => p.functionResponse);
                    expect(functionResponsePart.functionResponse).toEqual({
                        name: toolName,
                        response: { result: JSON.stringify({ temp: 22, unit: "C" }) }
                    });
                });

                it('should transform tool_result with actual JSON object content', () => {
                    const toolUseId = "toolu_01OBJ";
                    const toolName = "process_item";
                    processAssistantToolUse(toolUseId, toolName, { item_id: "abc" });
                    
                    const claudeRequest = {
                        messages: [
                             { role: "assistant", content: [{ type: "tool_use", id: toolUseId, name: toolName, input: { item_id: "abc" } }] },
                            {
                                role: "user",
                                content: [
                                    { type: "tool_result", tool_use_id: toolUseId, content: { status: "ok", data: "xyz" } }
                                ]
                            }
                        ]
                    };
                    const geminiRequest = wrapper._transformClaudeRequestToGemini(claudeRequest);
                    const functionResponsePart = geminiRequest.contents.find(c => c.role === "user").parts.find(p => p.functionResponse);
                    expect(functionResponsePart.functionResponse).toEqual({
                        name: toolName,
                        response: { result: { status: "ok", data: "xyz" } }
                    });
                });

                it('should handle tool_result with is_error: true', () => {
                    const toolUseId = "toolu_01ERR";
                    const toolName = "risky_operation";
                    processAssistantToolUse(toolUseId, toolName, { params: "test" });

                    const claudeRequest = {
                        messages: [
                            { role: "assistant", content: [{ type: "tool_use", id: toolUseId, name: toolName, input: { params: "test" } }] },
                            {
                                role: "user",
                                content: [
                                    { type: "tool_result", tool_use_id: toolUseId, content: "Operation failed due to timeout", is_error: true }
                                ]
                            }
                        ]
                    };
                    const geminiRequest = wrapper._transformClaudeRequestToGemini(claudeRequest);
                    const functionResponsePart = geminiRequest.contents.find(c => c.role === "user").parts.find(p => p.functionResponse);
                    expect(functionResponsePart.functionResponse).toEqual({
                        name: toolName,
                        response: { error: "Operation failed due to timeout" }
                    });
                });
                
                it('should handle tool_result with undefined content', () => {
                    const toolUseId = "toolu_01UNDEF";
                    const toolName = "void_function";
                    processAssistantToolUse(toolUseId, toolName, {});

                    const claudeRequest = {
                        messages: [
                            { role: "assistant", content: [{ type: "tool_use", id: toolUseId, name: toolName, input: {} }] },
                            {
                                role: "user",
                                content: [ { type: "tool_result", tool_use_id: toolUseId, content: undefined } ]
                            }
                        ]
                    };
                    const geminiRequest = wrapper._transformClaudeRequestToGemini(claudeRequest);
                    const functionResponsePart = geminiRequest.contents.find(c => c.role === "user").parts.find(p => p.functionResponse);
                    expect(functionResponsePart.functionResponse).toEqual({
                        name: toolName,
                        response: { result: null } // Current behavior maps undefined to null
                    });
                });

                it('should use fallback tool name if original tool_use_id not found in currentToolCalls but name is on tool_result', () => {
                    const consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});
                    const claudeRequest = {
                        messages: [
                            {
                                role: "user",
                                content: [
                                    { type: "tool_result", tool_use_id: "untracked_tool_id", name: "fallback_tool_name", content: "data" }
                                ]
                            }
                        ]
                    };
                    // wrapper.currentToolCalls is empty here, simulating untracked tool_use_id
                    const geminiRequest = wrapper._transformClaudeRequestToGemini(claudeRequest);
                    const functionResponsePart = geminiRequest.contents[0].parts.find(p => p.functionResponse);
                    expect(functionResponsePart.functionResponse.name).toBe("fallback_tool_name");
                    expect(functionResponsePart.functionResponse.response).toEqual({ result: "data" });
                    expect(consoleWarnSpy).toHaveBeenCalledWith(expect.stringContaining("Using name directly from tool_result block"));
                    consoleWarnSpy.mockRestore();
                });

                it('should use "unknown_tool_for_result" if tool name cannot be determined', () => {
                    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
                    const claudeRequest = {
                        messages: [
                            {
                                role: "user",
                                content: [
                                    { type: "tool_result", tool_use_id: "mystery_tool_id", content: "some output" }
                                    // No 'name' on tool_result, and 'mystery_tool_id' not in currentToolCalls
                                ]
                            }
                        ]
                    };
                    const geminiRequest = wrapper._transformClaudeRequestToGemini(claudeRequest);
                    const functionResponsePart = geminiRequest.contents[0].parts.find(p => p.functionResponse);
                    expect(functionResponsePart.functionResponse.name).toBe("unknown_tool_for_result");
                    expect(consoleErrorSpy).toHaveBeenCalledWith(expect.stringContaining("Could not determine original tool name"));
                    consoleErrorSpy.mockRestore();
                });
            });
        });

        // Add more tests for edge cases, multiple content blocks, different tool_choice scenarios, etc.
    });

    describe('_adaptGeminiStreamToClaudeStream', () => {
        // These tests will be more complex due to the async generator nature
        // and the need to mock Gemini's stream behavior.

        async function collectStream(stream) {
            const items = [];
            for await (const item of stream) {
                items.push(item);
            }
            return items;
        }
        
        const mockClaudeRequestPayload = {
            model: "claude-3-opus-20240229",
            messages: [{ role: "user", content: "Tell me a story." }],
            max_tokens: 150,
            stream: true
        };
        const mockGeminiRequest = { /* ... a transformed request ... */ };


        it('should yield message_start, text_delta, and message_stop for simple text response', async () => {
            const mockGeminiStream = (async function* () {
                yield { candidates: [{ content: { parts: [{ text: "Once " }] } }] };
                yield { candidates: [{ content: { parts: [{ text: "upon " }] } }] };
                yield { candidates: [{ content: { parts: [{ text: "a time..." }] }, finishReason: "STOP" }] };
            })();
            
            const mockGeminiStreamResult = {
                stream: mockGeminiStream,
                response: Promise.resolve({ // Mock aggregated response
                    candidates: [{ finishReason: "STOP", content: { parts: [{text: "Once upon a time..."}] } }],
                    usageMetadata: { promptTokenCount: 10, candidatesTokenCount: 5 }
                })
            };

            const claudeStream = wrapper._adaptGeminiStreamToClaudeStream(mockGeminiStreamResult, mockClaudeRequestPayload, mockGeminiRequest);
            const events = await collectStream(claudeStream);

            expect(events[0].type).toBe("message_start");
            expect(events[0].message.role).toBe("assistant");
            expect(events[0].message.model).toBe(mockClaudeRequestPayload.model);

            expect(events[1].type).toBe("content_block_start");
            expect(events[1].index).toBe(0);
            expect(events[1].content_block.type).toBe("text");

            expect(events[2].type).toBe("content_block_delta");
            expect(events[2].index).toBe(0);
            expect(events[2].delta.type).toBe("text_delta");
            expect(events[2].delta.text).toBe("Once ");
            
            // The current _adaptGeminiStreamToClaudeStream yields content_block_start for each new text part if not already in text.
            // So, we expect another start/delta pair for "upon " if it's treated as a new block by the mock.
            // Let's adjust the test based on current implementation which merges text.
            // The current implementation should yield one content_block_start, then multiple text_deltas for the same block.

            expect(events[3].type).toBe("content_block_delta");
            expect(events[3].index).toBe(0);
            expect(events[3].delta.text).toBe("upon ");

            expect(events[4].type).toBe("content_block_delta");
            expect(events[4].index).toBe(0);
            expect(events[4].delta.text).toBe("a time...");
            
            // Message delta for stop_reason
            const messageDeltaEvent = events.find(e => e.type === "message_delta");
            expect(messageDeltaEvent).toBeDefined();
            expect(messageDeltaEvent.delta.stop_reason).toBe("end_turn"); // Mapped from "STOP"

            expect(events[events.length - 1].type).toBe("message_stop");
            expect(claudeStream.request_id).toBe(events[0].message.id); // Check request_id
            
            // Test finalMessage
            const finalMessage = await claudeStream.finalMessage();
            expect(finalMessage.role).toBe("assistant");
            expect(finalMessage.content).toEqual([{ type: "text", text: "Once upon a time..." }]);
            expect(finalMessage.stop_reason).toBe("end_turn");
            expect(finalMessage.usage.input_tokens).toBe(10);
            expect(finalMessage.usage.output_tokens).toBe(5);
            expect(finalMessage.id).toBe(events[0].message.id);
        });
        
        it('should handle Gemini stream with a single function call and then stop', async () => {
            const mockGeminiFunctionCallStream = (async function* () {
                yield {
                    candidates: [{
                        content: {
                            parts: [{
                                functionCall: { name: "search_web", args: { query: "weather" } }
                            }]
                        },
                        finishReason: "TOOL_CALLS" // Finish reason can come with the call
                    }]
                };
            })();

            const mockGeminiStreamResultFn = {
                stream: mockGeminiFunctionCallStream,
                response: Promise.resolve({
                    candidates: [{
                        content: { parts: [{ functionCall: { name: "search_web", args: { query: "weather" } } }] },
                        finishReason: "TOOL_CALLS"
                    }],
                    usageMetadata: { promptTokenCount: 8, candidatesTokenCount: 4 }
                })
            };
            
            const claudeStream = wrapper._adaptGeminiStreamToClaudeStream(mockGeminiStreamResultFn, mockClaudeRequestPayload, mockGeminiRequest);
            const events = await collectStream(claudeStream);

            expect(events[0].type).toBe("message_start");
            const messageId = events[0].message.id;

            const cbStartTool = events.find(e => e.type === "content_block_start" && e.content_block.type === "tool_use");
            expect(cbStartTool).toBeDefined();
            expect(cbStartTool.content_block.name).toBe("search_web");
            expect(cbStartTool.content_block.id).toBeDefined();
            const toolUseId = cbStartTool.content_block.id;
            
            const cbDeltaTool = events.find(e => e.type === "content_block_delta" && e.delta.type === "input_json_delta");
            expect(cbDeltaTool).toBeDefined();
            expect(JSON.parse(cbDeltaTool.delta.partial_json)).toEqual({ query: "weather" });

            // Expect content_block_stop for the tool_use because the message ends with tool_use
            const cbStopTool = events.find(e => e.type === "content_block_stop" && e.index === cbStartTool.index);
            expect(cbStopTool).toBeDefined();


            const messageDeltaEvent = events.find(e => e.type === "message_delta");
            expect(messageDeltaEvent).toBeDefined();
            expect(messageDeltaEvent.delta.stop_reason).toBe("tool_use");

            expect(events[events.length - 1].type).toBe("message_stop");
            expect(claudeStream.request_id).toBe(messageId);

            const finalMessage = await claudeStream.finalMessage();
            expect(finalMessage.id).toBe(messageId);
            expect(finalMessage.stop_reason).toBe("tool_use");
            expect(finalMessage.content.length).toBe(1);
            expect(finalMessage.content[0]).toEqual({
                type: "tool_use",
                id: toolUseId,
                name: "search_web",
                input: { query: "weather" }
            });
            expect(finalMessage.usage.input_tokens).toBe(8);
            expect(finalMessage.usage.output_tokens).toBe(4);
        });

        it('should handle mixed text and tool call then text again', async () => {
            const mockMixedStream = (async function* () {
                yield { candidates: [{ content: { parts: [{ text: "Okay, I will search. " }] } }] };
                yield {
                    candidates: [{
                        content: {
                            parts: [{ functionCall: { name: "search_engine", args: { query: "latest news" } } }]
                        },
                        // No finishReason here, implies more content might follow or tool use is intermediate
                    }]
                };
                // Implicitly, the tool call part ends when text part begins
                yield { candidates: [{ content: { parts: [{ text: " Found some results." }] }, finishReason: "STOP" }] };
            })();
        
            const mockAggregatedResponse = {
                candidates: [{
                    content: {
                        parts: [
                            { text: "Okay, I will search. " },
                            { functionCall: { name: "search_engine", args: { query: "latest news" } } },
                            { text: " Found some results." }
                        ]
                    },
                    finishReason: "STOP"
                }],
                usageMetadata: { promptTokenCount: 15, candidatesTokenCount: 10 }
            };

            const claudeStream = wrapper._adaptGeminiStreamToClaudeStream({ stream: mockMixedStream, response: Promise.resolve(mockAggregatedResponse) }, mockClaudeRequestPayload, mockGeminiRequest);
            const events = await collectStream(claudeStream);
            
            // 1. message_start
            expect(events[0].type).toBe("message_start");
            const msgId = events[0].message.id;

            // 2. First text block
            expect(events[1].type).toBe("content_block_start"); // text
            expect(events[1].index).toBe(0);
            expect(events[1].content_block.type).toBe("text");
            expect(events[2].type).toBe("content_block_delta"); // "Okay, I will search. "
            expect(events[2].delta.text).toBe("Okay, I will search. ");

            // 3. Tool use block
            const toolUseStartIndex = events.findIndex(e => e.type === "content_block_start" && e.content_block.type === "tool_use");
            expect(toolUseStartIndex).toBeGreaterThan(0);
            const toolUseStartEvent = events[toolUseStartIndex];
            expect(toolUseStartEvent.index).toBe(1); // New block
            expect(toolUseStartEvent.content_block.name).toBe("search_engine");
            const toolUseId = toolUseStartEvent.content_block.id;

            expect(events[toolUseStartIndex + 1].type).toBe("content_block_delta"); // input_json_delta
            expect(JSON.parse(events[toolUseStartIndex + 1].delta.partial_json)).toEqual({ query: "latest news" });
            
            // The tool_use block should be stopped when the next text block starts
            const toolUseStopEvent = events.find(e => e.type === "content_block_stop" && e.index === toolUseStartEvent.index);
            expect(toolUseStopEvent).toBeDefined();
            // Ensure this stop event is before the next content_block_start for text
            const nextTextStartIndex = events.findIndex(e => e.type === "content_block_start" && e.index === 2);
            expect(events.indexOf(toolUseStopEvent)).toBeLessThan(nextTextStartIndex);


            // 4. Second text block
            expect(events[nextTextStartIndex].type).toBe("content_block_start"); // text
            expect(events[nextTextStartIndex].index).toBe(2);
            expect(events[nextTextStartIndex].content_block.type).toBe("text");
            expect(events[nextTextStartIndex+1].type).toBe("content_block_delta"); // " Found some results."
            expect(events[nextTextStartIndex+1].delta.text).toBe(" Found some results.");

            // 5. message_delta (stop_reason) and message_stop
            const messageDelta = events.find(e => e.type === "message_delta");
            expect(messageDelta.delta.stop_reason).toBe("end_turn");
            expect(events[events.length - 1].type).toBe("message_stop");

            const finalMessage = await claudeStream.finalMessage();
            expect(finalMessage.id).toBe(msgId);
            expect(finalMessage.content).toEqual([
                { type: "text", text: "Okay, I will search. " },
                { type: "tool_use", id: toolUseId, name: "search_engine", input: { query: "latest news" } },
                { type: "text", text: " Found some results." }
            ]);
            expect(finalMessage.stop_reason).toBe("end_turn");
            expect(finalMessage.usage).toEqual({ input_tokens: 15, output_tokens: 10 });
        });
        
        it('should map finishReason MAX_TOKENS correctly', async () => {
            const mockStreamMaxTokens = (async function* () {
                yield { candidates: [{ content: { parts: [{ text: "This is a very long text..." }] }, finishReason: "MAX_TOKENS" }] };
            })();
            const claudeStream = wrapper._adaptGeminiStreamToClaudeStream(
                { stream: mockStreamMaxTokens, response: Promise.resolve({ candidates: [{finishReason: "MAX_TOKENS"}], usageMetadata: {promptTokenCount:5, candidatesTokenCount:100} }) },
                mockClaudeRequestPayload,
                mockGeminiRequest
            );
            const events = await collectStream(claudeStream);
            const messageDelta = events.find(e => e.type === "message_delta");
            expect(messageDelta.delta.stop_reason).toBe("max_tokens");
            const finalMessage = await claudeStream.finalMessage();
            expect(finalMessage.stop_reason).toBe("max_tokens");
        });

        it('should map finishReason SAFETY correctly', async () => {
            const mockStreamSafety = (async function* () {
                yield { candidates: [{ finishReason: "SAFETY" }] }; // Gemini might not yield content if safety triggered early
            })();
             const claudeStream = wrapper._adaptGeminiStreamToClaudeStream(
                { stream: mockStreamSafety, response: Promise.resolve({ candidates: [{finishReason: "SAFETY"}], usageMetadata: {promptTokenCount:5, candidatesTokenCount:0} }) },
                mockClaudeRequestPayload,
                mockGeminiRequest
            );
            const events = await collectStream(claudeStream);
            const messageDelta = events.find(e => e.type === "message_delta");
            expect(messageDelta.delta.stop_reason).toBe("error"); // Mapped to "error"
            const finalMessage = await claudeStream.finalMessage();
            expect(finalMessage.stop_reason).toBe("error");
        });
        
        // TODO: Add more stream tests:
        // - Test with multiple tool calls in sequence if Gemini supports it and how it's represented.
        // - Test stream where `geminiStreamResult.response` promise is slow or resolves after all stream chunks.

        it('should handle errors from the Gemini stream iterator', async () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            const errorMessage = "Gemini stream failed";
            const mockErrorStream = (async function* () {
                yield { candidates: [{ content: { parts: [{ text: "Some initial text. " }] } }] };
                throw new Error(errorMessage);
            })();

            const claudeStream = wrapper._adaptGeminiStreamToClaudeStream(
                { stream: mockErrorStream, response: Promise.reject(new Error("Aggregated response would also fail")) }, // Mock response promise also failing
                mockClaudeRequestPayload,
                mockGeminiRequest
            );

            const events = await collectStream(claudeStream);

            expect(events[0].type).toBe("message_start");
            expect(events[1].type).toBe("content_block_start"); // For "Some initial text. "
            expect(events[2].type).toBe("content_block_delta"); // For "Some initial text. "
            const messageDeltaError = events.find(e => e.type === "message_delta" && e.delta.stop_reason === "error");
            expect(messageDeltaError).toBeDefined();
            expect(messageDeltaError.delta.error).toEqual({ type: "api_error", message: errorMessage });

            expect(events[events.length - 1].type).toBe("message_stop");

            const finalMessage = await claudeStream.finalMessage();
            expect(finalMessage.stop_reason).toBe("error");
            expect(finalMessage.error).toEqual({ type: "api_error", message: errorMessage });
            expect(finalMessage.content.some(c => c.text === "Some initial text. ")).toBe(true);
            expect(finalMessage.usage).toEqual({ input_tokens: 0, output_tokens: 0 });
            consoleErrorSpy.mockRestore();
        });

        it('should handle rejection of geminiStreamResult.response promise in finalMessage', async () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            const rejectionMessage = "Aggregated response promise failed";
            const mockHealthyStream = (async function* () {
                // Simulate some content being successfully streamed
                yield { candidates: [{ content: { parts: [{ text: "Content before promise rejection. " }] } }] };
                // Simulate the stream ending normally before the promise resolves/rejects
                yield { candidates: [{ finishReason: "STOP" }] };
            })();
            
            const mockAggregatedResponsePromise = Promise.reject(new Error(rejectionMessage));
            // Mock the .catch on the promise to prevent unhandled rejection in test runner if not caught by SUT
            mockAggregatedResponsePromise.catch(e => {});


            const claudeStream = wrapper._adaptGeminiStreamToClaudeStream(
                { stream: mockHealthyStream, response: mockAggregatedResponsePromise },
                mockClaudeRequestPayload,
                mockGeminiRequest
            );

            const events = await collectStream(claudeStream);
            
            // Check for error delta if the wrapper yields one upon promise rejection discovery
            const errorDelta = events.find(e => e.type === "message_delta" && e.delta.error);
            if (errorDelta) { // This depends on whether the wrapper can inject a delta post-stream completion
                expect(errorDelta.delta.stop_reason).toBe("error");
                expect(errorDelta.delta.error.message).toContain(rejectionMessage);
            }


            const finalMessage = await claudeStream.finalMessage();
            expect(finalMessage.stop_reason).toBe("error");
            expect(finalMessage.error).toBeDefined();
            expect(finalMessage.error.message).toContain(rejectionMessage);
            // Content streamed before error should still be there
            expect(finalMessage.content.some(c => c.text === "Content before promise rejection. ")).toBe(true);
            // Usage might be partially set from stream and then zeroed for output, or fully zeroed.
            // Current implementation tries to preserve input tokens if known, output becomes 0.
            expect(finalMessage.usage.output_tokens).toBe(0);
            consoleErrorSpy.mockRestore();
        });

    });

    describe('beta.messages.countTokens', () => {
        beforeEach(() => {
            // Ensure the mock for countTokens is reset and available on the model instance
            // The model instance is created in the outer beforeEach, so we access it via wrapper.geminiModel
            if (wrapper.geminiModel && wrapper.geminiModel.countTokens) {
                wrapper.geminiModel.countTokens.mockClear();
            } else {
                // This case should ideally not happen if the mock setup is correct
                console.warn("wrapper.geminiModel.countTokens was not found during test setup for countTokens");
                // Attempt to re-assign a mock if it's missing, though this indicates a deeper setup issue
                const mockGenAIInstance = require("@google/generative-ai").GoogleGenerativeAI();
                wrapper.geminiModel = mockGenAIInstance.getGenerativeModel();
            }
        });

        it('should call geminiModel.countTokens with transformed messages and return formatted count', async () => {
            const claudePayload = {
                messages: [{ role: "user", content: "How many tokens is this?" }],
                // model: "claude-3..." // model is not directly used by our countTokens wrapper logic but good to include
            };
            const mockGeminiResponse = { totalTokens: 25 };
            wrapper.geminiModel.countTokens.mockResolvedValue(mockGeminiResponse);

            const result = await wrapper.beta.messages.countTokens(claudePayload);

            expect(wrapper.geminiModel.countTokens).toHaveBeenCalledTimes(1);
            expect(wrapper.geminiModel.countTokens).toHaveBeenCalledWith({
                contents: [{ role: "user", parts: [{ text: "How many tokens is this?" }] }]
            });
            expect(result).toEqual({ count: 25 });
        });

        it('should correctly transform messages with multiple content types for token counting', async () => {
            const claudePayload = {
                messages: [
                    { role: "user", content: "Analyze this." },
                    {
                        role: "assistant",
                        content: [
                            { type: "text", text: "Okay, I see. " },
                            { type: "tool_use", id: "tool_abc", name: "image_analyzer", input: { image_url: "http://example.com/img.png" } }
                        ]
                    },
                    {
                        role: "user",
                        content: [
                            { type: "tool_result", tool_use_id: "tool_abc", content: { analysis: "done" } }
                        ]
                    }
                ]
            };
            // Simulate that the tool_use was processed and stored
            wrapper.currentToolCalls.set("tool_abc", { name: "image_analyzer", input: { image_url: "http://example.com/img.png" } });

            const mockGeminiResponse = { totalTokens: 75 };
            wrapper.geminiModel.countTokens.mockResolvedValue(mockGeminiResponse);

            await wrapper.beta.messages.countTokens(claudePayload);

            expect(wrapper.geminiModel.countTokens).toHaveBeenCalledWith({
                contents: [
                    { role: "user", parts: [{ text: "Analyze this." }] },
                    {
                        role: "model",
                        parts: [
                            { text: "Okay, I see. " },
                            { functionCall: { name: "image_analyzer", args: { image_url: "http://example.com/img.png" } } }
                        ]
                    },
                    {
                        role: "user",
                        parts: [
                            { functionResponse: { name: "image_analyzer", response: { result: { analysis: "done" } } } }
                        ]
                    }
                ]
            });
        });

        it('should return an error object if geminiModel.countTokens fails', async () => {
            const claudePayload = {
                messages: [{ role: "user", content: "Count this." }],
            };
            const errorMessage = "Gemini token counting failed";
            wrapper.geminiModel.countTokens.mockRejectedValue(new Error(errorMessage));
            
            // Suppress console.error for this specific test
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

            const result = await wrapper.beta.messages.countTokens(claudePayload);

            expect(result).toEqual({
                count: 0,
                error: { type: "api_error", message: errorMessage }
            });
            expect(consoleErrorSpy).toHaveBeenCalledWith("[GeminiWrapper] Error in countTokens:", expect.any(Error));
            consoleErrorSpy.mockRestore();
        });

        it('should handle empty messages array gracefully', async () => {
            const claudePayload = { messages: [] };
            const mockGeminiResponse = { totalTokens: 0 }; // Gemini might return 0 for empty
            wrapper.geminiModel.countTokens.mockResolvedValue(mockGeminiResponse);

            const result = await wrapper.beta.messages.countTokens(claudePayload);
            
            expect(wrapper.geminiModel.countTokens).toHaveBeenCalledWith({ contents: [] });
            expect(result).toEqual({ count: 0 });
        });

        it('should handle payload without messages property', async () => {
            const claudePayload = {}; // No messages property
            const mockGeminiResponse = { totalTokens: 0 };
            wrapper.geminiModel.countTokens.mockResolvedValue(mockGeminiResponse);

            const result = await wrapper.beta.messages.countTokens(claudePayload);

            expect(wrapper.geminiModel.countTokens).toHaveBeenCalledWith({ contents: [] });
            expect(result).toEqual({ count: 0 });
        });
    });
});
