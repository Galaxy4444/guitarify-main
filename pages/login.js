import { login } from "@lib/api"
import { useRedirectToHome } from "@lib/session"
import { useRouter } from "next/router"
import { useState } from "react"
import { useEffect } from "react/cjs/react.production.min"
import styles from "./login.module.css"

export default function LoginPage({ session }) {



    const  clickHandler = async (e) => {
        const a = await login()
        

    }
    return (
            <div>

                <button onClick={clickHandler}>
                    Log in spotify
                </button>
            </div>
    )
}
