export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            nurses: {
                Row: {
                    id: string
                    created_at: string
                    updated_at: string
                    name: string
                    qualifications: string
                    experience: number
                    rating: number
                    reviews: number
                    specialty: string[]
                    available: boolean
                    bio: string | null
                    photo_url: string | null
                }
                Insert: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    name: string
                    qualifications: string
                    experience: number
                    rating?: number
                    reviews?: number
                    specialty: string[]
                    available?: boolean
                    bio?: string | null
                    photo_url?: string | null
                }
                Update: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    name?: string
                    qualifications?: string
                    experience?: number
                    rating?: number
                    reviews?: number
                    specialty?: string[]
                    available?: boolean
                    bio?: string | null
                    photo_url?: string | null
                }
            }
            services: {
                Row: {
                    id: string
                    created_at: string
                    updated_at: string
                    title: string
                    description: string
                    features: string[]
                    icon_name: string
                    image_url: string | null
                    active: boolean
                    sort_order: number
                }
                Insert: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    title: string
                    description: string
                    features?: string[]
                    icon_name?: string
                    image_url?: string | null
                    active?: boolean
                    sort_order?: number
                }
                Update: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    title?: string
                    description?: string
                    features?: string[]
                    icon_name?: string
                    image_url?: string | null
                    active?: boolean
                    sort_order?: number
                }
            }
            bookings: {
                Row: {
                    id: string
                    created_at: string
                    updated_at: string
                    booking_ref: string
                    nurse_id: string | null
                    service_id: string | null
                    patient_name: string
                    patient_email: string
                    patient_phone: string
                    patient_address: string
                    appointment_date: string
                    time_slot: 'morning' | 'afternoon' | 'evening'
                    notes: string | null
                    status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
                }
                Insert: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    booking_ref?: string
                    nurse_id?: string | null
                    service_id?: string | null
                    patient_name: string
                    patient_email: string
                    patient_phone: string
                    patient_address: string
                    appointment_date: string
                    time_slot: 'morning' | 'afternoon' | 'evening'
                    notes?: string | null
                    status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
                }
                Update: {
                    id?: string
                    created_at?: string
                    updated_at?: string
                    booking_ref?: string
                    nurse_id?: string | null
                    service_id?: string | null
                    patient_name?: string
                    patient_email?: string
                    patient_phone?: string
                    patient_address?: string
                    appointment_date?: string
                    time_slot?: 'morning' | 'afternoon' | 'evening'
                    notes?: string | null
                    status?: 'pending' | 'confirmed' | 'completed' | 'cancelled'
                }
            }
            site_settings: {
                Row: {
                    id: string
                    key: string
                    value: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    key: string
                    value: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    key?: string
                    value?: string
                    updated_at?: string
                }
            }
        }
        Views: Record<string, never>
        Functions: Record<string, never>
        Enums: {
            booking_status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
            time_slot: 'morning' | 'afternoon' | 'evening'
        }
    }
}

// Convenience types
export type Nurse = Database['public']['Tables']['nurses']['Row']
export type NurseInsert = Database['public']['Tables']['nurses']['Insert']
export type NurseUpdate = Database['public']['Tables']['nurses']['Update']

export type Service = Database['public']['Tables']['services']['Row']
export type ServiceInsert = Database['public']['Tables']['services']['Insert']
export type ServiceUpdate = Database['public']['Tables']['services']['Update']

export type Booking = Database['public']['Tables']['bookings']['Row']
export type BookingInsert = Database['public']['Tables']['bookings']['Insert']
export type BookingUpdate = Database['public']['Tables']['bookings']['Update']

export type SiteSetting = Database['public']['Tables']['site_settings']['Row']
