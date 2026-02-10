<p align="center"><a href="https://hytalemodding.dev"><img src="https://cdn.internal.hytalemodding.dev/assets/HytaleLogo_DiscordBannerV6.png" width="600"></a></p>

# Hytale Modding Documentation

**An unofficial community-maintained documentation site for Hytale modding.**

This project provides comprehensive guides, documentation, and resources for modding [Hytale](https://hytale.com/) - a voxel-based sandbox RPG game built from the ground up with modding and user-generated content at its core.

## About Hytale Modding

Hytale is designed with a server-first modding approach, allowing anyone to create and share mods without requiring players to download external client modifications. Whether you're interested in:

- **Server Plugins** - Java-based programming for deep gameplay modifications
- **Data Assets** - JSON-driven content like blocks, items, NPCs, and world generation
- **Art Assets** - Custom models, textures, and sounds using Blockbench
- **Visual Scripting** - Node-based logic for designers and non-programmers

This documentation aims to help you get started and master Hytale modding.

## Contributing

If you'd like to contribute to this website, you can follow our [Contributing Guide](./CONTRIBUTING.md), or follow the version on our website:

- [Setting Up/Basics](https://hytalemodding.dev/en/docs/contributing)
- [PR Guidelines](https://hytalemodding.dev/en/docs/contributing/pr-guidelines)
- [Writing Guides](https://hytalemodding.dev/en/docs/contributing/writing-guides)

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- [Bun](https://bun.sh/) package manager

### Installing Bun

If you don't have Bun installed, you can install it globally using npm:

```bash
npm install -g bun
```

Alternatively, visit [bun.sh](https://bun.sh/) for other installation methods.

### Installation

1. Create a fork of the repository
2. Clone that repository & change your directory into it.

```bash
git clone https://github.com/<you>/<fork repo name>.git
cd <fork repo name>
```

2. Install dependencies:

```bash
bun install
```

3. Run the development server:

```bash
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the site.

### Available Scripts

- `bun run dev` - Start the development server
- `bun run build` - Build the production application
- `bun start` - Run the production server
- `bun run types:check` - Validate TypeScript types and MDX files
- `bun run lint` - Run ESLint for code quality
