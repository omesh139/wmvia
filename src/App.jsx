import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";

// --- Simple helpers ---
const PageContainer = ({ children }) => (
  <motion.main
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={{ duration: 0.4 }}
    className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10"
  >
    {children}
  </motion.main>
);

const Chip = ({ children }) => (
  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200">
    {children}
  </span>
);

const Card = ({ children, className = "" }) => (
  <div
    className={`rounded-2xl shadow-md bg-white dark:bg-gray-800 p-6 ${className}`}
  >
    {children}
  </div>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-8">
    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-2 text-gray-600 dark:text-gray-400 max-w-2xl">
        {subtitle}
      </p>
    )}
  </div>
);

// --- Navbar ---
const Navbar = ({ current, onNavigate, darkMode, setDarkMode }) => {
  const items = [
    { key: "home", label: "Home" },
    { key: "about", label: "About" },
    { key: "projects", label: "Projects" },
    { key: "events", label: "Events" },
    { key: "gallery", label: "Gallery" },
    { key: "contact", label: "Contact" },
  ];
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-gray-900/80 border-b dark:border-gray-700 transition">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <img
              src="https://i.imgur.com/Ft8h7eQ.jpeg"
              alt="Logo"
              className="h-9 w-9 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-inner border-2 border-black"
            />
            <div className="leading-tight">
              <div className="text-base font-extrabold tracking-tight">
                Invention Association - WMV
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Innovate • Build • Inspire
              </div>
            </div>
          </div>

          {/* Desktop menu */}
          <nav className="hidden md:flex items-center gap-1">
            {items.map((it) => (
              <button
                key={it.key}
                onClick={() => onNavigate(it.key)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition hover:bg-gray-100 dark:hover:bg-gray-700 ${
                  current === it.key
                    ? "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/40"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                {it.label}
              </button>
            ))}
          </nav>

          {/* Theme + Mobile menu button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-lg border hover:bg-gray-100 dark:hover:bg-gray-700 transition"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg border-t dark:border-gray-700">
          <div className="flex flex-col space-y-2 px-4 py-3">
            {items.map((it) => (
              <button
                key={it.key}
                onClick={() => {
                  onNavigate(it.key);
                  setMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-xl text-sm font-medium ${
                  current === it.key
                    ? "text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-900/40"
                    : "text-gray-700 dark:text-gray-200"
                }`}
              >
                {it.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

        <div>
          <div className="font-semibold">Explore</div>
          <ul className="mt-2 space-y-1">
            {[
              ["Home", "home"],
              ["About", "about"],
              ["Projects", "projects"],
              ["Events", "events"],
              ["Gallery", "gallery"],
            ].map(([label, key]) => (
              <li key={key}>
                <button onClick={() => onNavigate(key)} className="hover:underline">
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-semibold">Contact</div>
          <ul className="mt-2 space-y-1 text-gray-600">
            <li>info@invention.club</li>
            <li>072-929-0239</li>
          </ul>
        </div>
      </div>
      <div className="md:text-right">
        <div>© {new Date().getFullYear()} Invention Association</div>
        <div className="text-gray-500">Made By Omesh</div>
      </div>
    </div>
  </footer>
);

export default function InventionAssociationSite() {
  const [page, setPage] = useState("home");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const applyFromHash = () => {
      const key = window.location.hash.replace("#", "");
      if (
        ["home", "about", "projects", "events", "gallery", "contact"].includes(
          key
        )
      ) {
        setPage(key);
      }
    };
    applyFromHash();
    window.addEventListener("hashchange", applyFromHash);
    return () => window.removeEventListener("hashchange", applyFromHash);
  }, []);

  const navigate = (key) => {
    setPage(key);
    window.location.hash = key;
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white dark:from-gray-900 dark:via-gray-950 dark:to-black text-gray-900 dark:text-gray-100 transition-colors duration-500">
        <Navbar
          current={page}
          onNavigate={navigate}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />

        <AnimatePresence mode="wait">
          {page === "home" && <HomePage key="home" onNavigate={navigate} />}
          {/* add the rest of your pages here */}
        </AnimatePresence>

        <Footer onNavigate={navigate} />
      </div>
    </div>
  );
}
