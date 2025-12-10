"use client";

import * as React from "react";
import { parseDate } from "chrono-node";
import { CalendarIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormField, FormItem, FormLabel } from "./ui/form";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";

type SelectDateProps<T extends FieldValues> = {
  type: string;
  label: string;
  id: Path<T>;
  form: UseFormReturn<T>;
};

function formatDate(date: Date | undefined) {
  if (!date) {
    return "";
  }

  return date.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function SelectDate<T extends FieldValues>({
  type = "text",
  label = "",
  id,
  form,
}: SelectDateProps<T>) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("In 2 days");
  const [date, setDate] = React.useState<Date | undefined>(
    parseDate(value) || undefined
  );
  const [month, setMonth] = React.useState<Date | undefined>(date);

  return (
    <div className="flex flex-col gap-3">
      <FormField
        // control={form.control}
        name={id}
        render={() => (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <div className="relative flex gap-2">
              <Input
                id={id}
                type={type}
                value={value}
                placeholder="Tomorrow or next week"
                className="bg-background pr-10"
                onChange={(e) => {
                  setValue(e.target.value);
                  const date = parseDate(e.target.value);
                  if (date) {
                    setDate(date);
                    setMonth(date);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === "ArrowDown") {
                    e.preventDefault();
                    setOpen(true);
                  }
                }}
              />
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    id="date-picker"
                    variant="ghost"
                    className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
                  >
                    <CalendarIcon className="size-3.5" />
                    <span className="sr-only">Select date</span>
                  </Button>
                </PopoverTrigger>
                <PopoverContent
                  className="w-auto overflow-hidden p-0"
                  align="end"
                >
                  <Calendar
                    mode="single"
                    selected={date}
                    captionLayout="dropdown"
                    month={month}
                    onMonthChange={setMonth}
                    onSelect={(date) => {
                      setDate(date);
                      setValue(formatDate(date));
                      setOpen(false);
                      form.setValue(
                        id,
                        date as unknown as PathValue<T, typeof id>
                      );
                    }}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
}
