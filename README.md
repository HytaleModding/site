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

> Learn more about Hytale's modding strategy in the [official blog post](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status).

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

1. Clone the repository:

```bash
git clone https://github.com/HytaleModding/site.git
cd site
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

## Documentation Structure

### Routes

| Route | Description |
| --- | --- |
| `/` | Landing page with community links and introduction |
| `/docs` | Main documentation hub |
| `/docs/quick-start` | Getting started guide for Hytale modding |
| `/docs/what-we-know-so-far` | Current knowledge base about Hytale modding |
| `/docs/what-we-know-so-far/faq` | Frequently asked questions |
| `/docs/what-we-know-so-far/developer-qa-insights` | Technical insights from Hytale developers Zero and Slikey |
| `/docs/what-we-know-so-far/inputs` | Input handling documentation |
| `/docs/what-we-know-so-far/server-first-dev` | Server-first development approach |
| `/docs/what-we-know-so-far/ui-customization` | UI customization guides |
| `/docs/what-we-know-so-far/ways-to-develop/data-assets` | Working with data assets (JSON) |
| `/docs/what-we-know-so-far/ways-to-develop/modelling` | 3D modelling and Blockbench |
| `/docs/what-we-know-so-far/ways-to-develop/plugin` | Java plugin development |
| `/docs/what-we-know-so-far/ways-to-develop/visual-scripting` | Visual scripting workflows |
| `/api/search` | Documentation search API endpoint |

### Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── (home)/            # Landing page route group
│   ├── docs/              # Documentation pages
│   └── api/search/        # Search API
├── components/            # React components
│   ├── layout/           # Layout components for docs
│   └── ui/               # Reusable UI components
├── lib/                   # Utility libraries
│   ├── source.ts         # Content source adapter
│   └── layout.shared.tsx # Shared layout configuration
content/
└── docs/                  # MDX documentation files
    ├── index.mdx
    ├── quick-start.mdx
    └── what-we-know-so-far/
```

## Contributing

This is a community-driven project, and contributions are welcome! We value contributions from modders, developers, designers, and documentation enthusiasts of all skill levels.

### Ways to Contribute

- Add new documentation for Hytale modding topics
- Fix errors or improve existing content
- Suggest new features or improvements
- Report issues or bugs
- Answer questions from other community members

### Getting Started with Contributing

1. Read our [Contributing Guidelines](CONTRIBUTING.md)
2. Check out our [Code of Conduct](CODE_OF_CONDUCT.md)
3. Browse [open issues](https://github.com/HytaleModding/site/issues) or open a new one
4. Submit a pull request with your changes

For detailed information about the contribution process, development setup, and style guidelines, please see [CONTRIBUTING.md](CONTRIBUTING.md).

## Community Links

- **Discord**: [Join our Discord server](https://discord.gg/54WX832HBM)
- **Official Hytale**: [hytale.com](https://hytale.com/)
- **Hytale Modding Strategy**: [Official Blog Post](https://hytale.com/news/2025/11/hytale-modding-strategy-and-status)

## Technology Stack

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Documentation**: [Fumadocs](https://fumadocs.dev/)
- **Styling**: Tailwind CSS
- **Content**: MDX (Markdown + JSX)
- **Icons**: Lucide React

## Disclaimer

This is an **unofficial** community project and is not affiliated with or endorsed by Hypixel Studios or Hytale. All trademarks and game content are property of their respective owners.

## Security

If you discover a security vulnerability, please review our [Security Policy](SECURITY.md) for information on how to report it responsibly.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

This documentation site is maintained by the community for the community.
