import Sidebar from "@/components/Sidebar";
import { SparklesCore } from "@/components/ui/sparkles";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="flex justify-center min-h-[100vh] items-center">
      <div style={{ zIndex: -1 }} className="w-full absolute inset-0 h-screen ">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={50}
         className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>
        <div className="grid min-h-[100vh] w-[100%] lg:min-h-[70vh] lg:w-[70%] lg:grid-cols-[280px_1fr] shadow-[0_20px_80px_15px_rgba(98,37,197,0.10)] dark:bg-black/20 border border-gray-900">
          <Sidebar  />
          {children}
        </div>
      </main>
    </>
  );
}
