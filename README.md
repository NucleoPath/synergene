# SynerGene

**Genomics AI Assistant**

SynerGene is a cutting-edge AI-powered assistant designed to revolutionize genomics research and analysis. Built with modern web technologies, SynerGene provides an intuitive interface for interacting with genomic data, visualizing complex relationships, and leveraging AI for insights.

## Features

- **AI-Powered Genomics Assistant**: Leverage advanced AI models to analyze and interpret genomic data.
- **Interactive Visualizations**: Visualize genomic relationships and data using interactive diagrams and charts.
- **Dark/Light Mode**: Toggle between dark and light themes for optimal viewing comfort.
- **Responsive Design**: Works seamlessly across devices and screen sizes.
- **Real-Time Collaboration**: Share insights and collaborate with peers in real time.
- **Extensible Architecture**: Built with modularity in mind, allowing for easy integration of new features and tools.

## Tech Stack

SynerGene is built using the following technologies:

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with `shadcn/ui` components
- **AI Integration**: `@ai-sdk/anthropic`, `ai`, and custom AI tools
- **Visualizations**: `@xyflow/react` for flow diagrams, `@streamdown/mermaid` for Mermaid charts, and `@rive-app/react-webgl2` for interactive animations
- **UI Components**: `lucide-react` for icons, `sonner` for toast notifications, and `cmdk` for command palettes
- **Testing**: Playwright for end-to-end testing
- **Code Quality**: ESLint, Prettier, and TypeScript for linting, formatting, and type safety

## Getting Started

### Prerequisites

- Node.js (v20 or later)
- npm (v10 or later)
- Git

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/NucleoPath/synergene.git
   cd synergene
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Run the development server:
   ```sh
   npm run dev
   ```

4. Open your browser and navigate to:
   ```sh
   http://localhost:3000
   ```

### Building for Production

To create a production build, run:

```sh
npm run build
```

To start the production server:

```sh
npm start
```

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Starts the development server |
| `npm run build` | Creates a production build |
| `npm start` | Starts the production server |
| `npm run lint` | Runs ESLint to check for code issues |
| `npm run format` | Formats the codebase using Prettier |
| `npm run format:check` | Checks the codebase for formatting issues |
| `npm run e2e` | Runs end-to-end tests using Playwright |
| `npm run e2e:ui` | Runs end-to-end tests in UI mode |

## Project Structure

```
.
├── app/                  # Next.js app router directory
├── components/           # Reusable UI components
│   ├── ai-elements/      # AI-specific components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Other components
├── lib/                  # Utility functions and helpers
├── public/               # Static assets
├── e2e/                  # End-to-end tests
├── docs/                 # Project documentation
├── .github/              # GitHub workflows and configurations
└── ...                   # Configuration files
```

## Configuration

### Environment Variables

Create a `.env.local` file in the root directory to configure environment variables. Example:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
ANTHROPIC_API_KEY=your_anthropic_api_key
```

### Tailwind CSS

Tailwind CSS is configured in `tailwind.config.js`. Customize themes, plugins, and other settings here.

### ESLint and Prettier

ESLint and Prettier are configured to ensure consistent code quality and formatting. Customize their configurations in `eslint.config.mjs` and `prettier.config.mjs`.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with descriptive messages.
4. Push your branch to your fork.
5. Open a pull request to the `main` branch of the original repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
