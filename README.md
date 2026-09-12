# Google Developer Groups (GDG) Ranchi - Frontend

![GDG Ranchi Banner](https://res.cloudinary.com/startup-grind/image/upload/dpr_2.0,fl_sanitize/v1/gcs/platform-data-goog/chapter_banners/GDG-Chapter-Banner-1920x320.jpeg)

Welcome to the official frontend repository for **GDG Ranchi**. This platform serves as the central hub for our developer community in Jharkhand, providing an elegant, high-performance interface to discover events, connect with mentors, view community stories, and access technical resources.

## 🚀 Tech Stack

We pride ourselves on using a modern, scalable, and type-safe ecosystem:

- **Framework**: [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/) & React Icons

## ✨ Core Features

- 🎟️ **Event Discovery & Management**: Seamlessly browse upcoming/past events, hackathons, and workshops.
- 👥 **Community & Mentor Profiles**: Highlight our brilliant speakers, organizers, and active community members.
- 🖼️ **Immersive Galleries & Testimonials**: High-performance image masonry grids and infinite scrolling marquees showcasing our community's experiences.
- 🔒 **Role-Based Authentication**: Secure access for Organizers, Mentors, Judges, and general members with granular permissions.
- 📱 **Responsive & Accessible**: A "desktop-first precision, mobile-first code" approach ensuring a flawless experience on all devices.
- 🌓 **Premium Dark Mode UI**: Sophisticated, glassmorphic UI design matching the global GDG brand guidelines.

## 🛠️ Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/gdg-ranchi/frontend.git
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Environment**
   Create a `.env.local` file in the root and add the necessary variables:
   ```env
   VITE_API_URL=https://gdg-website-hi0h.onrender.com/api/v1
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Build for production**
   ```bash
   npm run build
   ```

## 📐 Architecture & Structure

The codebase is organized modularly by features to ensure scalability:

```
src/
├── Components/       # Reusable global components (Loaders, Inputs, Layouts)
├── features/         # Feature-based modules (Home, Event, Member, Auth)
│   ├── Event/        # Event discovery and detail pages
│   ├── Home/         # Landing page sections (Hero, Sponsors, Testimonials)
│   ├── Member/       # Member profiles and dashboards
│   └── ...
├── routes/           # Public & Internal routing logic
└── utils/            # Helper functions and constants
```

## 🤝 Contributing

We welcome contributions from the community! If you're looking to help improve the GDG Ranchi platform:
1. Check the [Issues](https://github.com/gdg-ranchi/frontend/issues) tab for open tasks.
2. Fork the repository and create a feature branch.
3. Ensure your code follows the existing ESLint and Oxlint configurations (`npm run lint`).
4. Submit a Pull Request with a clear description of your changes.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
**Build. Learn. Connect. Grow Together.** 
*Made with ❤️ by the GDG Ranchi Community.*
