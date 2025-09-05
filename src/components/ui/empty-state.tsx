import { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action, 
  className 
}: EmptyStateProps) {
  return (
    <div className={cn(
      'flex flex-col items-center justify-center py-12 text-center',
      className
    )}>
      <div className="mb-4 rounded-full bg-zinc-100 dark:bg-zinc-800 p-3">
        <Icon className="h-8 w-8 text-zinc-600 dark:text-zinc-400" />
      </div>
      
      <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        {title}
      </h3>
      
      {description && (
        <p className="mb-6 max-w-sm text-zinc-600 dark:text-zinc-400">
          {description}
        </p>
      )}
      
      {action && (
        <div className="flex justify-center">
          {action}
        </div>
      )}
    </div>
  );
}
