# Contributing to Hytale Modding Documentation

Thank you for your interest in contributing to the Hytale Modding Documentation project! This is a community-driven initiative, and we welcome contributions from modders, developers, designers, and documentation enthusiasts of all skill levels.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Getting Started](#getting-started)
- [Documentation Guidelines](#documentation-guidelines)
- [Submitting Changes](#submitting-changes)
- [Style Guide](#style-guide)
- [Community](#community)

## Code of Conduct

This project and everyone participating in it is governed by our [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Issues

- **Documentation Errors**: Found a typo, broken link, or incorrect information? Open an issue!
- **Missing Content**: Notice a topic that should be covered? Suggest it!
- **Technical Issues**: Encountering bugs with the site itself? Let us know!

When reporting issues, please:
- Use a clear and descriptive title
- Provide as much relevant information as possible
- Include screenshots if applicable
- Tag the issue appropriately

### Suggesting Enhancements

We welcome suggestions for new features or improvements:
- Search existing issues first to avoid duplicates
- Clearly describe the enhancement and its benefits
- Explain why this would be useful to the Hytale modding community

### Contributing Documentation

Documentation contributions are the heart of this project:

1. **Improving Existing Docs**
   - Fix typos and grammatical errors
   - Clarify confusing explanations
   - Update outdated information
   - Add examples and code snippets

2. **Writing New Content**
   - Server plugin development guides
   - Data asset configuration tutorials
   - Blockbench modeling workflows
   - Visual scripting documentation
   - Best practices and patterns

3. **Adding Examples**
   - Code examples for Java plugins
   - JSON configuration samples
   - Step-by-step tutorials
   - Real-world use cases

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- Bun package manager (install with `npm install -g bun`)
- Git
- A text editor (VS Code, Cursor, etc.)

### Local Development Setup

1. Fork the repository on GitHub

2. Clone your fork:
```bash
git clone https://github.com/YOUR_USERNAME/site.git
cd site
```

3. Add the upstream repository:
```bash
git remote add upstream https://github.com/HytaleModding/site.git
```

4. Install dependencies:
```bash
bun install
```

5. Start the development server:
```bash
bun run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

### Project Structure

```
site/
├── content/docs/          # MDX documentation files
│   ├── index.mdx
│   ├── quick-start.mdx
│   └── what-we-know-so-far/
├── src/
│   ├── app/              # Next.js app routes
│   ├── components/       # React components
│   └── lib/              # Utility functions
├── public/               # Static assets
└── README.md
```

## Documentation Guidelines

### File Structure

- Place documentation files in `content/docs/`
- Use kebab-case for file names: `server-first-dev.mdx`
- Organize related content in subdirectories
- Update `meta.json` files for navigation

### MDX Format

Documentation files use MDX (Markdown + JSX):

```mdx
---
title: Your Page Title
description: A brief description of the content
---

## Introduction

Your content here...
```

### Content Guidelines

1. **Accuracy First**
   - Verify information against official Hytale sources
   - Link to [official blog posts](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status) when relevant
   - Clearly mark speculation or unconfirmed information

2. **Clear and Concise**
   - Write for your audience (beginners to advanced)
   - Use simple language where possible
   - Break complex topics into digestible sections
   - Include code examples and screenshots

3. **Well-Structured**
   - Use proper heading hierarchy (h2, h3, h4)
   - Include a table of contents for long pages
   - Add cross-references to related pages
   - Use callouts for important notes

4. **Code Examples**
   - Provide complete, working examples
   - Include comments explaining key concepts
   - Follow Java and JSON best practices
   - Test your code before submitting

## Submitting Changes

### Branch Workflow

1. Create a new branch for your changes:
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

2. Make your changes and commit:
```bash
git add .
git commit -m "Add clear, descriptive commit message"
```

3. Push to your fork:
```bash
git push origin feature/your-feature-name
```

4. Open a Pull Request on GitHub

### Pull Request Guidelines

- **Title**: Clear and descriptive (e.g., "Add Java plugin tutorial" or "Fix typo in quick-start guide")
- **Description**: Explain what changes you made and why
- **Link Issues**: Reference related issues with `Fixes #123` or `Relates to #456`
- **Screenshots**: Include before/after screenshots for visual changes
- **Testing**: Confirm the site builds and renders correctly

### Commit Messages

Follow these conventions:
- Use present tense: "Add feature" not "Added feature"
- Use imperative mood: "Fix bug" not "Fixes bug"
- Keep first line under 72 characters
- Add detailed description if needed

Examples:
```
Add server plugin development guide

Fix broken link in quick-start documentation

Update data assets section with JSON examples
```

## Style Guide

### Markdown Styling

- Use `**bold**` for emphasis
- Use `*italic*` for slight emphasis
- Use `code` for inline code, file names, and commands
- Use code blocks with language tags:

```java
public class ExamplePlugin {
    // Your code here
}
```

### Writing Style

- Write in second person (you/your) when addressing readers
- Use active voice
- Keep sentences concise
- Use lists for multiple items
- Add examples to illustrate concepts

### Technical Terms

- **Hytale**: Always capitalize
- **Blockbench**: Capitalize as proper noun
- **Java**: Capitalize (programming language)
- **JSON**: All caps
- **MDX**: All caps

### Links

- Use descriptive link text (not "click here")
- Link to official Hytale sources when possible
- Use relative links for internal pages: `[Quick Start](/docs/quick-start)`

## Community

### Getting Help

- **Discord**: [Join our Discord](https://discord.gg/54WX832HBM) for real-time help
- **GitHub Discussions**: Ask questions and share ideas
- **Issues**: Report bugs and request features

### Staying Updated

- Watch the repository for notifications
- Follow [Hytale's official blog](https://hytale.com/news)
- Join community discussions on Discord and Reddit

### Recognition

Contributors are recognized in several ways:
- Listed in the repository's contributors
- Mentioned in release notes for significant contributions
- Building a portfolio of documentation work

## Questions?

If you have questions not covered in this guide:
- Open a GitHub issue with the `question` label
- Ask in the Discord server
- Reach out to project maintainers

Thank you for contributing to Hytale Modding Documentation! Your efforts help the entire community learn and grow together.

