"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps } from "next-themes/dist/types"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"  // Apply theme via `class` (e.g., `class="dark"`)
      defaultTheme="system"  // Default to system preference
      enableSystem  // Enable system theme detection
      disableTransitionOnChange  // Disable transitions for smoother theme changes
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}
