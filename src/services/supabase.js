import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hvspnnliwpgsoyophshg.supabase.co'
const supabaseKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2c3Bubmxpd3Bnc295b3Boc2hnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTgzNDE4MzksImV4cCI6MjAxMzkxNzgzOX0.Cr4TWsmMXtiKCj0Drs-QGwJZbxt3AwX_uepFaim1ivo'
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase
