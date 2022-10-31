const supabase = require('@supabase/supabase-js')

// Create a single supabase client for interacting with your database
const client = supabase.createClient(
  'https://nxpoeyhatnktapwxwjqg.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im54cG9leWhhdG5rdGFwd3h3anFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjcxNjAwOTgsImV4cCI6MTk4MjczNjA5OH0.wQi21RJfSRnamBISXfqBxmSSdEgIbpNzBKFSG6Fq7x8'
)

console.log(client);
