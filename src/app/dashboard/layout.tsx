import DelSession from "@/components/delSession";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Agrocheck | Dashboard",
  description: "Agrocheck",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen flex flex-col gap-5 flex-1 bg-gradient-to-b from-green-50 to-green-100 text-black ">
      <header className="bg-white w-full border border-gray-200 ">
        <div className="w-[90%] max-w-[800px] mx-auto flex justify-between h-16 items-center">
          <div className="font-semibold text-green-800 text-2xl">AgroCheck</div>
          <DelSession />
        </div>
      </header>
      <main className=" flex-1 w-[90%] max-w-[800px] mx-auto">{children}</main>
    </div>
  );
}
