import SubscriberForm from "@/components/SubscriberForm";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1 className="text-4xl font-bold mb-10">Email Confirmation</h1>
      <SubscriberForm />
    </div>
  );
}
