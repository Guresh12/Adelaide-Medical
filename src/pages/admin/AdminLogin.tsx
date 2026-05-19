import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function AdminLogin() {
    const { user, isLoaded } = useAuth();
    const navigate = useNavigate();
    const [authError, setAuthError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),
    });

    // If already signed in, go straight to dashboard
    if (isLoaded && user) {
        return <Navigate to="/admin/dashboard" replace />;
    }

    const onSubmit = async (data: LoginFormValues) => {
        setIsLoading(true);
        setAuthError(null);
        
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email: data.email,
                password: data.password,
            });

            if (error) {
                setAuthError(error.message);
            } else {
                navigate('/admin/dashboard', { replace: true });
            }
        } catch (err) {
            setAuthError('An unexpected error occurred.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0a0f1e] flex flex-col items-center justify-center p-4">
            {/* Ambient glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#c9a96e]/5 rounded-full blur-[120px]" />
            </div>

            {/* Branding */}
            <div className="relative text-center mb-8 z-10">
                <div className="inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2 mb-3">
                    <span className="text-[#c9a96e] font-semibold text-sm tracking-wide">Adelaide Medical</span>
                    <span className="w-1 h-1 rounded-full bg-[#c9a96e]/50" />
                    <span className="text-[#8b9ab5] text-xs">Admin Portal</span>
                </div>
                <p className="text-[#4a5568] text-xs">Restricted access — authorised personnel only</p>
            </div>

            {/* Custom Login Form */}
            <div className="relative w-full max-w-md z-10">
                <div className="bg-[#111827] border border-white/10 rounded-2xl shadow-2xl p-8">
                    <div className="mb-6">
                        <h2 className="text-xl font-semibold text-white">Sign In</h2>
                        <p className="text-sm text-[#8b9ab5] mt-1">Enter your credentials to access the admin portal</p>
                    </div>

                    {authError && (
                        <div className="mb-6 p-4 rounded-xl border border-red-500/20 bg-red-500/10 flex items-start gap-3">
                            <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                            <p className="text-sm text-red-400">{authError}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#8b9ab5]">Email Address</label>
                            <input
                                {...register('email')}
                                type="email"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-[#4a5568] focus:outline-none focus:border-[#c9a96e]/60 focus:ring-1 focus:ring-[#c9a96e]/60 transition-colors"
                                placeholder="admin@adelaide.com"
                            />
                            {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-sm font-medium text-[#8b9ab5]">Password</label>
                            <input
                                {...register('password')}
                                type="password"
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white placeholder-[#4a5568] focus:outline-none focus:border-[#c9a96e]/60 focus:ring-1 focus:ring-[#c9a96e]/60 transition-colors"
                                placeholder="••••••••"
                            />
                            {errors.password && <p className="text-xs text-red-400">{errors.password.message}</p>}
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-[#c9a96e] to-[#b8965a] hover:opacity-90 text-white font-medium rounded-xl px-4 py-2.5 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2 mt-2"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
