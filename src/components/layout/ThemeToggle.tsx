import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";

function getSystemPref(): 'light' | 'dark' {
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(theme: 'light' | 'dark') {
  const root = document.documentElement
  if (theme === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
  localStorage.setItem('theme', theme)
}

export default function ThemeToggle() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [theme, setTheme] = useState<'light' | 'dark'>(() => (typeof window === 'undefined' ? 'light' : (localStorage.getItem('theme') as any) || getSystemPref()))

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  return (
    <Button variant="outline" size="sm" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title={theme === 'dark' ? 'Switch to light' : 'Switch to dark'}>
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  )
}

