import React, { useState, useRef, useEffect } from "react";
import { HomeIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { ModeToggle } from "./ModeToggle";

const navLinks = [
  { name: "Dashboard", href: "/dashboard", icon: <HomeIcon /> },
  { name: "Settings", href: "#", icon: <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6l4 2" /></svg> },
];

export default function Sidebar() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const avatarRef = useRef(null);
  const dropdownRef = useRef(null);

  const handleLogout = () => {
    setDropdownOpen(false);
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        avatarRef.current &&
        !(avatarRef.current as any).contains(event.target) &&
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  return (
    <aside className="h-screen w-64 bg-white dark:bg-gray-800 border-r dark:border-gray-700 flex flex-col justify-between py-6 px-4">
      <div>
        <div className="flex items-center mb-10">
          <span className="text-xl font-bold dark:text-white">MyApp</span>
        </div>
        <nav className="space-y-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="flex items-center px-3 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
            >
              <span className="mr-3">{link.icon}</span>
              {link.name}
            </a>
          ))}
        </nav>
      </div>
      <div className="flex flex-col gap-4">
        <div className="flex justify-center">
          <ModeToggle />
        </div>
        <div className="relative flex items-center space-x-3">
          <button
            ref={avatarRef}
            onClick={() => setDropdownOpen((open) => !open)}
            className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-600 flex items-center justify-center font-bold text-gray-600 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black dark:focus:ring-white"
            aria-label="User menu"
          >
            S
          </button>
          <div>
            <div className="text-sm font-medium dark:text-white">Admin</div>
            <div className="text-xs text-gray-400 dark:text-gray-300">Owner</div>
          </div>
          {dropdownOpen && (
            <div
              ref={dropdownRef}
              className="absolute left-0 bottom-12 z-10 w-32 bg-white dark:bg-gray-700 rounded shadow-lg py-2 border dark:border-gray-600"
            >
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600 rounded"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
} 