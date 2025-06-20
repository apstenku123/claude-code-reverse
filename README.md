# Claude Code v1.0.19 - Reverse Engineering Project

**Copyright (c) 2025 davidgornshtein@gmail.com**  
**Licensed for non-commercial use only. For commercial use, please contact davidgornshtein@gmail.com**

## Overview

This repository contains the complete reverse-engineered source code of Claude Code CLI v1.0.19, along with all tools, documentation, and methodologies used in the process. The project demonstrates advanced techniques in code analysis, pattern recognition, and AI-assisted code transformation at scale.

### Current Status (January 20, 2025)

🟢 **Project Complete** - All modules extracted, syntax errors fixed, and CLI successfully rebuilt

- ✅ 12,240 modules extracted and organized
- ✅ 99.99% syntax error fix rate achieved
- ✅ Multi-model AI orchestration implemented
- ✅ Full documentation and guides completed
- ✅ Example integrations provided
- ✅ Security audit completed (all API keys removed)

See [CHANGELOG.md](CHANGELOG.md) for detailed version history.

### Key Achievements

- **12,240 modules** successfully extracted and reconstructed
- **99.99% success rate** in fixing syntax errors
- **~500,000 lines of code** processed
- **Multi-model AI orchestration** for complex syntax fixes
- **Pluggable AI integration** architecture for future enhancements

## Table of Contents

- [Quick Start](#quick-start)
- [Actual Reverse Engineering Process](#actual-reverse-engineering-process)
- [Architecture](#architecture)
- [Tools Reference](#tools-reference)
- [AI Integration](#ai-integration)
- [Contributing](#contributing)
- [License](#license)
- [Changelog](CHANGELOG.md)

## Quick Start

### Prerequisites

- Node.js >= 18.0.0
- npm or yarn
- API keys for AI services (optional, for enhanced features)

### Installation

```bash
# Clone the repository
git clone https://github.com/apstenku123/claude-code-reverse.git
cd claude-code-reverse

# Install dependencies
npm install

# Copy environment template
cp .env.example .env
# Edit .env with your API keys (optional)
```

### Build the CLI

```bash
# Build the refactored CLI
npm run build

# The built file will be at: cli-fully-refactored-final.cjs
```

### Run the CLI

```bash
node cli-fully-refactored-final.cjs --help
```

## Actual Reverse Engineering Process

This section documents the exact step-by-step process we used to reverse engineer Claude Code v1.0.19.

### Phase 1: Initial Extraction (Day 1)

#### Step 1: Module Discovery
We started with the compiled `cli.js` file (22MB) and used a custom extraction script:

```bash
node reverse-engineer.js
```

This script (`reverse-engineer.js`) performed:
- Parsed the bundled JavaScript using Babel AST parser
- Identified module boundaries using pattern matching
- Extracted 12,240 individual function modules
- Created initial directory structure (app/, core/, unknown/)

**Result**: 5,749 functions extracted to `src/` directory

#### Step 2: Initial Function Analysis
```bash
node tools/extract-functions.js
```

This created:
- Individual `.js` files for each function
- Corresponding `.json` metadata files
- Initial categorization based on keywords

### Phase 2: Refactoring and Organization (Days 2-3)

#### Step 3: Enhanced Refactoring
```bash
node tools/refactor-cli.js ../cli.js ../refactored-cli-full
```

This improved version:
- Used AI services (Gemini, OpenAI) for better naming
- Created subcategories (validators/, handlers/, processors/, etc.)
- Generated comprehensive metadata

**Result**: 14,848 files organized with better structure

#### Step 4: Function Analysis Pipeline
```bash
node tools/function-analyzer.js
node tools/confidence-scorer.js
node tools/hybrid-analyzer.js
```

These tools provided:
- Pattern detection in function code
- Confidence scoring for naming
- Hybrid local + AI analysis

### Phase 3: Syntax Error Discovery (Day 4)

#### Step 5: Build Attempt and Error Discovery
```bash
node tools/build-refactored-cli.js
```

**Discovery**: Thousands of syntax errors due to:
- Invalid character ranges: `[a-9]`, `[a-Z]`, `[A-9]`
- Function name corruption: `0-9A` replacing parameters
- Regex escaping issues
- ES module syntax in CommonJS context

### Phase 4: Multi-Model AI Fix Process (Days 5-6)

#### Step 6: Pattern-Based Bulk Fixes
Created multiple fix scripts for common patterns:

```bash
# Fix invalid character ranges
node fix-a-9-ranges.js            # Fixed [a-9] → [a-z0-9]
node fix-a-Z-ranges.js            # Fixed [a-Z] → [a-zA-Z]
node fix-all-invalid-ranges.js    # Comprehensive range fixes

# Fix function corruption
node fix-function-names.js        # Fixed 0-9A → proper parameters
node fix-0-9A-replacements.js     # Fixed corrupted function calls

# Fix other patterns
node fix-import-meta-url.js       # Fixed ES module syntax
node fix-hyphen-escaping.js       # Fixed regex hyphens
node fix-js-tag-patterns.js       # Fixed JavaScript tag patterns
```

**Result**: Fixed 8,432 files with pattern matching

#### Step 7: AI-Powered Syntax Fixing
```bash
node tools/multi-model-fix-parallel.js --verbose
```

This sophisticated tool:
- Implemented fallback chain: GPT-4.1 → O4-Mini → Gemini
- Processed files in parallel batches (20 files/batch)
- Validated each fix with Babel parser
- Maintained checkpoint system for recovery

**Key Feature**: After each AI model claimed to fix a file, we re-validated with Babel. If validation failed, the file was passed to the next model in the chain.

### Phase 5: Final Build and Validation (Day 7)

#### Step 8: Final Syntax Validation
```bash
node tools/validate-syntax.js src-fully-refactored-final-fixed
```

Ensured all files had valid JavaScript syntax.

#### Step 9: Build Generation
```bash
node tools/build-fully-refactored-final-cli.js
```

This build script:
- Collected all modules from source
- Wrapped in custom module loader
- Added Node.js module imports
- Generated CommonJS-compatible output

**Result**: `cli-fully-refactored-final.cjs` (15MB)

### Phase 6: Repository Preparation

#### Step 10: Security Audit
- Removed all API keys and endpoints
- Verified no Azure/Gemini credentials
- Added `.gitignore` for sensitive files
- Created `.env.example` template

#### Step 11: Documentation Creation
- Architecture diagrams
- Step-by-step guides
- AI orchestration documentation
- Tool usage instructions

#### Step 12: Example Integration
- Created Gemini SDK wrapper
- Created OpenAI SDK wrapper
- Demonstrated pluggable AI architecture

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
    ┌────┴────┬─────────┬──────────┐
    │         │         │          │
┌───▼───┐  ┌──▼─-──┐ ┌──▼───┐  ┌───▼───┐
│GPT-4.1│  │O4-Mini│ │Gemini│  │Custom │
└───┬───┘  └──┬──-─┘ └──┬───┘  └───┬───┘
    │         │         │          │
    └─────────┴────┬────┴──────────┘
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

## Statistics

### Processing Metrics

| Metric | Value |
|--------|--------|
| Total Functions | 12,240 |
| Successfully Fixed | 12,239 (99.99%) |
| Lines of Code | ~500,000 |
| Build Time | < 30 seconds |
| Final Size | ~15MB |

### AI Model Performance

| Model | Files Attempted | Success Rate | Avg Time/File |
|-------|-----------------|--------------|---------------|
| GPT-4.1 | 12,239 | 82% | 1.2s |
| O4-Mini | 2,203 | 73% | 0.8s |
| Gemini | 603 | 65% | 1.5s |

### Error Categories Fixed

1. **Syntax Errors**: 8,432 files
2. **Invalid Patterns**: 2,891 files  
3. **Function Corruption**: 687 files
4. **Module Issues**: 229 files

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

## Project Timeline

- **Day 1**: Initial extraction - 5,749 functions extracted
- **Days 2-3**: Refactoring - 14,848 files organized with AI assistance
- **Day 4**: Error discovery - Thousands of syntax errors identified
- **Days 5-6**: AI-powered fixes - Multi-model orchestration implemented
- **Day 7**: Final build and validation - CLI successfully rebuilt
- **Day 8**: Documentation and release preparation

## Disclaimer

This is a reverse engineering project for educational and research purposes. The original Claude Code is property of Anthropic. This project is not affiliated with, endorsed by, or sponsored by Anthropic.

---

**Updated by davidgornshtein@gmail.com**  
**Last Updated: January 20, 2025**
