'use client';

import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { Controller, FormProvider, useFormContext } from 'react-hook-form';
import { Label } from '@/components/ui/label';

const Form = FormProvider;

const FormFieldContext = React.createContext({});

const FormField = (props) => {
  return (
    <FormFieldContext.Provider value={{ name: props.name }}>
      <Controller {...props} />
    </FormFieldContext.Provider>
  );
};

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  const fieldState = getFieldState(fieldContext.name, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

const FormItemContext = React.createContext({});

const FormItem = React.forwardRef((props, ref) => {
  const id = React.useId();
  const { className, ...restProps } = props;
  
  const finalClassName = className 
    ? `space-y-2 ${className}`
    : 'space-y-2';

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={finalClassName} {...restProps} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef((props, ref) => {
  const { error, formItemId } = useFormField();
  const { className, ...restProps } = props;
  
  const finalClassName = className 
    ? `${error ? 'text-destructive' : ''} ${className}`
    : error ? 'text-destructive' : '';

  return (
    <Label
      ref={ref}
      className={finalClassName}
      htmlFor={formItemId}
      {...restProps}
    />
  );
});
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef((props, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } = useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef((props, ref) => {
  const { className, ...restProps } = props;
  const { formDescriptionId } = useFormField();
  
  const finalClassName = className 
    ? `text-sm text-muted-foreground ${className}`
    : 'text-sm text-muted-foreground';

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={finalClassName}
      {...restProps}
    />
  );
});
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef((props, ref) => {
  const { className, children, ...restProps } = props;
  const { error, formMessageId } = useFormField();
  const body = error ? String(error?.message) : children;
  
  if (!body) {
    return null;
  }

  const finalClassName = className 
    ? `text-sm font-medium text-destructive ${className}`
    : 'text-sm font-medium text-destructive';

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={finalClassName}
      {...restProps}
    >
      {body}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};