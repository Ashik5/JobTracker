'use client';

import * as React from 'react';
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area';

const ScrollArea = React.forwardRef((props, ref) => {
  const { className, children, ...restProps } = props;
  const finalClassName = className
    ? `relative overflow-hidden ${className}`
    : 'relative overflow-hidden';

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={finalClassName}
      {...restProps}
    >
      <ScrollAreaPrimitive.Viewport className="h-full w-full rounded-[inherit]">
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  );
});
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

const ScrollBar = React.forwardRef((props, ref) => {
  const { className, orientation = 'vertical', ...restProps } = props;
  
  const baseClasses = 'flex touch-none select-none transition-colors';
  const orientationClasses = orientation === 'vertical'
    ? 'h-full w-2.5 border-l border-l-transparent p-[1px]'
    : 'h-2.5 flex-col border-t border-t-transparent p-[1px]';
    
  const finalClassName = className
    ? `${baseClasses} ${orientationClasses} ${className}`
    : `${baseClasses} ${orientationClasses}`;

  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={finalClassName}
      {...restProps}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  );
});
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;

export { ScrollArea, ScrollBar };