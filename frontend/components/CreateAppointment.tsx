"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import FormInput from "./FormInput";
import { Textarea } from "./ui/textarea";
import { SelectDate } from "./SelectDate";
import API from "@/lib/api";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.email().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  appointmentDateTime: z.date().optional(),
  notes: z.string().optional(),
});

export function CreateAppointment() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      appointmentDateTime: new Date(),
      notes: "",
    },
  });

  const { register } = form;

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
        const res = await API.post("/appointments", {
          ...values,
        });
      toast(`Event created`)
    } catch (err: any) {
      alert(
        "Error creating appointment: " +
          (err?.response?.data?.message ?? err.message)
      );
    }
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormInput
          form={form}
          label="Name"
          id="name"
          {...register("name", { required: true })}
        />
        <FormInput
          form={form}
          label="Email"
          id="email"
          type="email"
          {...register("email", { required: true })}
        />
        <div className="mb-4">
          <SelectDate
            form={form}
            id="appointmentDateTime"
            label="Select Appointment Date"
            type="datetime"
            {...register("appointmentDateTime", { required: true })}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Notes</label>
          <Textarea
            {...register("notes")}
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <Button type="submit">Book</Button>
      </form>
    </Form>
  );
}
