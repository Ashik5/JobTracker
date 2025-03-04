'use client';

import * as React from 'react';
import * as MenubarPrimitive from '@radix-ui/react-menubar';
import { Check, ChevronRight, Circle } from 'lucide-react';

const MenubarMenu = MenubarPrimitive.Menu;
const MenubarGroup = MenubarPrimitive.Group;
const MenubarPortal = MenubarPrimitive.Portal;
const MenubarSub = MenubarPrimitive.Sub;
const MenubarRadioGroup = MenubarPrimitive.RadioGroup;

const Menubar = React.forwardRef((props, ref) => {
  const { className, ...restProps } = props;
  const finalClassName = className
    ? `flex h-10 items-center space-x-1 rounded-md border bg-background p-1 ${className}`
    : 'flex h-10 items-center space-x-1 rounded-md border bg-background p-1';

  return (
    <MenubarPrimitive.Root
      ref={ref}
      className={finalClassName}
      {...restProps}
    />
  );
});
Menubar.displayName = MenubarPrimitive.Root.displayName;

const MenubarTrigger = React.forwardRef((props, ref) => {
  const { className, ...restProps } = props;
  const finalClassName = className
    ? `flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground ${className}`
    : 'flex cursor-default select-none items-center rounded-sm px-3 py-1.5 text-sm font-medium outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground';

  return (
    <MenubarPrimitive.Trigger
      ref={ref}
      className={finalClassName}
      {...restProps}
    />
  );
});
MenubarTrigger.displayName = MenubarPrimitive.Trigger.displayName;

const MenubarSubTrigger = React.forwardRef((props, ref) => {
  const { className, inset, children, ...restProps } = props;
  const baseClasses = 'flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[state=open]:bg-accent data-[state=open]:text-accent-foreground';
  const insetClasses = inset ? 'pl-8' : '';
  const finalClassName = className
    ? `${baseClasses} ${insetClasses} ${className}`
    : `${baseClasses} ${insetClasses}`;

  return (
    <MenubarPrimitive.SubTrigger
      ref={ref}
      className={finalClassName}
      {...restProps}
    >
      {children}
      <ChevronRight className="ml-auto h-4 w-4" />
    </MenubarPrimitive.SubTrigger>
  );
});
MenubarSubTrigger.displayName = MenubarPrimitive.SubTrigger.displayName;

const MenubarSubContent = React.forwardRef((props, ref) => {
  const { className, ...restProps } = props;
  const finalClassName = className
    ? `z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ${className}`
    : 'z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2';

  return (
    <MenubarPrimitive.SubContent
      ref={ref}
      className={finalClassName}
      {...restProps}
    />
  );
});
MenubarSubContent.displayName = MenubarPrimitive.SubContent.displayName;

const MenubarContent = React.forwardRef((props, ref) => {
  const { className, align = 'start', alignOffset = -4, sideOffset = 8, ...restProps } = props;
  const finalClassName = className
    ? `z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ${className}`
    : 'z-50 min-w-[12rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2';

  return (
    <MenubarPrimitive.Portal>
      <MenubarPrimitive.Content
        ref={ref}
        align={align}
        alignOffset={alignOffset}
        sideOffset={sideOffset}
        className={finalClassName}
        {...restProps}
      />
    </MenubarPrimitive.Portal>
  );
});
MenubarContent.displayName = MenubarPrimitive.Content.displayName;

const MenubarItem = React.forwardRef((props, ref) => {
  const { className, inset, ...restProps } = props;
  const baseClasses = 'relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50';
  const insetClasses = inset ? 'pl-8' : '';
  const finalClassName = className
    ? `${baseClasses} ${insetClasses} ${className}`
    : `${baseClasses} ${insetClasses}`;

  return (
    <MenubarPrimitive.Item
      ref={ref}
      className={finalClassName}
      {...restProps}
    />
  );
});
MenubarItem.displayName = MenubarPrimitive.Item.displayName;

const MenubarCheckboxItem = React.forwardRef((props, ref) => {
  const { className, children, checked, ...restProps } = props;
  const finalClassName = className
    ? `relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`
    : 'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50';

  return (
    <MenubarPrimitive.CheckboxItem
      ref={ref}
      className={finalClassName}
      checked={checked}
      {...restProps}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Check className="h-4 w-4" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.CheckboxItem>
  );
});
MenubarCheckboxItem.displayName = MenubarPrimitive.CheckboxItem.displayName;

const MenubarRadioItem = React.forwardRef((props, ref) => {
  const { className, children, ...restProps } = props;
  const finalClassName = className
    ? `relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`
    : 'relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50';

  return (
    <MenubarPrimitive.RadioItem
      ref={ref}
      className={finalClassName}
      {...restProps}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        <MenubarPrimitive.ItemIndicator>
          <Circle className="h-2 w-2 fill-current" />
        </MenubarPrimitive.ItemIndicator>
      </span>
      {children}
    </MenubarPrimitive.RadioItem>
  );
});
MenubarRadioItem.displayName = MenubarPrimitive.RadioItem.displayName;

const MenubarLabel = React.forwardRef((props, ref) => {
  const { className, inset, ...restProps } = props;
  const baseClasses = 'px-2 py-1.5 text-sm font-semibold';
  const insetClasses = inset ? 'pl-8' : '';
  const finalClassName = className
    ? `${baseClasses} ${insetClasses} ${className}`
    : `${baseClasses} ${insetClasses}`;

  return (
    <MenubarPrimitive.Label
      ref={ref}
      className={finalClassName}
      {...restProps}
    />
  );
});
MenubarLabel.displayName = MenubarPrimitive.Label.displayName;

const MenubarSeparator = React.forwardRef((props, ref) => {
  const { className, ...restProps } = props;
  const finalClassName = className
    ? `-mx-1 my-1 h-px bg-muted ${className}`
    : '-mx-1 my-1 h-px bg-muted';

  return (
    <MenubarPrimitive.Separator
      ref={ref}
      className={finalClassName}
      {...restProps}
    />
  );
});
MenubarSeparator.displayName = MenubarPrimitive.Separator.displayName;

const MenubarShortcut = (props) => {
  const { className, ...restProps } = props;
  const finalClassName = className
    ? `ml-auto text-xs tracking-widest text-muted-foreground ${className}`
    : 'ml-auto text-xs tracking-widest text-muted-foreground';

  return <span className={finalClassName} {...restProps} />;
};
MenubarShortcut.displayname = 'MenubarShortcut';

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
  MenubarLabel,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarPortal,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarGroup,
  MenubarSub,
  MenubarShortcut,
};