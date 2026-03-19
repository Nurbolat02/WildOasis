
import { createClient } from '@supabase/supabase-js'
export const supabaseUrl = 'https://alvzljnhuaesrkrpukdn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFsdnpsam5odWFlc3JrcnB1a2RuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMzMzc5NDIsImV4cCI6MjA4ODkxMzk0Mn0.qW2jSpM3JMyvTnB2dZqFUui0QuVbG92Lv7y_U4PA9xI'
export const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase