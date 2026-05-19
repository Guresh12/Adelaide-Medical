import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isLoaded, user } = useAuth();

    // Wait for Supabase to initialise session
    if (!isLoaded) {
        return (
            <div className="min-h-screen bg-[#0a0f1e] flex items-center justify-center">
                <div className="animate-spin w-10 h-10 border-2 border-[#c9a96e] border-t-transparent rounded-full" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    return <>{children}</>;
}
