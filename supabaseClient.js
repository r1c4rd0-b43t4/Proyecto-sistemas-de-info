import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://llpzcyzmcfvjivsnjqbk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxscHpjeXptY2Z2aml2c25qcWJrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1NzMwNTEsImV4cCI6MjA1NzE0OTA1MX0.TU-JGscPfHV2zKRwpTLEjRM_lU0Nbh8AM_rV-UhVxZw'

export const supabase = createClient(supabaseUrl, supabaseKey)