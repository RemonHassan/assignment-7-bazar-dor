"use client";
import { authClient } from "@/lib/auth-client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { toast } from "react-toastify";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  return (
    <div>
      {user ? (
        <Link href={"/profile"}>
          <div className="flex flex-col items-center gap-2">
            <div className="avatar">
              <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                <Image
                  src={user?.image as string}
                  height={50}
                  width={50}
                  alt={`picture of ${user.name}`}
                />
              </div>
            </div>
            <h2>{user.name}</h2>
          </div>
        </Link>
      ) : (
        <div className="flex items-center gap-3">
          <Link href={"/signin"}>
            <button className="px-5 py-2.5 text-gray-800 hover:text-emerald-700 font-semibold text-base transition-colors duration-200">
              সাইন ইন
            </button>
          </Link>

          <Link href={"/signup"}>
            <button className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-base rounded-xl shadow-xs transition-colors duration-200">
              সাইন আপ
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
