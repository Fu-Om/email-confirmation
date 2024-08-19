"use client";

import React from "react";
import SubscribeButton from "./SubscribeButton";
import { subscribe } from "@/actions/subscribe";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const SubscriberForm = () => {
  const router = useRouter();
  // handleSubmit is run on the client
  const handleSubmit = async (formData: FormData) => {
    const { error, data } = await subscribe(formData);
    if (error) {
      console.log(error);
      toast.error(error);
    } else {
      toast.success(data as string);
      router.push("/subscriber/pending");
    }
  };
  return (
    <form action={handleSubmit}>
      <label htmlFor="email" className="hidden">
        Email
      </label>
      <div className="relative">
        <input
          type="text"
          name="email"
          id="email"
          className="w-full rounded-md border border-white/[0.67] bg-transparent p-3 pl-4 text-white"
        />
        <SubscribeButton />
      </div>
    </form>
  );
};

export default SubscriberForm;
