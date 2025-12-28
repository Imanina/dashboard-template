<<<<<<< HEAD
# Dashboard with Supabase Authentication

A modern Next.js dashboard application with Supabase authentication, built with shadcn/ui components and Tailwind CSS.

## Features

- 🔐 Supabase Authentication (Email/Password)
- 🎨 Modern UI with shadcn/ui components
- 🌙 Dark/Light mode support
- 📱 Responsive design
- 🛡️ Protected routes
- 🔄 Real-time authentication state

## Prerequisites

- Node.js 18+ 
- npm or yarn
- Supabase account and project

## Setup Instructions

### 1. Clone and Install Dependencies

```bash
npm install
```

### 2. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Once your project is created, go to **Settings** > **API**
3. Copy your **Project URL** and **anon public** key

### 3. Configure Environment Variables

Update the `.env.local` file with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 4. Set up Authentication in Supabase

1. Go to **Authentication** > **Settings** in your Supabase dashboard
2. Enable **Email** provider
3. Configure your site URL (e.g., `http://localhost:3000` for development)
4. Add redirect URLs:
   - `http://localhost:3000/dashboard` (for development)
   - `https://yourdomain.com/dashboard` (for production)

### 5. Create a User

You can create a user in two ways:

**Option 1: Through Supabase Dashboard**
1. Go to **Authentication** > **Users**
2. Click **Add User**
3. Enter email and password

**Option 2: Enable Sign Up (Optional)**
1. Go to **Authentication** > **Settings**
2. Enable **Enable sign up** if you want users to register themselves

### 6. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── components/
│   ├── AppSidebar.tsx          # Main sidebar component
│   ├── NavUser.tsx             # User dropdown with logout
│   ├── ProtectedRoute.tsx      # Route protection wrapper
│   └── ui/                     # shadcn/ui components
├── lib/
│   ├── auth-context.tsx        # Authentication context
│   ├── supabase.ts            # Supabase client configuration
│   └── utils.ts               # Utility functions
├── pages/
│   ├── _app.tsx               # App wrapper with providers
│   ├── index.tsx              # Home page with auth redirect
│   ├── login.tsx              # Login page
│   └── dashboard.tsx          # Protected dashboard page
└── .env.local                 # Environment variables
```

## Authentication Flow

1. **Login**: Users enter email/password on `/login`
2. **Authentication**: Supabase validates credentials
3. **Redirect**: Authenticated users are redirected to `/dashboard`
4. **Protection**: Unauthenticated users are redirected to `/login`
5. **Logout**: Users can logout via the user dropdown in the sidebar

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anon/public key |

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server

## Customization

### Adding New Protected Routes

Wrap any page component with the `ProtectedRoute` component:

```tsx
import { ProtectedRoute } from "../components/ProtectedRoute";

export default function MyProtectedPage() {
  return (
    <ProtectedRoute>
      <div>Your protected content here</div>
    </ProtectedRoute>
  );
}
```

### Styling

The app uses Tailwind CSS with shadcn/ui components. You can customize the theme in `tailwind.config.js` and modify component styles in the `components/ui/` directory.

## Troubleshooting

### Common Issues

1. **"Invalid login credentials"** - Make sure the user exists in your Supabase project
2. **Redirect loops** - Check your Supabase site URL and redirect URL settings
3. **Environment variables not loading** - Restart your development server after updating `.env.local`

### Getting Help

- Check the [Supabase documentation](https://supabase.com/docs)
- Review the [Next.js documentation](https://nextjs.org/docs)
- Check the [shadcn/ui documentation](https://ui.shadcn.com)

## License

MIT 
=======
# OCR-DOC-Builder
>>>>>>> e1900cc9cc0ced5dcc06e4f493ff8005e853cc38
