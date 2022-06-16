
import styles from "./profile.module.css"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getAllTechniques, getAllLearnedSongsByUserId } from "@lib/api"
import { useRedirectToLogin } from "@lib/session"


export default function ProfilePage({ session }) {
    const [userId, setUserId] = useState(null)
    const [allLearnedSongs, setAllLearnedSongs] = useState([])
    const [allTechniques, setAllTechnqiues] = useState([])

    useEffect(() => {
        if (!session.access_token) return
        const loadAllTechnqiues = async () => {
            const response = await getAllTechniques()
            setAllTechnqiues(response)
        }
        loadAllTechnqiues()
    }, [])

    useEffect(() => {
        if (!session.access_token) return
        const loadUser = async () => {
            setUserId(session.user.id)
        }
        loadUser()


    }, [])

    useEffect(() => {
        if (!userId) return;
        const loadAllLearnedSongs = async () => {
            const response = await getAllLearnedSongsByUserId(userId)
            setAllLearnedSongs(response)
        }
        loadAllLearnedSongs()
    }, [userId])
    useRedirectToLogin(session)

    return (session.user.email ?
        <div className={styles.main}>
            <h1>Profile</h1>
            <div className={styles.profileData}>
                <h3>{session.user.display_name} </h3>
                <p>
                    {session.user.email} <br /> country: {session.user.country}
                </p>
                <p>
                    Type: {session.user.product} {session.user.type} <br />
                    Followers: {session.user.followers.total}
                </p>
            </div>
            <h2>Progress</h2>
            <div className={styles.barBorder}>
                    <div style={{ "width": `${allLearnedSongs.length / allTechniques.reduce((s, e) => s + e.songs_id.length, 0) * 100}%` }} className={styles.bar} />
                    <p>{`${Math.round(allLearnedSongs.length / allTechniques.reduce((s, e) => s + e.songs_id.length, 0) * 100)}%`}</p>
            </div>
        </div > : "Login"
    )
}