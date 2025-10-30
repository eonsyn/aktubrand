'use client';
import { useSession, signIn, signOut } from "next-auth/react";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { Loader2, LogOut } from "lucide-react";

export default function AuthButton() {
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef();

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const res = await signIn("google", { redirect: false, callbackUrl: "/" });
      if (res?.error) toast.error("Google login failed. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (session) {
    const firstLetter = session.user.name?.[0].toUpperCase() || "U";

    return (
      <div className="relative" ref={dropdownRef}>
        {/* Profile button */}
        <div
          className="w-10 h-10 rounded-full border border-red-400 bg-gradient-to-br from-red-500 to-rose-600 text-white font-semibold flex items-center justify-center cursor-pointer shadow-md hover:shadow-lg hover:scale-105 transition-all duration-200"
          onClick={() => setOpen(!open)}
        >
          {session.user.image ? (
            <img
              src={session.user.image}
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            firstLetter
          )}
        </div>

        {/* Dropdown */}
        {open && (
          <div
            className="absolute right-0 mt-3 w-44 bg-white border border-gray-100 shadow-lg rounded-xl overflow-hidden animate-fade-in z-50"
          >
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-sm font-semibold text-gray-800">{session.user.name}</p>
              <p className="text-xs text-gray-500 truncate">{session.user.email}</p>
            </div>
            <button
              onClick={() => signOut()}
              className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-medium text-red-600 hover:bg-red-50 transition-all duration-150"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <button
      onClick={handleGoogleLogin}
      disabled={loading}
      className="flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold shadow-md hover:shadow-lg hover:scale-[1.03] active:scale-95 transition-all duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {loading ? (
        <>
          <Loader2 className="animate-spin w-4 h-4" />
          Logging in...
        </>
      ) : (
        "Login with Google"
      )}
    </button>
  );
}
