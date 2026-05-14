# CVin - Career Impact Network

A React-based demonstration of the CVin platform for impact-driven career development and peer review.

🔗 **[View Live Demo](https://neonestoras.github.io/CVin)**

📄 **[CVin Whitepaper](https://github.com/neonestoras/Sidequest-Ossuary/blob/main/CV_Clinic.md)**

## Getting Started

### Prerequisites
- Node.js 14+
- npm or yarn

### Installation

```bash
cd apps/cvin-demo-jsx
npm install
```

### Running Locally

```bash
npm start
```

Opens [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

Builds the app for production to the `build` folder.

## Deployment

### Deploying to GitHub Pages

```bash
npm run deploy
```

This builds the app and automatically deploys it to GitHub Pages. The live demo is available at [https://neonestoras.github.io/CVin](https://neonestoras.github.io/CVin).

### Environment Variables

Currently no environment variables are required.

## Project Structure

```
src/
├── App.jsx         (Main demo component)
└── index.js        (React entry point)

public/
└── index.html      (HTML entry point)
```

## Features

- 7-page demo covering:
  1. Social Feed
  2. CV Review System
  3. Personal Progress Tracking
  4. Impact Portfolio (Mentor View)
  5. Review Queue Management
  6. Organization Dashboard
  7. Showcase & Recognition

## Technologies

- React 18
- Recharts (data visualization)
- Lucide React (icons)
- Custom CSS-in-JS styling
