import { Dispatch, createContext } from "react";

type Mode = 'system' | 'light' | 'dark'

// define context
export const ModeContext = createContext<[Mode, Dispatch<Mode>]>([
    'system',
    () => {},
]);

// define custom hook
export const useMode = () => {
    return useContext(ModeContext);
}

type Props = {
    children: React.ReactNode
}


export function ModeProvider({ children }: Props) {
    const [mode, setMode] = useState<Mode>(() => 'mode' in localStorage ? localStorage.mode : 'system');
    const [dark, setDark] = useState(false)
    const darkMedia = window.matchMedia('(prefers-color-scheme: dark)')

    useLayoutEffect(() => {
        const systemModeSubscribe = ({ matches }: MediaQueryListEvent) => {
            setDark(matches)
        }

        if (mode === 'system') {
            localStorage.removeItem('mode')
            setDark(darkMedia.matches)
            darkMedia.addEventListener('change', systemModeSubscribe)
        } else {
            localStorage.mode = mode
            setDark(mode === 'dark')
            darkMedia.removeEventListener('change', systemModeSubscribe)
        }
    }, [mode, darkMedia])

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark)
    }, [dark])

    const value: [Mode, Dispatch<Mode>] = useMemo(() => [mode, setMode], [mode])

    return (
        <ModeContext.Provider value={value}>
            {children}
        </ModeContext.Provider>
    )
}
