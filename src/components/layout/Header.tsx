import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { useI18n } from "../../i18n/I18nContext";
import ThemeToggle from "./ThemeToggle";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SocialIcon } from "react-social-icons";

export default function Header() {
  const { lang, t } = useI18n()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const prefix = `/${lang}`
  // TODO: Replace placeholder url values with actual social links.
  const socialLinks = [
    { name: 'LinkedIn', network: 'linkedin', url: 'https://www.linkedin.com/company/dsau' },
    { name: 'Facebook', network: 'facebook', url: 'https://www.facebook.com/DSAUdk' },
    { name: 'Instagram', network: 'instagram', url: 'https://www.instagram.com/dsau.cs' },
  ]

  const switchLang = (to: 'da' | 'en') => {
    const parts = pathname.split('/')
    if (parts.length > 1) {
      parts[1] = to
      navigate(parts.join('/'))
    } else {
      navigate(`/${to}`)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to={prefix} className="flex items-center gap-3">
          <img src={"/DSAU_logo.png"} alt="DSAU" className="h-8 w-auto" />
          <span className="font-semibold hidden sm:block">DSAU</span>
        </Link>
        <button className="md:hidden p-2" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
        <nav className="hidden md:flex items-center gap-2 flex-wrap sm:flex-nowrap">
          <Nav to={`${prefix}`} label={t('nav.events')} end />
          <Nav to={`${prefix}/underforeninger`} label={t('nav.underforeninger')} />
          <Nav to={`${prefix}/bestyrelsen`} label={t('nav.board')} />
          <Nav to={`${prefix}/om`} label={t('nav.about')} />
          <Nav to={`${prefix}/kontakt`} label={t('nav.contact')} />
          <div className="ml-2 flex items-center gap-1.5">
            {socialLinks.map(({ name, network, url }) => (
              <SocialIcon
                key={name}
                url={url}
                network={network}
                target="_blank"
                rel="noreferrer"
                aria-label={`Open ${name}`}
                style={{ height: 36, width: 36 }}
                className="transition-transform hover:scale-105"
              />
            ))}
          </div>
          <div className="ml-2 flex items-center gap-1">
            <button aria-label="Dansk" title="Dansk" onClick={() => switchLang('da')} className={`h-8 w-8 rounded-md border flex items-center justify-center ${lang === 'da' ? 'bg-neutral-100' : ''}`}>
              <span role="img" aria-label="Danish flag">🇩🇰</span>
            </button>
            <button aria-label="English" title="English" onClick={() => switchLang('en')} className={`h-8 w-8 rounded-md border flex items-center justify-center ${lang === 'en' ? 'bg-neutral-100' : ''}`}>
              <span role="img" aria-label="British flag">🇬🇧</span>
            </button>
            <ThemeToggle />
          </div>
        </nav>
      </div>
      {open && (
        <div className="md:hidden border-t bg-background/95 backdrop-blur">
          <div className="container mx-auto px-4 py-4 grid gap-2">
            <Nav to={`${prefix}`} label={t('nav.events')} end />
            <Nav to={`${prefix}/underforeninger`} label={t('nav.underforeninger')} />
            <Nav to={`${prefix}/bestyrelsen`} label={t('nav.board')} />
            <Nav to={`${prefix}/om`} label={t('nav.about')} />
            <Nav to={`${prefix}/kontakt`} label={t('nav.contact')} />
            <div className="flex items-center gap-2 pt-2">
              {socialLinks.map(({ name, network, url }) => (
                <SocialIcon
                  key={name}
                  url={url}
                  network={network}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open ${name}`}
                  style={{ height: 36, width: 36 }}
                  className="transition-transform hover:scale-105"
                />
              ))}
              <ThemeToggle />
              <button aria-label="Dansk" title="Dansk" onClick={() => { switchLang('da'); setOpen(false) }} className={`h-8 w-8 rounded-md border flex items-center justify-center ${lang === 'da' ? 'bg-neutral-100' : ''}`}>
                <span role="img" aria-label="Danish flag">🇩🇰</span>
              </button>
              <button aria-label="English" title="English" onClick={() => { switchLang('en'); setOpen(false) }} className={`h-8 w-8 rounded-md border flex items-center justify-center ${lang === 'en' ? 'bg-neutral-100' : ''}`}>
                <span role="img" aria-label="British flag">🇬🇧</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function Nav({ to, label, end }: { to: string; label: string; end?: boolean }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        "px-3 py-2 text-sm font-medium rounded-md transition-colors " +
        (isActive ? "bg-primary text-primary-foreground" : "text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800")
      }
      end={end}
    >
      {label}
    </NavLink>
  );
}
