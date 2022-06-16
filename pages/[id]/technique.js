import Track from "@components/Track"
import { getTechniqueById, getSongBySpotifyId, getAllLearnedSongByUserIdAndTechniqueId } from "@lib/api"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "./technique.module.css"

export default function TechniquePage({ session }) {
    const router = useRouter()
    const { id } = router.query
    const [technique, setTehchnique] = useState([])
    const [songs, setSongs] = useState([])
    const [userId, setUserId] = useState(null)
    const [allLearnedSongs, setAllLearnedSongs] = useState([])


    useEffect(() => {
        if (!session.access_token) return
        const loadUser = async () => {
            setUserId(session.user.id)
        }
        loadUser()

     
    }, [])


    useEffect(()=>{
        if(!userId) return;
        const loadAllLearnedSongs = async () => {
            const response = await getAllLearnedSongByUserIdAndTechniqueId(userId, id)
            setAllLearnedSongs(response)
        }
        loadAllLearnedSongs()
    }, [userId])


    useEffect(() => {
        if (!id) return
        const loadTechnique = async () => {
            try {
                const technique = await getTechniqueById(id)
                setTehchnique(technique)

                let newSongs = []
                for (var i = 0; i < technique.songs_id.length; i++) {
                    const song = await getSongBySpotifyId(session.access_token, technique.songs_id[i])
                    newSongs.push(song)
                }
                setSongs(newSongs)
            } catch (e) {
                if (e.status === 404) router.push("/404")
            }
        }
        loadTechnique()

    }, [id, router])

    return !technique ? null : (
        <article>
            <div className={styles.main}>
                {
                    <div className={styles.tech}>
                        <h1>{technique.name}</h1>
                        <p>{technique.info}</p>
                    </div>
                }

                <div className={styles.barBorder}>
                    <div style={{"width" : `${allLearnedSongs.length / songs.length * 100}%`}} className={styles.bar}/>
                    <p>{ `${Math.round(allLearnedSongs.length / songs.length * 100)}%`}</p>
                </div>
                <div  className={styles.songsLayout}>
                {
                    songs.map((song) => 
                
                        <Track key={song.id} tracks={song} userId={userId} techniqueId={id} />
                   )
                }
                </div>

            </div>
        </article>

    )
}