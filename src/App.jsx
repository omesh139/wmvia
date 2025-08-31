import React, { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react"; // add at top of file

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
  <div className={`rounded-2xl shadow-md bg-white p-6 ${className}`}>{children}</div>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-8">
    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-gray-900">
      {title}
    </h2>
    {subtitle && (
      <p className="mt-2 text-gray-600 max-w-2xl">{subtitle}</p>
    )}
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

  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <div className="sticky top-0 z-50 backdrop-blur bg-white/70 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
<div className="flex items-center gap-3">
  <img
    src="https://i.imgur.com/Ft8h7eQ.jpeg" // <-- replace with your image link
    alt="Logo"
    className="h-9 w-9 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 shadow-inner border-2 border-black"
  />
  <div className="leading-tight">
    <div className="text-base font-extrabold tracking-tight">
      Invention Association - WMV
    </div>
    <div className="text-xs text-gray-500">Innovate • Build • Inspire</div>
  </div>
</div>


          {/* Desktop menu */}
          <nav className="hidden md:flex items-center gap-1">
            {items.map((it) => (
              <button
                key={it.key}
                onClick={() => onNavigate(it.key)}
                className={`px-3 py-2 rounded-xl text-sm font-medium transition hover:bg-gray-100 ${
                  current === it.key ? "text-blue-700 bg-blue-50" : "text-gray-700"
                }`}
              >
                {it.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden bg-grey shadow-lg border-t">
          <div className="flex flex-col space-y-2 px-4 py-3">
            {items.map((it) => (
              <button
                key={it.key}
                onClick={() => {
                  onNavigate(it.key);
                  setMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-xl text-sm font-medium ${
                  current === it.key ? "text-blue-700 bg-blue-50" : "text-gray-700"
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


// --- Pages ---
const HomePage = ({ onNavigate }) => {
  return (
    <PageContainer>
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="order-2 lg:order-1"
        >
          <Chip>Welcome</Chip>
          <h1 className="mt-3 text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900">
            Invention Association - WMV
          </h1>
          <p className="mt-4 text-gray-700 leading-relaxed max-w-xl">
            We empower students to turn ideas into real-world solutions through
            hands-on projects, mentorship, and competitions. Join a community of
            makers, coders, designers, and dreamers.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate("projects")}
              className="px-5 py-3 rounded-2xl bg-blue-600 text-white font-semibold shadow hover:shadow-lg transition"
            >
              Explore Projects
            </button>
            <button
              onClick={() => onNavigate("contact")}
              className="px-5 py-3 rounded-2xl bg-white border font-semibold hover:bg-gray-50"
            >
              Join Us
            </button>
          </div>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[
              { k: "Members", v: "30+" },
              { k: "Projects", v: "15+" },
              { k: "Awards", v: "10+" },
            ].map((s) => (
              <Card key={s.k}>
                <div className="text-2xl font-extrabold">{s.v}</div>
                <div className="text-xs text-gray-500 mt-1">{s.k}</div>
              </Card>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="order-1 lg:order-2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <div className="relative">
            <div className="absolute -inset-6 bg-gradient-to-br from-blue-200 to-indigo-200 rounded-3xl blur-2xl opacity-70" />
            <img
              alt="hero"
              className="relative rounded-3xl shadow-2xl"
              src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?q=80&w=1600&auto=format&fit=crop"
            />
          </div>
        </motion.div>
      </div>
    </PageContainer>
  );
};

const AboutPage = () => (
  <PageContainer>
    <SectionTitle
      title="About Us"
      subtitle="We nurture creativity through design thinking, STEM challenges, and real-world problem solving."
    />
    <div className="grid md:grid-cols-3 gap-6">
      <Card>
        <h3 className="text-lg font-bold">Mission</h3>
        <p className="mt-2 text-gray-600">
          To cultivate innovative mindsets and practical skills so students can build meaningful inventions that help our school and community.
        </p>
      </Card>
      <Card>
        <h3 className="text-lg font-bold">Vision</h3>
        <p className="mt-2 text-gray-600">
          A culture where curiosity meets craftsmanship—every student confident to ideate, prototype and present with impact.
        </p>
      </Card>
      <Card>
        <h3 className="text-lg font-bold">What We Do</h3>
        <ul className="mt-2 text-gray-600 list-disc ml-5 space-y-1">
          <li>Weekly build sessions and coding labs</li>
          <li>Mentor support from teachers & alumni</li>
          <li>Exhibitions, hackathons, and competitions</li>
        </ul>
      </Card>
    </div>

    <div className="mt-10 grid md:grid-cols-2 gap-6">
      <Card>
        <h3 className="text-lg font-bold">Teacher Coordinators</h3>
        <div className="mt-4 space-y-3">
          {[
            { name: "Yashoda Sandeepani", role: "Teacher-In-Charge" },
          ].map((p) => (
            <div key={p.name} className="flex items-center justify-between">
              <span className="font-medium">{p.name}</span>
              <Chip>{p.role}</Chip>
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <h3 className="text-lg font-bold">Student Committee</h3>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {[
            { name: "A.G.Chamindu Nimash", role: "President" },
            { name: "J.K.D.Thenuwan Chayanga", role: "V.President" },
            { name: "Isuru Sandeepa", role: "Secretary" },
            { name: "Senuka Hansana", role: "V.Secretary" },
            { name: "J.A.Binura Methsara", role: "Organizer" },
            { name: "W.A.Omesh Pathum", role: "D.Organizer" },
          ].map((p) => (
            <Card key={p.name} className="p-4">
              <div className="font-semibold">{p.name}</div>
              <div className="text-xs text-gray-500 mt-1">{p.role}</div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  </PageContainer>
);

const ProjectsPage = () => {
  const projects = useMemo(
    () => [
      {
        title: "Smart Door Lock",
        desc: "RFID + Keypad system with audit logs and mobile alerts.",
        img: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=1600&auto=format&fit=crop",
        tags: ["Arduino", "Security", "RFID"],
        year: 2025,
      },
      {
        title: "EcoBot Cleaner",
        desc: "Autonomous bot that sweeps corridors and collects waste.",
        img: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=1600&auto=format&fit=crop",
        tags: ["Robotics", "Sensors"],
        year: 2024,
      },
      {
        title: "Air Quality Monitor",
        desc: "IoT dashboard for classrooms to track PM2.5, CO₂, and temp.",
        img: "https://images.unsplash.com/photo-1555597408-2aa39c2b333a?q=80&w=1600&auto=format&fit=crop",
        tags: ["IoT", "Web"],
        year: 2024,
      },
      {
        title: "Braille Reader",
        desc: "Low-cost electro-mechanical display for reading digital text.",
        img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1600&auto=format&fit=crop",
        tags: ["Assistive Tech"],
        year: 2023,
      },
    ],
    []
  );

  const [query, setQuery] = useState("");
  const filtered = projects.filter(
    (p) =>
      p.title.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <PageContainer>
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <SectionTitle
          title="Projects"
          subtitle="Explore our award‑winning inventions and ongoing experiments."
        />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by title or tag…"
          className="border rounded-2xl px-4 py-3 w-full sm:w-80"
        />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((p) => (
          <motion.div
            key={p.title}
            whileHover={{ y: -6 }}
            className="group"
          >
            <Card className="p-0 overflow-hidden">
              <div className="relative">
                <img src={p.img} alt={p.title} className="h-48 w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold">{p.title}</h3>
                  <Chip>{p.year}</Chip>
                </div>
                <p className="mt-2 text-gray-600 text-sm">{p.desc}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </PageContainer>
  );
};

const EventsPage = () => {
  const events = [
    {
      name: "Innovation Day 2025",
      date: "2025-10-12",
      place: "School Auditorium",
      desc: "Annual showcase of student inventions with live demos.",
      type: "Exhibition",
    },
    {
      name: "STEM Hackathon",
      date: "2025-09-20",
      place: "ICT Lab",
      desc: "8‑hour challenge to prototype solutions for campus issues.",
      type: "Competition",
    },
    {
      name: "Robotics Workshop",
      date: "2025-09-05",
      place: "Physics Lab",
      desc: "Hands‑on session: motor drivers, line following, PID.",
      type: "Workshop",
    },
  ];

  const upcoming = events.sort((a, b) => a.date.localeCompare(b.date));

  return (
    <PageContainer>
      <SectionTitle
        title="Events"
        subtitle="Join our workshops, competitions, and exhibitions."
      />

      <div className="relative pl-6">
        <div className="absolute left-2 top-0 bottom-0 w-1 bg-blue-100 rounded-full" />
        <div className="space-y-6">
          {upcoming.map((e, i) => (
            <motion.div
              key={e.name}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card className="relative">
                <div className="absolute -left-4 top-6 h-3 w-3 rounded-full bg-blue-600" />
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-sm text-gray-500">{e.type}</div>
                    <h3 className="text-lg font-bold">{e.name}</h3>
                    <p className="mt-1 text-gray-600">{e.desc}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold">{new Date(e.date).toLocaleDateString()}</div>
                    <div className="text-sm text-gray-500">{e.place}</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </PageContainer>
  );
};

const GalleryPage = () => {
  const images = [
    "https://i.imgur.com/JmjEMLx.jpeg?q=80&w=1600&auto=format&fit=crop",
    "https://i.imgur.com/RwdFGIm.jpeg?q=80&w=1600&auto=format&fit=crop",
    "https://i.imgur.com/mxjW2FI.jpeg?q=80&w=1600&auto=format&fit=crop",
    "https://i.imgur.com/UooIgLM.jpeg?q=80&w=1600&auto=format&fit=crop",
    "https://i.imgur.com/dwcvTH3.jpeg?q=80&w=1600&auto=format&fit=crop",
    "https://i.imgur.com/LtHRIoU.jpeg?q=80&w=1600&auto=format&fit=crop",
    "https://i.imgur.com/vmbsSPE.jpeg?q=80&w=1600&auto=format&fit=crop",
    "https://i.imgur.com/xg7kJG5.jpeg?q=80&w=1600&auto=format&fit=crop",
    "https://i.imgur.com/oTZCEz8.jpeg?q=80&w=1600&auto=format&fit=crop",
    "https://i.imgur.com/gGhcqnW.jpeg?q=80&w=1600&auto=format&fit=crop",
    "https://i.imgur.com/FyhKt2e.mp4?q=80&w=1600&auto=format&fit=crop",
  ];

  return (
    <PageContainer>
      <SectionTitle
        title="Gallery"
        subtitle="Snapshots from builds, tests, and exhibitions."
      />

      {/* SoundCloud Player */}
      <div className="mb-6 w-full">
        <iframe
          width="100%"
          height="166"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//soundcloud.com/game-of-thrones-songs/opening-theme-game-of-thrones&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false"
          className="w-full rounded-lg shadow-lg"
        ></iframe>
      </div>

      {/* Image Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((src, i) => (
          <motion.div key={src} whileHover={{ scale: 1.02 }}>
            <img
              src={src}
              alt={`gallery-${i}`}
              className="w-full h-56 object-cover rounded-2xl shadow-md"
            />
          </motion.div>
        ))}
      </div>
    </PageContainer>
  );
};

const ContactPage = () => {
  const [status, setStatus] = useState(null);
  const onSubmit = (e) => {
    e.preventDefault();
    setStatus("Thank you! Your message has been recived to us.");
  };

  return (
    <PageContainer>
      <SectionTitle
        title="Contact Us"
        subtitle="Have questions or want to join? Send us a message."
      />

      <div className="grid lg:grid-cols-2 gap-8">
        <Card>
          <h3 className="text-lg font-bold">Send a Message</h3>
          <form action="https://formsubmit.co/wmvinventionassociation@gmail.com" method="POST" onSubmit={onSubmit} className="mt-4 space-y-4">
            <input required placeholder="Name" name="Name" className="w-full border rounded-xl px-4 py-3" />
            <input type="email" name="email" required placeholder="email" className="w-full border rounded-xl px-4 py-3" />
            <input type="text" name="title" required placeholder="title" className="w-full border rounded-xl px-4 py-3" />
            <textarea required rows={5} name="message" placeholder="message" className="w-full border rounded-xl px-4 py-3" />
            <button type="submit" className="px-5 py-3 rounded-2xl bg-blue-600 text-white font-semibold shadow hover:shadow-lg transition">
              Submit
            </button>
            {status && <div className="text-green-700 text-sm">{status}</div>}
          </form>
        </Card>
        <div className="space-y-4">
          <Card>
            <h3 className="text-lg font-bold">Contact Us</h3>
            <p className="mt-2 text-gray-600">
              Walagedara National School, Western Province, Sri Lanka
            </p>
            <p className="text-gray-600">Email: info@invention.club</p>
            <p className="text-gray-600">Phone: 072-929-0239</p>
          </Card>
          <Card>
            <h3 className="text-lg font-bold">Office Hours</h3>
            <ul className="mt-2 text-gray-600 list-disc ml-5 space-y-1">
              <li>Mon – Fri: 8.30 AM – 1.30 PM</li>
              <li>Sat: 9.00 AM – 12.00 PM</li>
            </ul>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

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

  // Optional: hash-based navigation for easy preview
  useEffect(() => {
    const applyFromHash = () => {
      const key = window.location.hash.replace("#", "");
      if (["home", "about", "projects", "events", "gallery", "contact"].includes(key)) {
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
