import jwtDecode from "jwt-decode"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const STORAGE_KEY = "session"

const defaultModel = {
    access_token: null,
    expires_in: 0,
    user: {}
}

export default function useSession() {
    const [session, setSession] = useState(defaultModel)
    const [ready, setReady] = useState(false)

    useEffect(() => {
        const savedSession = localStorage.getItem(STORAGE_KEY)
        if (savedSession) {
            try {
                const value = JSON.parse(savedSession)
                setSession(value.expires_in < new Date().getTime() ? defaultModel : value)
                
            } catch (e) {
                console.log(e)
            }
        }
        setReady(true)
    }, [])

    useEffect(() => {
        if (session.access_token) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(session))
        } else {
            localStorage.removeItem(STORAGE_KEY)
        }
    }, [session])

    return {
        ...session,
        ready,
        login(value) {
            setSession({...value, expires_in: new Date().getTime() + value.expires_in * 1000})        
        },
        logout() {
            setSession(defaultModel)
        }
    }
}

export function useRedirectToLogin(session) {
    const router = useRouter()

    useEffect(() => {
        if (session.ready && !session.user.email) router.push("/login")
    }, [session, router])
}

export function useRedirectToHome(session) {
    const router = useRouter()

    useEffect(() => {
        if (session.ready && session.user.email) router.push("/")
    }, [session, router])
}
