# Claude Code Reverse Engineering Project

**Copyright (c) 2025 davidgornshtein@gmail.com**  
**Licensed for non-commercial use only. For commercial use, please contact davidgornshtein@gmail.com**

## Overview

This repository contains the reverse-engineered source code of Claude Code CLI v1.0.19, along with comprehensive documentation of the reverse engineering process, tools used, and a pluggable AI LLM integration framework supporting Gemini and OpenAI models.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Reverse Engineering Process](#reverse-engineering-process)
3. [Tools and Utilities](#tools-and-utilities)
4. [Building the Project](#building-the-project)
5. [AI Orchestration](#ai-orchestration)
6. [Integration Examples](#integration-examples)
7. [Architecture](#architecture)
8. [Contributing](#contributing)

## Project Structure

```
claude-code-reverse/
├── src/                    # Reverse-engineered source code
│   └── src-fully-refactored-final-fixed/  # Fixed and refactored modules
├── tools/                  # Utilities used in reverse engineering
│   ├── multi-model-fix-parallel.js    # Multi-AI model syntax fixer
│   ├── build-fully-refactored-final-cli.js  # Build system
│   └── ...                # Other analysis and fix tools
├── docs/                   # Documentation and diagrams
│   ├── architecture.md     # System architecture
│   ├── reverse-engineering-guide.md  # Step-by-step guide
│   └── ai-orchestration.md  # AI model integration details
├── examples/              # Integration examples
│   ├── gemini_anthropic_sdk_wrapper.js
│   └── openai_integration.js
└── README.md             # This file
```

## Reverse Engineering Process

### Phase 1: Initial Analysis

The reverse engineering began with Claude Code CLI v1.0.19, a sophisticated command-line interface for AI interactions. The process involved:

1. **Module Extraction**: Identified and extracted 12,240 JavaScript modules from the compiled CLI
2. **Dependency Analysis**: Mapped module dependencies and interaction patterns
3. **Code Refactoring**: Systematically refactored obfuscated code into readable modules

### Phase 2: Syntax Error Resolution

The extracted code contained 12,239 files with various syntax errors due to the decompilation process:

- **Invalid character ranges**: `[a-9]` patterns (invalid regex)
- **Function name corruption**: Parameters replaced with `0-9A`
- **Regex escaping issues**: Missing escape characters
- **ES module syntax**: `import.meta.url` in CommonJS context

### Phase 3: AI-Powered Fixing

We developed a sophisticated multi-model AI orchestration system that:

1. **Primary Model (GPT-4.1)**: Initial syntax fixing with high accuracy
2. **Secondary Model (O4-Mini)**: Fallback for complex edge cases
3. **Tertiary Model (Gemini)**: Final fallback for remaining issues
4. **Validation**: Babel parser validation after each fix attempt

**Success Rate**: 99.99% (12,238 out of 12,239 files fixed)

## Tools and Utilities

### 1. Multi-Model Fix Tool (`tools/multi-model-fix-parallel.js`)

A parallel processing tool that orchestrates multiple AI models to fix syntax errors:

```bash
node tools/multi-model-fix-parallel.js --verbose
```

**Features**:
- Concurrent processing (20 files per batch)
- Automatic model fallback
- Checkpoint system for resumable processing
- Babel validation for each fix

### 2. Build System (`tools/build-fully-refactored-final-cli.js`)

Custom build system that:
- Collects all modules from source directory
- Wraps in custom module loader
- Generates CommonJS-compatible output
- Supports external npm dependencies

```bash
node tools/build-fully-refactored-final-cli.js
```

### 3. AI Service Integration (`tools/ai-service-integration.js`)

Unified interface for multiple AI providers:
- Azure OpenAI (GPT-4.1, O4-Mini)
- Google Gemini
- Extensible for additional providers

### 4. Analysis Tools

- `reverse-engineer.js`: Initial module extraction
- `fix-function-names.js`: Repairs corrupted function signatures
- `fix-invalid-ranges.js`: Fixes regex character ranges
- `fix-import-meta-url.js`: ES module to CommonJS conversion

## Building the Project

### Prerequisites

```bash
# Install Node.js dependencies
npm install

# Create .env file from template
cp .env.example .env
# Edit .env with your API keys (required for AI features)
```

### Build Steps

1. **Ensure all syntax errors are fixed**:
   ```bash
   node tools/multi-model-fix-parallel.js --verbose
   ```

2. **Build the CLI**:
   ```bash
   node tools/build-fully-refactored-final-cli.js
   ```

3. **Test the build**:
   ```bash
   node cli-fully-refactored-final.cjs --version
   # Output: 1.0.19 (Claude Code)
   ```

### Environment Variables

Create a `.env` file with:
```env
# AI Service Keys (Optional - only for AI features)
GEMINI_API_KEY=your_gemini_key
AZURE_OPENAI_KEY=your_azure_key
AZURE_OPENAI_ENDPOINT=your_azure_endpoint

# Model Configuration
GEMINI_MODEL=gemini-2.5-pro-preview-06-05
AZURE_GPT4_1_DEPLOYMENT=gpt-4.1
AZURE_O4_MINI_DEPLOYMENT=o4-mini
```

## AI Orchestration

### Multi-Model Architecture

```
┌─────────────────┐
│   User Input    │
└────────┬────────┘
         │
┌────────▼────────┐
│  Model Router   │
└────────┬────────┘
         │
    ┌────┴────┬────────┬──────────┐
    │         │        │          │
┌───▼───┐ ┌──▼───┐ ┌──▼───┐ ┌───▼───┐
│GPT-4.1│ │O4-Mini│ │Gemini│ │Custom │
└───┬───┘ └──┬───┘ └──┬───┘ └───┬───┘
    │        │        │          │
    └────────┴────┬───┴──────────┘
                  │
         ┌────────▼────────┐
         │ Response Handler│
         └─────────────────┘
```

### Model Selection Strategy

1. **Cost Optimization**: Routes simple queries to cheaper models
2. **Capability Matching**: Selects models based on task requirements
3. **Fallback Chain**: Automatic retry with alternative models
4. **Load Balancing**: Distributes requests across available models

## Integration Examples

### Gemini Integration Wrapper

```javascript
// examples/gemini_anthropic_sdk_wrapper.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiAnthropicWrapper {
    constructor(apiKey) {
        this.genAI = new GoogleGenerativeAI(apiKey);
        this.model = this.genAI.getGenerativeModel({ 
            model: "gemini-2.5-pro-preview-06-05" 
        });
    }

    async complete(prompt, options = {}) {
        // Anthropic-compatible interface
        const result = await this.model.generateContent(prompt);
        return {
            content: result.response.text(),
            usage: result.response.usageMetadata
        };
    }
}
```

### OpenAI Integration

```javascript
// examples/openai_integration.js
const { OpenAI } = require('openai');

class OpenAIAnthropicWrapper {
    constructor(config) {
        this.client = new OpenAI({
            apiKey: config.apiKey,
            baseURL: config.baseURL
        });
    }

    async complete(prompt, options = {}) {
        const response = await this.client.chat.completions.create({
            model: options.model || 'gpt-4',
            messages: [{ role: 'user', content: prompt }],
            ...options
        });
        return {
            content: response.choices[0].message.content,
            usage: response.usage
        };
    }
}
```

## Architecture

### Module System

The project uses a custom module loader that:
1. Maintains compatibility with CommonJS
2. Supports lazy loading
3. Handles circular dependencies
4. Falls back to Node.js require for npm modules

### Key Components

- **Command Parser**: Commander.js-based CLI interface
- **Tool System**: Modular tool architecture for extensibility
- **MCP Integration**: Model Context Protocol support
- **Session Management**: Conversation state persistence
- **Permission System**: Granular tool access control

## Security Considerations

1. **No API Keys in Source**: All credentials via environment variables
2. **Redaction Utilities**: Built-in functions to redact sensitive data
3. **Secure Storage**: Session data encrypted at rest
4. **Access Control**: Tool-level permission system

## Testing

Run the test suite:
```bash
npm test
```

Validate syntax across all files:
```bash
node tools/validate-syntax.js
```

## Contributing

This project is licensed for non-commercial use only. For commercial use or contributions, please contact davidgornshtein@gmail.com.

### Guidelines

1. Maintain existing code style
2. Add appropriate copyright headers
3. Update documentation for significant changes
4. Ensure all tests pass before submitting

## Acknowledgments

This reverse engineering project was completed by davidgornshtein@gmail.com using advanced AI orchestration techniques and custom tooling. The project demonstrates the potential for AI-assisted code analysis and transformation at scale.

## Disclaimer

This is a reverse engineering project for educational and research purposes. The original Claude Code is property of Anthropic. This project is not affiliated with, endorsed by, or sponsored by Anthropic.

---

**Updated by davidgornshtein@gmail.com**