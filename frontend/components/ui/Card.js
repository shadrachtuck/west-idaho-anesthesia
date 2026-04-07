import * as React from 'react';
import { cn } from './utils';

const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      'flex flex-col gap-6 rounded-[12px] border border-gray-200 bg-wia-cream',
      className
    )}
    {...props}
  />
));
Card.displayName = 'Card';

export { Card };
