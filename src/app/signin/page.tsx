"use client";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import React from "react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { toast } from "react-toastify";

const SignInPage = () => {
  const onSubmit = async (e: React.SubmitEvent<HTMLElement>) => {
    e.preventDefault();

    const fromData = new FormData(e.target);
    const user = Object.fromEntries(fromData.entries()) as {
      name: string;
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      toast.success(`Welcome ${user.name}`);
    }
    if (error) {
      toast.error(`${error.message}`);
    }
  };
  const handleGoogleSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "google",
    });
  };
  const handleGithubSignIn = async () => {
    const data = await authClient.signIn.social({
      provider: "github",
    });
  };

  return (
    <div className="bg-[#f3f6f3] flex flex-col items-center justify-center p-4">
      {/* Header Section */}
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">সাইন ইন </h1>
        <p className="text-gray-600 text-sm">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।{" "}
        </p>
      </div>

      {/* Form Card */}
      <div className="card bg-base-100 w-full max-w-md shadow-sm rounded-2xl p-8 border border-base-200">
        <form onSubmit={onSubmit} className="space-y-4">
          {/* Email Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-800 font-medium">
                ইমেইল
              </span>
            </label>
            <input
              type="email"
              name="email"
              className="input input-bordered w-full bg-gray-50 focus:bg-white"
              placeholder="you@example.com"
            />
          </div>

          {/* Password Input */}
          <div className="form-control">
            <label className="label">
              <span className="label-text text-gray-800 font-medium">
                পাসওয়ার্ড
              </span>
            </label>
            <input
              type="password"
              name="password"
              className="input input-bordered w-full bg-gray-50 focus:bg-white"
              placeholder="কমপক্ষে ৮ অক্ষর"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn bg-[#008744] hover:bg-[#007038] text-white border-none w-full mt-2 text-base font-medium"
          >
            সাইন ইন
          </button>

          {/* Divider */}
          <div className="divider text-xs text-gray-400 my-4">অথবা</div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="btn btn-outline border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700 font-normal normal-case flex items-center justify-center gap-2"
            >
              <FcGoogle className="text-2xl" />
              Google দিয়ে চালিয়ে যান
            </button>

            <button
              type="button"
              onClick={handleGithubSignIn}
              className="btn btn-outline border-gray-300 hover:bg-gray-50 hover:border-gray-400 text-gray-700 font-normal normal-case flex items-center justify-center gap-2"
            >
              <FaGithub className="text-2xl" />
              GitHub দিয়ে চালিয়ে যান
            </button>
          </div>

          {/* Already have an account link */}
          <div className="text-center pt-2 text-sm text-gray-600">
            অ্যাকাউন্ট নেই?{" "}
            <Link
              href="/signup"
              className="text-[#008744] hover:underline font-medium"
            >
              সাইন আপ করুন
            </Link>
          </div>
        </form>
      </div>

      {/* Return to Home link */}
      <div className="mt-6 text-center">
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1"
        >
          ← হোম পেজে ফিরে যান
        </Link>
      </div>
    </div>
  );
};

export default SignInPage;
