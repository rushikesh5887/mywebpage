# Visitor City Map Setup

The homepage visitor map can show city and country counts for future visits. It does not store exact GPS coordinates, visitor names, emails, or IP addresses in your database.

It cannot recover locations from people who visited before this setup was added.

## Supabase

1. Create a Supabase project.
2. Open the SQL editor in Supabase.
3. Paste and run the SQL from `docs/visitor-map-supabase.sql`.
4. Copy the project URL and anon public key from Supabase project settings.

If you already created the `visitors` table manually, run the SQL file anyway. It will add the latitude and longitude columns needed for map dots without deleting existing rows.

## GitHub Pages

Add these as repository secrets:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Path in GitHub:

`Settings -> Secrets and variables -> Actions -> Variables -> New repository variable`

After the variables are added, push the website again. New visits will start appearing on the homepage map after the next deployment.
