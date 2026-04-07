import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import { cn } from './utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[10px] text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-wia-red focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-wia-red text-white shadow-sm hover:bg-wia-red-dark',
        outline:
          'border-2 border-wia-red bg-white text-wia-red hover:bg-red-50 hover:border-wia-red-dark',
        ghost: 'text-wia-body hover:bg-gray-100 hover:text-wia-red',
      },
      size: {
        default: 'h-9 px-4 py-2',
        lg: 'h-12 px-8 py-6 text-lg',
        sm: 'h-8 px-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

const Button = React.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
