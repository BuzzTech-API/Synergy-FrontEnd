import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../utils/authOptions";


export default async function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login")
  }
  return (
    <>{children}</>
  );
}
