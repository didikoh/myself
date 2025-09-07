# Koh Wei Zhen - Portfolio Website 🐱

A modern, minimalist portfolio website built with React, TypeScript, and Vite, featuring cat-themed elements and smooth animations.

## 👋 About

This is the personal portfolio website of **Koh Wei Zhen**, a passionate Game Developer and Web Developer specializing in:

- **Game Development**: Unity, Unreal Engine, C#, C++, AR/VR
- **Web Development**: React, TypeScript, Angular, Node.js, PHP
- **3D & Media**: Blender, 3ds Max, Babylon.js
- **Backend**: MySQL, Python, RESTful APIs

## 🚀 Features

- **Minimalist Design** - Clean black/white/gray color scheme
- **Cat-themed Elements** - Playful cat icons and animations throughout
- **Responsive Layout** - Optimized for mobile and desktop
- **Smooth Animations** - Built with Framer Motion
- **Modern Tech Stack** - React 19 + TypeScript + Vite
- **Modular CSS** - CSS Modules for component styling
- **GitHub Pages Ready** - Pre-configured for easy deployment

## 🛠️ Tech Stack

- **Frontend**: React 19, TypeScript, CSS Modules
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Deployment**: GitHub Pages

## 📦 Installation

1. Clone the repository:
```bash
git clone https://github.com/didikoh/myself.git
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

4. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Navbar/          # Navigation component
│   ├── Hero/            # Hero/About section
│   ├── Skills/          # Skills showcase
│   ├── Projects/        # Project portfolio
│   └── Contact/         # Contact information
├── data/                # Mock data and types
├── types/               # TypeScript definitions
├── App.tsx              # Main App component
└── index.css            # Global styles
```

## 🚀 Deployment

### Deploy to GitHub Pages

1. Build the project:
```bash
npm run build
```

2. Deploy to GitHub Pages:
```bash
npm run deploy
```

### Manual Deployment

1. Build the project:
```bash
npm run build
```

2. The `dist` folder contains the built website ready for deployment

## 🎨 Customization

### Personal Information
Update your personal information in `src/data/mockData.ts`:

```typescript
export const personalInfo: PersonalInfo = {
  name: 'Your Name',
  title: 'Your Title',
  description: 'Your description...',
  email: 'your.email@example.com',
  // ... other info
};
```

### Skills
Add or modify skills in the same file:

```typescript
export const skills: Skill[] = [
  { id: '1', name: 'React', level: 5, category: 'frontend' },
  // ... more skills
];
```

### Projects
Update your projects:

```typescript
export const projects: Project[] = [
  {
    id: '1',
    title: 'Project Name',
    description: 'Project description...',
    technologies: ['React', 'TypeScript'],
    githubUrl: 'https://github.com/username/repo',
    // ... other details
  }
];
```

### Color Scheme
Modify colors in `src/index.css`:

```css
:root {
  --color-bg: #ffffff;
  --color-surface: #f8f9fa;
  --color-text-primary: #212529;
  --color-cat: #ff6b6b; /* Cat accent color */
  /* ... other colors */
}
```

## 📱 Responsive Design

The website is fully responsive and optimized for:
- 📱 Mobile devices (320px+)
- 📟 Tablets (768px+)
- 💻 Desktop (1024px+)
- 🖥️ Large screens (1200px+)

## ✨ Cat Features

This portfolio includes fun cat-themed elements:
- 🐱 Cat emojis in navigation and sections
- 😸 Floating cat animations
- 🐾 Paw print decorations
- 🙀 Cat-based skill rating system
- 😺 Hover animations with cat themes

## 📧 Contact

- **Email**: didikoh@hotmail.com
- **GitHub**: [didikoh](https://github.com/didikoh)
- **LinkedIn**: [Koh Wei Zhen](https://linkedin.com/in/koh-wei-zhen)
- **Portfolio**: [View Degree Transcript](https://drive.google.com/file/d/1j5oTN--x9bFQoxvBipbJByctxbXU9lza/view?usp=sharing)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to submit issues and pull requests. For major changes, please open an issue first to discuss what you would like to change.

---

**Made with 🐱 and lots of coffee ☕**
