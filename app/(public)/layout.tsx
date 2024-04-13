import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../utils/authOptions";



export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/")
  }
  return (
    <>{children}</>
  );
}
