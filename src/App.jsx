// src/App.jsx
import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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
  <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700">
    {children}
  </span>
);

const Card = ({ children, className = "" }) => (
  <div className={`rounded-2xl shadow-md bg-white p-6 ${className}`}>
    {children}
  </div>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-8">
    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
      {title}
    </h2>
    {subtitle && <p className="mt-2 text-gray-600 max-w-2xl">{subtitle}</p>}
  </div>
);

// --- Navbar ---
const Navbar = ({ current, onNavigate }) => {
  const items = [
    { key: "home", label: "Home" },
    { key: "about", label: "About" },
    { key: "projects", label: "Projects" },
    { key: "events", label: "Events" },
    { key: "gallery", label: "Gallery" },
    { key: "contact", label: "Contact" },
  ];

  const [lang, setLang] = React.useState("en");

  return (
    <div className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-inner" />
            <div className="leading-tight">
              <div className="text-base font-extrabold tracking-tight">
                Walagedara National School - Invention Association
              </div>
              <div className="text-xs text-gray-500">
                Innovate • Build • Inspire
              </div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {items.map((it) => (
              <button
                key={it.key}
                onClick={() => onNavigate(it.key)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition hover:bg-gray-100 ${
                  current === it.key
                    ? "text-blue-700 bg-blue-50"
                    : "text-gray-700"
                }`}
              >
                {lang === "si"
                  ? it.label === "Home"
                    ? "මුල් පිටුව"
                    : it.label === "About"
                    ? "අපි ගැන"
                    : it.label === "Projects"
                    ? "ව්‍යවසාය"
                    : it.label === "Events"
                    ? "සිදුවීම්"
                    : it.label === "Gallery"
                    ? "ගැලරිය"
                    : it.label === "Contact"
                    ? "සම්බන්ධ වන්න"
                    : it.label
                  : it.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <div className="hidden md:block">
              <button
                onClick={() => setLang(lang === "en" ? "si" : "en")}
                className="px-3 py-2 rounded-xl border text-sm"
              >
                {lang === "en" ? "සිංහල" : "EN"}
              </button>
            </div>
            <div className="md:hidden">
              <select
                className="border rounded-xl px-3 py-2"
                value={current}
                onChange={(e) => onNavigate(e.target.value)}
              >
                {items.map((it) => (
                  <option key={it.key} value={it.key}>
                    {it.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- All Pages (Home, About, Projects, Events, Gallery, Contact) ---
// ⚡ (you already pasted them above, keep them inside App.jsx)

// --- Footer ---
const Footer = ({ onNavigate }) => (
  <footer className="mt-10 border-t">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid md:grid-cols-3 gap-8 text-sm">
      <div>
        <div className="font-extrabold">Invention Association</div>
        <p className="text-gray-600 mt-2">Innovate • Build • Inspire</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
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
                <button
                  onClick={() => onNavigate(key)}
                  className="hover:underline"
                >
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
            <li>011-123-4567</li>
          </ul>
        </div>
      </div>
      <div className="md:text-right">
        <div>© {new Date().getFullYear()} Invention Association</div>
        <div className="text-gray-500">Made with ❤️ by Students</div>
      </div>
    </div>
  </footer>
);

// --- Main App ---
export default function App() {
  const [page, setPage] = useState("home");

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-white text-gray-900">
      <Navbar current={page} onNavigate={navigate} />

      <AnimatePresence mode="wait">
        {page === "home" && <HomePage key="home" onNavigate={navigate} />}
        {page === "about" && <AboutPage key="about" />}
        {page === "projects" && <ProjectsPage key="projects" />}
        {page === "events" && <EventsPage key="events" />}
        {page === "gallery" && <GalleryPage key="gallery" />}
        {page === "contact" && <ContactPage key="contact" />}
      </AnimatePresence>

      <Footer onNavigate={navigate} />
    </div>
  );
}
