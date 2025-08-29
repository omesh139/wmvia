import React, { useState } from 'react'
import { motion } from 'framer-motion'

const Navbar = ({ current, onNavigate }) => {
  const items = [
    { key: "home", label: "Home" },
    { key: "about", label: "About" },
    { key: "projects", label: "Projects" },
    { key: "events", label: "Events" },
    { key: "gallery", label: "Gallery" },
    { key: "contact", label: "Contact" },
  ];

  const [lang, setLang] = useState("en");

  return (
    <div className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-inner" />
            <div className="leading-tight">
              <div className="text-base font-extrabold tracking-tight">Walagedara National School - Invention Association</div>
              <div className="text-xs text-gray-500">Innovate • Build • Inspire</div>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-1">
            {items.map((it) => (
              <button
                key={it.key}
                onClick={() => onNavigate(it.key)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition hover:bg-gray-100 ${current === it.key ? "text-blue-700 bg-blue-50" : "text-gray-700"}`}
              >
                {lang === "si" ? (it.label === "Home" ? "මුල් පිටුව" : it.label === "About" ? "අපි ගැන" : it.label === "Projects" ? "ව්‍යවසාය" : it.label === "Events" ? "සිදුවීම්" : it.label === "Gallery" ? "ගැලරිය" : it.label === "Contact" ? "සම්බන්ධ වන්න" : it.label) : it.label}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button onClick={() => setLang(lang === "en" ? "si" : "en")} className="px-3 py-2 rounded-xl border text-sm">
              {lang === "en" ? "සිංහල" : "EN"}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState("home");

  return (
    <div>
      <Navbar current={page} onNavigate={setPage} />
      <main className="max-w-5xl mx-auto p-6">
        <motion.div key={page} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          {page === "home" && <h1 className="text-3xl font-bold text-center">Welcome to Our Invention Association 🚀</h1>}
          {page === "about" && <p className="text-lg">We are a group of innovators from Walagedara National School working on creative projects and inventions.</p>}
          {page === "projects" && <p className="text-lg">Our projects include robotics, IoT, and software solutions.</p>}
          {page === "events" && <p className="text-lg">Stay tuned for our upcoming innovation events and exhibitions.</p>}
          {page === "gallery" && <p className="text-lg">Gallery coming soon with photos of our works and events.</p>}
          {page === "contact" && <p className="text-lg">Contact us at: invention@walagedara.sch.lk</p>}
        </motion.div>
      </main>
    </div>
  )
}
