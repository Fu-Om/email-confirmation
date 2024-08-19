import {
  getOneSubscriberByToken,
  updateSubscriberToVerified,
} from "@/lib/queries";

interface ConfirmPageProps {
  searchParams: {
    token: string | undefined;
  };
}

const ConfirmPage = async ({ searchParams }: ConfirmPageProps) => {
  const { token } = searchParams;
  const existingSubscriber = await getOneSubscriberByToken(token as string);
  if (!existingSubscriber) {
    throw new Error("Invalid token");
  }

  if (!existingSubscriber.verified) {
    await updateSubscriberToVerified(existingSubscriber.id);
  }

  const { email } = existingSubscriber;

  return (
    <>
      <p className="text-xl mb-4">{email}</p>
      <h1 className="mb-10  font-semibold tracking-tight text-4xl">
        Verified! ✅
      </h1>
    </>
  );
};

export default ConfirmPage;
