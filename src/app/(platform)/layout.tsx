import { Toaster } from "@/components/ui/sonner";
import ModalProvider from "@/providers/ModalProvider";
import QueryProvider from "@/providers/QueryProvider";
import { ClerkProvider } from "@clerk/nextjs";

export default function PlatformLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <QueryProvider>
        <ModalProvider />
        <Toaster />
        {children}
      </QueryProvider>
    </ClerkProvider>
  );
}
