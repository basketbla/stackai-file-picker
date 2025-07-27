# Stack AI File Explorer

## Overview

This is the Stack AI frontend assignment for Rhett Owen. Core functionality: list files/folders from the Stack AI api for a given Knowledge Base / Google Drive Connection. List, filter, sort, index, and unindex files.

## Technical Architecture & Design Decisions

### Authentication Strategy
**Decision: Cookie-based authentication**

I implemented a simple cookie-based authentication system since the specification didn't provide explicit auth requirements. The approach:
- Stores user session in HTTP-only cookies for security
- Middleware protection for authenticated routes
- Simple login form with provided test credentials
- Automatic redirect handling for unauthenticated users

*Rationale*: While not production-ready, this approach simulates a real authentication flow without over-engineering for a take-home assessment.

### API Client Generation
**Decision: OpenAPI TypeScript code generation**

Found the `openapi.json` file for the API and used TypeScript OpenAPI code generation to create a fully-typed API client:
- Generated comprehensive TypeScript types for all API models
- Type-safe service methods with proper error handling
- Autocomplete and IntelliSense support
- Reduced development time and runtime errors

*Rationale*: Although overkill for a small project, this approach simulates real-world development practices and provides excellent developer experience with full type safety.

### Data Fetching Strategy
**Decision: Client-side fetching with TanStack Query**

Implemented primarily client-side data fetching using TanStack Query:
- Avoided slow server-side rendering for file operations
- Leveraged Query's caching, background updates, and error handling
- Implemented optimistic UI patterns where appropriate
- Used React Suspense boundaries for loading states

*Rationale*: File browsing operations benefit from instant navigation and caching. TanStack Query provides excellent developer experience for complex async state management.

### Connection & Knowledge Base Logic
**Decision: Hardcoded IDs with simplified scope**

Initially explored dynamic connection and KB selection UI, but pivoted to hardcoded values:
- Focused on core file picker functionality per specification
- Avoided scope creep with complex connection management
- Streamlined user experience for the assessment context

*Rationale*: The specification emphasized file picker functionality over connection management. Hardcoding allowed focus on the core requirements.

### Indexing Implementation
**Decision: API routes without optimistic updates**

Implemented indexing through Next.js API routes with deliberate state management:
- **No optimistic updates**: Specification mentioned showing "indexed/not indexed/indexing" states, implying users should see the actual indexing process
- Added "unindexing" state for better UX feedback
- Background sync after operations to maintain data consistency
- Avoided edge cases from rapid index/unindex operations

*Rationale*: The three-state requirement (indexed/indexing/not indexed) suggested that immediate optimistic updates would hide important status information from users.

### Search & Filtering
**Decision: Hybrid approach with API search and local filtering**

Implemented dual search/filter capabilities:
- **Search**: Used Stack AI's search endpoint for semantic file search
- **Filtering**: Local filtering on already-loaded data for instant results
- **Sorting**: Client-side sorting by name and date for responsive UX

*Rationale*: API search provides powerful semantic search capabilities, while local filtering offers instant feedback for basic name-based filtering.

### AI Tools Used

Used Cursor + Claude Sonnet 4.

**Pros:**
- Accelerated initial UI development and API integration
- Generated correct TypeScript types and React patterns
- Rapid prototyping of complex table layouts and state management

**Cons:**
- Generated some anti-patterns (inline component renders, overly complex SSR logic)
- Created unnecessarily complex data fetching patterns
- UI implementation had layout shift issues that required manual fixes

*Post-development cleanup included*:
- Refactoring inline components to proper component definitions
- Simplifying data fetching logic
- Fixing Cumulative Layout Shift issues
- Optimizing React re-render patterns

## 🚀 Running Locally

### Prerequisites
- Node.js 18+ 
- pnpm (recommended) or npm

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd stack-take-home-frontend/stackai-file-picker
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the project root:
   ```env
   NEXT_PUBLIC_STACK_AI_BASE_URL, NEXT_PUBLIC_SUPABASE_AUTH_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY.
   ```

   Note: None of these are sensitive, just seemed like best practice to put in .env.

4. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   ```

5. **Access the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser


Test credentials: provided in notion doc.

## Live Demo

The application is deployed on Vercel: [https://stackai-demo.rhett.info/](https://stackai-demo.rhett.info/)

## 📋 Project Structure

```
stackai-file-picker/
├── app/                    # Next.js app router
│   ├── api/               # API routes for indexing operations
│   ├── login/             # Authentication pages
│   └── page.tsx           # Main file picker interface
├── components/            # React components
│   ├── ui/               # Shadcn UI components
│   ├── file-explorer.tsx # Main file picker component
│   └── login-form.tsx    # Authentication form
├── lib/                   # Utility libraries
│   ├── auth.ts           # Authentication logic
│   ├── constants.ts      # App constants
│   └── file-explorer-helpers.ts # File operations
├── stack-api-autogen/    # Generated API client
└── middleware.ts         # Route protection
```
