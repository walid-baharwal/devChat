import Sidebar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <section className="flex justify-center min-h-[100vh] items-center">
        <Sidebar>{children}</Sidebar>
      </section>
    </main>
  );
}
