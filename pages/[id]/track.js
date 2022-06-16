import SongDetails from "@components/SongDetails"
import { getSongFeaturesBySpotifyId, getSongBySpotifyId } from "@lib/api"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "./track.module.css"


export default function trackPage({session}) {

    const router = useRouter()
    const { id } = router.query

    const [track, setTrack] = useState()
    const [songFeatures, setSongFeatures] = useState()


    useEffect(() => {
        if(!id) return;
        const loadSongAndSongDetails = async () => {
            let responseForSong = await getSongBySpotifyId(session.access_token, id)
            setTrack(responseForSong)

            let responseForDetails = await getSongFeaturesBySpotifyId(session.access_token, id)
            setSongFeatures(responseForDetails)
        }
        loadSongAndSongDetails()
    }, [router])


    return (
        <div className={styles.main}>
            {track && setSongFeatures && <SongDetails track={track} analysis={songFeatures}/>}
        </div>
    )
}