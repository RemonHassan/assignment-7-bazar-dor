"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/signin");
        },
      },
    });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const updatedData = Object.fromEntries(formData.entries());

    console.log("Updating profile with:", updatedData);

    try {
      // Call Better Auth client to update user profile name
      await authClient.updateUser({
        name: updatedData.name as string,
      });
      alert("প্রোফাইল আপডেট হয়েছে!");
    } catch (error) {
      toast.error(`Update failed:${error}`);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3f6f3] flex flex-col items-center justify-start py-12 px-4">
      <div className="w-full max-w-2xl space-y-6">
        {/* Header Section */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-1">
            আমার প্রোফাইল
          </h1>
          <p className="text-gray-600 text-sm">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User Card */}
        <div className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name || "User Avatar"}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-xl font-bold text-gray-500">
                  {user?.name?.charAt(0) || "U"}
                </div>
              )}
            </div>

            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {user?.name || "Rezwan Ahmed"}
              </h2>
              <p className="text-gray-500 text-sm">
                {user?.email || "rezwanahmed@gmail.com"}
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="btn btn-sm btn-outline border-red-400 text-red-500 hover:bg-red-50 hover:border-red-500 hover:text-red-600 normal-case rounded-lg font-medium px-4 gap-1.5"
          >
            ← সাইন আউট
          </button>
        </div>

        {/* Info Form Card */}
        <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-100">
          <h3 className="text-lg font-bold text-gray-900 mb-6">তথ্য</h3>

          <form onSubmit={handleUpdate} className="space-y-6">
            <div className="form-control">
              <label className="label pt-0 pb-2">
                <span className="label-text text-gray-800 font-medium text-sm">
                  নাম
                </span>
              </label>
              <input
                type="text"
                name="name"
                defaultValue={user?.name || ""}
                className="input input-bordered w-full bg-gray-50/50 focus:bg-white text-gray-800 rounded-xl"
              />
            </div>

            <button
              type="submit"
              className="btn bg-[#008744] hover:bg-[#007038] text-white border-none w-full text-base font-medium rounded-xl h-12 shadow-sm"
            >
              আপডেট
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
