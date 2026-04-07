import * as React from 'react';
import { cn } from './utils';

const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-9 w-full rounded-[10px] border border-gray-300 bg-wia-cream px-3 py-2 text-base transition-colors',
        'placeholder:text-gray-500',
        'focus:bg-wia-mustard focus:outline-none focus:ring-2 focus:ring-wia-red focus:ring-offset-0 focus:border-transparent',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = 'Input';

export { Input };
