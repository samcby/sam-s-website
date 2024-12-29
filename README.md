# Rick's Portfolio Website

This is a portfolio website built with Next.js and Tailwind CSS. It showcases your skills, projects, and achievements in an elegant and responsive design.

## Reference/Base Repo

https://github.com/judygab/nextjs-portfolio

---

## Usage

### Development

1. Start the development server:
   ```bash
   npm run dev
   ```
2. Open your browser and visit `http://localhost:3000` to view the website.

### Build for Production

1. Build the production version:
   ```bash
   npm run build
   ```
2. Start the production server:
   ```bash
   npm start
   ```

### Analyze Webpack Bundle

This project includes the `@next/bundle-analyzer` plugin to analyze the bundle size of the application.

1. Enable the bundle analyzer:
   ```bash
   ANALYZE=true npm run build
   ```
2. After the build completes, the bundle analysis report will be generated and opened in your browser. If it doesn't open automatically, locate the report in:
   ```
   .next/analyze/client.html
   ```

---

## Dependencies

The following are the main dependencies used in this project along with their versions:

### **Production Dependencies**

This project is using the latest module as it can.

| Package                  | Version    | Description                                                                 |
| ------------------------ | ---------- | --------------------------------------------------------------------------- |
| `@emailjs/browser`       | `^4.4.1`   | Email API for sending emails from the browser.                              |
| `@heroicons/react`       | `^2.0.18`  | Icon set for React projects.                                                |
| `autoprefixer`           | `^10.4.20` | PostCSS plugin for adding vendor prefixes.                                  |
| `eslint`                 | `^8.57.1`  | JavaScript linting tool. (!! Don't update to 9.0.0+, dependencies conflict) |
| `eslint-config-next`     | `13.4.15`  | ESLint configuration for Next.js projects.                                  |
| `framer-motion`          | `^11.15.0` | Motion library for animations in React.                                     |
| `next`                   | `^15.1.2`  | React framework for server-side rendering and static site generation.       |
| `postcss`                | `^8.4.49`  | CSS processing tool.                                                        |
| `react`                  | `^18.3.1`  | JavaScript library for building user interfaces.                            |
| `react-dom`              | `^18.3.1`  | Entry point of React to the DOM.                                            |
| `react-animated-numbers` | `^0.16.0`  | Library for animating numbers in React.                                     |
| `react-draggable`        | `^4.4.6`   | Draggable component for React.                                              |
| `react-google-recaptcha` | `^3.1.0`   | Google reCAPTCHA integration for React.                                     |
| `react-icons`            | `^5.4.0`   | Collection of popular icons for React projects.                             |
| `react-resizable`        | `^3.0.5`   | Resizable component for React.                                              |
| `react-router-dom`       | `^7.0.2`   | Declarative routing for React.                                              |
| `react-type-animation`   | `^3.1.0`   | Typewriter animation library for React.                                     |
| `resend`                 | `^1.0.0`   | Email API for developers.                                                   |
| `tailwindcss`            | `^3.4.17`  | CSS framework with utility-first styling.                                   |

### **Development Dependencies**

| Package                 | Version   | Description                                                   |
| ----------------------- | --------- | ------------------------------------------------------------- |
| `@next/bundle-analyzer` | `^15.1.2` | Webpack plugin for visualizing the size of your output files. |

---

## Installation

Clone this repository and install the dependencies:

```bash
git clone <your-repo-url>
cd <project-directory>
npm install
```

---

## Configuration

### Webpack Bundle Analyzer

The `@next/bundle-analyzer` plugin is already integrated into the project. To enable it, ensure the following configuration exists in your `next.config.js`:

```javascript
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({});
```

---

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT). Feel free to use, modify, and distribute the code as per the terms of the license.
