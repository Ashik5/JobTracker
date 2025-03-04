'use client';

import React from 'react';

const Label = React.forwardRef((props, ref) => {
  const { className, ...otherProps } = props;
  
  return (
    <label
      ref={ref}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className || ''}`}
      {...otherProps}
    />
  );
});

Label.displayName = 'Label';

export { Label };