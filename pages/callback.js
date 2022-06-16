import React from "react"
import { useRouter } from "next/router"
import { getAccessToken, getSpotifyUserId } from "@lib/api"
import { useEffect, useState } from "react"
import { useRedirectToHome } from "@lib/session"


export default function IndexPage({session}) {
    const router = useRouter();
    const { code, state } = router.query;


    useEffect(() => {
        if(!code || !state) return;
        const loadPosts = async () => {
            const auth = await getAccessToken(code, state);
            const userInfo = await getSpotifyUserId(auth.access_token);
            auth.user = userInfo;
            session.login(auth)
        }
        loadPosts()
    }, [code, state])


    useRedirectToHome(session)


    return (
        <div>
            <p>
        
            </p>
        </div>












    )
}
