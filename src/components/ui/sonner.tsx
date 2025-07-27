import { Toaster as Sonner, toast } from "sonner"
import { useEffect, useState } from "react"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const [theme, setTheme] = useState<"light" | "dark" | "system">("system")

  useEffect(() => {
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setTheme(savedTheme as "light" | "dark")
    } else {
      setTheme("system")
    }

    // Listen for theme changes
    const handleStorageChange = () => {
      const newTheme = localStorage.getItem('theme')
      if (newTheme) {
        setTheme(newTheme as "light" | "dark")
      } else {
        setTheme("system")
      }
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Determine actual theme for sonner
  const getActualTheme = (): "light" | "dark" => {
    if (theme === "system") {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light"
    }
    return theme
  }

  return (
    <Sonner
      theme={getActualTheme()}
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export { Toaster, toast }
