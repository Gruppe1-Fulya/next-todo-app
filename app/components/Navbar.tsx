import Link from "next/link";
import Login from "../auth/Login";
import SignUp from "../auth/SignUp";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";

export default async function Navbar() {
  const session = await getServerSession(authOptions);
  console.log(session);
  return (
    <nav className="flex justify-between items-center py-8">
      <Link href={"/"}>
        <h1>{"INF 202 Projektauftrag".toUpperCase()}</h1>
      </Link>
      <ul>
        {!session?.user ? (
          <Login />
        ) : (
          <SignUp image={session.user.image || ""} />
        )}
      </ul>
    </nav>
  );
}
