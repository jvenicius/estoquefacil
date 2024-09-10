import { createClient } from '@supabase/supabase-js'
const supabaseUrl = "https://kieyncanbvjrrxsvxhbq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtpZXluY2FuYnZqcnJ4c3Z4aGJxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0NzY1MjgsImV4cCI6MjA0MTA1MjUyOH0.htUOWbCkR0YhMgDiSVNXc7Kxv_UMQsj4UwfZBbeLGZQ";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;