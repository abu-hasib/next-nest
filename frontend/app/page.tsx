import { CreateAppointment } from "@/components/CreateAppointment";
import { Toaster } from "@/components/ui/sonner"

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="container flex min-h-screen flex-col items-center py-32 px-16 bg-white dark:bg-black sm:items-start">
        <h1 className="text-2xl font-bold mb-4">Book an Appointment</h1>
        <CreateAppointment />
        <Toaster />
      </main>
    </div>
  );
}
