import * as Icons from 'lucide-react';
import { LucideProps } from 'lucide-react';

interface ServiceIconProps extends LucideProps {
    name: string;
}

/**
 * Dynamically renders a Lucide icon by name.
 * Default icons: Stethoscope, Pill, Activity, Heart, Bandage, HeartPulse, Home
 */
export default function ServiceIcon({ name, ...props }: ServiceIconProps) {
    // Map common names if they differ from Lucide exports, or just use as-is
    const IconComponent = (Icons as any)[name] || Icons.HelpCircle;
    return <IconComponent {...props} />;
}
