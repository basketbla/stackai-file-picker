import FileExplorer from "@/components/file-explorer";
import { getTokenFromCookies } from "@/lib/auth";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = await cookies();
  const cookieString = cookieStore.toString();
  const token = getTokenFromCookies(cookieString);

  // This should not happen due to middleware redirect, but just in case
  if (!token) {
    return <div>Authentication required</div>;
  }

  return <FileExplorer />;
}
