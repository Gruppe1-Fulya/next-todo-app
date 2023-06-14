import Image from "next/image";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { Todo } from "../types/Types";
import ActionBox from "./ActionBox";

export default async function Todo({ id, name, avatar, content }: Todo) {
  const session = await getServerSession(authOptions);
  return (
    <div className="bg-white my-8 p-8 rounded-lg">
      <div className="flex items-center gap-2">
        <Image
          className="rounded-full"
          width={32}
          height={32}
          src={avatar}
          alt="avatar"
        />
        <h3 className="font-bold text-gray-700">{name}</h3>
      </div>
      <div className="my-8 flex  justify-between">
        <p className="break-all text-black">{content}</p>
        {session?.user ? <ActionBox id={id} /> : ""}
      </div>
    </div>
  );
}