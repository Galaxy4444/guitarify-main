import Link from "next/link"
import { useEffect, useState } from "react"
import styles from "./index.module.css"
import { getAllTechniques, getAllLearnedSongsByUserId } from "@lib/api"



export default function IndexPage({ session }) {
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
    return (
        <div className={styles.index}>
            <div>
                <h2 className={styles.title}>Overview</h2>

            </div>
            <div className={styles.barBorder}>
                <div style={{ "width": `${allLearnedSongs.length / allTechniques.reduce((s, e) => s + e.songs_id.length, 0) * 100}%` }} className={styles.bar} />
                <p>{`${Math.round(allLearnedSongs.length / allTechniques.reduce((s, e) => s + e.songs_id.length, 0) * 100)}%`}</p>
            </div>

            <div className={styles.pictureLayout}>
                <a href="/techniques">
                    <div>
                        <img src="https://dummyimage.com/1920x3840/757575/fff" />
                        <p>Techniques</p>
                    </div>

                </a>

                <a href="/search">
                    <div>
                        <img src="https://dummyimage.com/1920x3840/757575/fff" />
                        <p>Songs</p>
                    </div>
                </a>
            </div>

            <h2>
                Level: {`${Math.round(allLearnedSongs.length / allTechniques.reduce((s, e) => s + e.songs_id.length, 0) * 100)}`}
            </h2>


            <div className={styles.logoutLink}>
                <a href="/" onClick={session.logout}>
                    <div className={styles.logOut}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>

                    </div>

                </a>

            </div>










        </div>



    )
}