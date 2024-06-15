import { Ban } from "lucide-react";

export function ErrorMessage({ message }: { message: string }) {
  return (
    <>
      <Ban className="h-5 w-5 text-red-500" />
      <p className="text-sm text-red-500">{message}</p>
    </>
  );
}
