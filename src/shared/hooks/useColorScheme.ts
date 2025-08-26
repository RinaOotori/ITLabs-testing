import {useEffect, useState} from "react";

export function useColorScheme() {
    const [theme, setTheme] = useState<'light' | 'dark'>(
        window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: light)')
        const handler = (event: MediaQueryListEvent) => {
            setTheme(event.matches ? 'light' : 'dark')
        }

        mediaQuery.addEventListener('change', handler)

        return () => mediaQuery.removeEventListener('change', handler)
    }, []);

    return theme
}