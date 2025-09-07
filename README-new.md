# 🐱 Personal Portfolio Website

A minimalist personal portfolio website built with React + Vite + TypeScript, featuring cute cat elements and smooth animations.

## ✨ Features

- **Minimalist Design**: Clean black/white/gray color scheme
- **Cat Elements**: Adorable cat icons and animations throughout
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Smooth Animations**: Powered by Framer Motion
- **Modular CSS**: Using CSS Modules for component-scoped styling
- **TypeScript**: Type-safe development experience
- **GitHub Pages Ready**: Configured for easy deployment

## 🚀 Sections

- **Navigation**: Fixed navbar with smooth scroll navigation
- **About/Hero**: Personal introduction with animated cat avatar
- **Skills**: Technology skills rated with cat icons (1-5 cats)
- **Projects**: Featured project cards with hover effects
- **Contact**: Social links and contact information

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **CSS Modules** - Scoped styling

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/myself.git
cd myself
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

## 🎨 Customization

### Personal Information
Edit `src/data/mockData.ts` to update:
- Personal details (name, title, description)
- Skills and proficiency levels
- Project information
- Social media links

### Styling
- Global styles: `src/index.css`
- Component styles: Individual `.module.css` files
- Color scheme: CSS custom properties in `src/index.css`

### Images
Replace placeholder images in the mock data with your own:
- Profile avatar
- Project screenshots
- Any other images

## 🚀 Deployment to GitHub Pages

1. Update `vite.config.ts` with your repository name:
```typescript
base: '/your-repo-name/'
```

2. Build and deploy:
```bash
npm run build
npm run deploy
```

3. Enable GitHub Pages in your repository settings
4. Your site will be available at `https://yourusername.github.io/your-repo-name/`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🐛 Issues

If you find any bugs or have feature requests, please open an issue on GitHub.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- Cat emojis for making everything better 🐱
- Framer Motion for smooth animations
- Lucide React for beautiful icons

---

Made with 🐱 and lots of coffee ☕
