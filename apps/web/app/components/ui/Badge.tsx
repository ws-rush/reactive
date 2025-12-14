import { cn } from '@/lib/utils'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    variant?: 'default' | 'outline' | 'secondary' | 'accent'
    size?: 'sm' | 'md'
}

export function Badge({
    className,
    variant = 'default',
    size = 'md',
    ...props
}: BadgeProps) {
    const variants = {
        default: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300',
        outline: 'border border-gray-200 text-gray-800 dark:border-gray-700 dark:text-gray-300',
        secondary: 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100',
        accent: 'bg-hn-orange-100 text-hn-orange-800 dark:bg-hn-orange-900/30 dark:text-hn-orange-300',
    }

    const sizes = {
        sm: 'text-[10px] px-1.5 py-0.5',
        md: 'text-xs px-2.5 py-0.5',
    }

    return (
        <span
            className={cn(
                'inline-flex items-center font-medium rounded-full transition-colors',
                variants[variant],
                sizes[size],
                className
            )}
            {...props}
        />
    )
}
