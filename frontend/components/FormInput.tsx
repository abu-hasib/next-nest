// components/FormInput.tsx
"use client";

import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

export default function FormInput({
  form,
  label,
  id,
  type = "text",
  ...rest
}: any) {
  return (
    <div className="mb-4">
      <FormField
        control={form.control}
        name={id}
        render={({ field }) => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input type={type} placeholder="shadcn" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
