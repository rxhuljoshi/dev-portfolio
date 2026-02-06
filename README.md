# Portfolio Frontend

A modern, responsive portfolio website built with **Next.js 15**, **Tailwind CSS**, and **Supabase**.

## Features

-   **Dynamic Content**: Experiences, Projects, and Gallery fetched from Supabase.
-   **Admin Panel**: specific `/admin` routes to manage:
    -   Experiences & Projects (Drag & Drop reordering)
    -   "Cool Stuff" Gallery
    -   CV Upload (PDF)
-   **CV Download**: Public download link on homepage, managed via Admin.
-   **Animations**: Powered by `framer-motion` and `gsap`.
-   **Responsive Design**: Mobile-first approach using Tailwind.

## Tech Stack

-   **Framework**: Next.js 15 (App Router)
-   **Styling**: Tailwind CSS 4
-   **Database**: Supabase (PostgreSQL)
-   **State/Anim**: Framer Motion

## Getting Started

1.  install dependencies:
    ```bash
    npm install
    ```

2.  Set up environment variables:
    Create a `.env.local` file:
    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

3.  Run the development server:
    ```bash
    npm run dev
    ```

4.  Open [http://localhost:3000](http://localhost:3000).

## Database

The `database/` folder contains the SQL schema and seed scripts for Supabase.

-   `schema.sql`: Master database schema and RLS policies. Run in Supabase SQL Editor.
-   `seed.sql`: Initial data.
-   `generate_seed.py`: Python script to generate the seed file.

## Admin Access

Access the admin panel at `/admin`. You will need to be authenticated via Supabase Auth (configured in database policies).
