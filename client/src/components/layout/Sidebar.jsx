import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { LogOut, Menu, X } from "lucide-react";
import { LOGO } from "../../assets_logo";


const navItems = [
  {
    section: "Principal",
    links: [
      { to: "/", label: "Tableau de bord", icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/>
          <rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>
        </svg>
      )},
      { to: "/etudiants", label: "Etudiants", icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>
        </svg>
      )},
      { to: "/enseignants", label: "Enseignants", icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/>
          <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
        </svg>
      )},
      { to: "/classes", label: "Classes", icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/>
        </svg>
      )},
    ]
  },
  {
    section: "Academique",
    links: [
      { to: "/notes", label: "Notes", icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
        </svg>
      )},
      { to: "/emploi-du-temps", label: "Emploi du temps", icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      )},
      { to: "/paiements", label: "Paiements", badge: "4", badgeWarn: true, icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
        </svg>
      )},
    ]
  }
];

export default function Sidebar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
    {/* Bouton hamburger (mobile uniquement) */}
    <button
      onClick={() => setOpen(true)}
      className="lg:hidden fixed top-3.5 left-4 z-[60] w-10 h-10 rounded-xl bg-blue-900 text-white flex items-center justify-center shadow-lg"
      aria-label="Ouvrir le menu"
    >
      <Menu size={20} />
    </button>

    {/* Overlay sombre quand le menu est ouvert (mobile) */}
    {open && (
      <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={() => setOpen(false)} />
    )}

    <aside className={`fixed top-0 left-0 bottom-0 w-[248px] flex flex-col z-50 shadow-xl transition-transform duration-300 ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      style={{ background: "linear-gradient(180deg, #0f2b5b 0%, #153872 100%)" }}>

      {/* Bouton fermer (mobile) */}
      <button
        onClick={() => setOpen(false)}
        className="lg:hidden absolute top-3 right-3 w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center"
        aria-label="Fermer le menu"
      >
        <X size={16} />
      </button>

      {/* LOGO */}
      <div className="flex flex-col items-center pt-5 pb-4 px-4 border-b border-white/10"
        style={{ background: "rgba(0,0,0,0.2)" }}>
        <div className="bg-white rounded-xl px-3 py-2 shadow-md">
          <img
            src={LOGO}
            alt="DigiSchool"
            className="h-10 w-auto object-contain"
          />
        </div>
      </div>

      {/* NAV */}
      <nav className="flex-1 overflow-y-auto py-2">
        {navItems.map((section) => (
          <div key={section.section} className="px-3 mt-5">
            <p className="text-white/35 text-[10px] uppercase tracking-[2px] px-2.5 mb-1.5">{section.section}</p>
            {section.links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === "/"}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-2.5 py-2.5 rounded-xl mb-0.5 text-[13.5px] font-medium transition-all duration-200 relative
                  ${isActive
                    ? "bg-white/15 text-white shadow-inner ring-1 ring-white/10"
                    : "text-white/60 hover:bg-white/8 hover:text-white"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {isActive && (
                      <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-[55%] bg-blue-300 rounded-r-full"/>
                    )}
                    <span className="opacity-85">{link.icon}</span>
                    <span className="flex-1">{link.label}</span>
                    {link.badge && (
                      <span className={`text-white text-[10px] font-bold px-2 py-0.5 rounded-full
                        ${link.badgeWarn ? "bg-amber-500" : "bg-blue-400"}`}>
                        {link.badge}
                      </span>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>

      {/* USER + DECONNEXION */}
      <div className="px-3 py-2 border-t border-white/10">
        <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg">
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
            style={{ background: "linear-gradient(135deg, #3b82f6, #60a5fa)" }}>
            {user.nom ? user.nom.substring(0, 2).toUpperCase() : "LN"}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-[12px] font-semibold truncate">{user.nom || "Lamine Ndong"}</p>
            <p className="text-white/45 text-[10px] capitalize">{user.role || "Admin"}</p>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-1 text-red-300 hover:text-red-200 transition-all text-[11px] font-medium flex-shrink-0">
            <LogOut size={13} />
          </button>
        </div>
      </div>
    </aside>
    </>
  );
}