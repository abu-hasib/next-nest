"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useAuth";

type LoginForm = { email: string; password: string };

export default function LoginPage() {
  const { login } = useAuth();
  const { register, handleSubmit } = useForm<LoginForm>();
  const router = useRouter();

  async function onSubmit(data: LoginForm) {
    try {
      await login(data.email, data.password);
      router.push("/admin/dashboard");
    } catch (err: any) {
      alert("Login failed: " + (err?.response?.data?.message ?? err.message));
    }
  }

  return (
    <div className="container max-w-md">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-sm mb-1">Email</label>
          <input type="email" {...register("email", { required: true })} className="w-full px-3 py-2 border rounded" />
        </div>
        <div className="mb-4">
          <label className="block text-sm mb-1">Password</label>
          <input type="password" {...register("password", { required: true })} className="w-full px-3 py-2 border rounded" />
        </div>
        <button className="px-4 py-2 bg-green-600 text-white rounded">Login</button>
      </form>
    </div>
  );
}
