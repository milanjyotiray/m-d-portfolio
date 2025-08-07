# Portfolio Website for Milan & Dhiraj

## Overview

This is a modern, dark-themed Progressive Web App (PWA) portfolio website showcasing the freelance work of Milan and Dhiraj, two student developers from IIT Madras. The website emphasizes their unique positioning as passionate individual developers rather than a traditional agency, featuring their services, projects, testimonials, and contact information. Built with a full-stack architecture, it includes both a React frontend and an Express.js backend for handling contact forms and service inquiries.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **React with TypeScript**: Single-page application using React 18 with TypeScript for type safety
- **Styling**: Tailwind CSS with shadcn/ui components for consistent design system
- **Animations**: Framer Motion for smooth animations and transitions
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management
- **Dark Theme**: Built-in dark theme with CSS custom properties
- **PWA Features**: Service worker, manifest.json, and offline capabilities

### Backend Architecture
- **Express.js Server**: RESTful API server handling contact forms and service inquiries
- **Database Layer**: Drizzle ORM with PostgreSQL for data persistence
- **Storage Pattern**: Interface-based storage system with in-memory fallback for development
- **API Endpoints**: 
  - `/api/contact` - Contact form submissions
  - `/api/service-inquiry` - Service inquiry submissions
- **Validation**: Zod schemas for input validation

### Data Storage
- **Database**: PostgreSQL with Neon Database integration
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema**: Three main tables - users, contacts, and service_inquiries
- **Migrations**: Drizzle-kit for database schema management

### Authentication & Authorization
- Basic user system defined in schema but not currently implemented in routes
- No authentication required for public portfolio features
- Form submissions are open to all visitors

### Development Tools
- **Build System**: Vite for fast development and optimized production builds
- **TypeScript**: Full TypeScript support across client, server, and shared code
- **Hot Reload**: Vite dev server with hot module replacement
- **Path Aliases**: Configured aliases for clean imports (@/, @shared/, @assets/)

### Production Deployment
- **Build Process**: Separate client (Vite) and server (esbuild) build processes
- **Static Assets**: Client builds to dist/public, server builds to dist/
- **Environment**: NODE_ENV-based configuration for development/production

## External Dependencies

### Frontend Dependencies
- **UI Components**: Radix UI primitives with shadcn/ui wrapper components
- **Icons**: React Icons library for comprehensive icon set
- **Animation**: Framer Motion for complex animations and gestures
- **Forms**: React Hook Form with Hookform Resolvers for validation
- **HTTP Client**: Native fetch with TanStack Query wrapper

### Backend Dependencies
- **Database**: Neon Database (@neondatabase/serverless) as PostgreSQL provider
- **ORM**: Drizzle ORM with Zod integration for type-safe database operations
- **Session Management**: connect-pg-simple for PostgreSQL session store (imported but not configured)

### Development Dependencies
- **Build Tools**: Vite, esbuild, tsx for development and build processes
- **TypeScript**: Full TypeScript toolchain with strict configuration
- **Linting**: ESLint and Prettier (implied from component structure)
- **Replit Integration**: Special Replit development plugins and error overlay

### Planned Integrations (TODO)
- Google Sheets API for form data backup
- WhatsApp API for instant notifications
- Enhanced social media integrations (LinkedIn, GitHub, Twitter, Instagram)

The architecture follows modern web development practices with clear separation of concerns, type safety throughout the stack, and a scalable foundation for future enhancements.