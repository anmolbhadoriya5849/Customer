import { Toaster } from "sonner";

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Toaster position="top-right" richColors />
      {children}
    </>
  );
}
