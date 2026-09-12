# System Architecture

GDG Ranchi Frontend is a modern React application built to provide a fast, responsive, and accessible experience for our developer community.

## Core Technologies

- **React 18**: Used for building UI components.
- **Vite**: Used as the build tool and development server for fast HMR.
- **Tailwind CSS**: Used for utility-first styling.
- **Framer Motion & GSAP**: Used for complex animations like parallax, staggering, and infinite scrolling.
- **React Router**: Used for client-side routing.
- **SweetAlert2**: Used for accessible and attractive alerts and popups.

## Folder Structure

The project follows a feature-based directory structure to improve scalability and maintainability:

- `/src/Components`: Contains global, reusable UI components like buttons, inputs, layouts, and loaders.
- `/src/features`: Contains distinct domains or features of the application.
  - `Home/`: Sections and components specific to the landing page (Hero, Sponsors, Testimonials, etc.).
  - `Event/`: Event listing and detail views.
  - `Auth/`: Authentication pages (Login, Forgot Password, Reset Password).
  - `Member/`: Dashboards and member profiles.
- `/src/routes`: Configuration for public and protected routes.

## Styling Guidelines

- Use **Tailwind CSS** for all new components.
- Prefer responsive utilities (`sm:`, `md:`, `lg:`) to ensure elements scale correctly on all devices.
- Follow a dark mode aesthetic (`bg-[#050505]`, glassmorphism panels, etc.).

## State Management & Data Fetching

- We use custom hooks (e.g. `useLogin`) that wrap `@tanstack/react-query` to fetch and mutate server data.