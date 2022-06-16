import styles from "./Track.module.css"
import Link from "next/link"
import { createLearnedSong, deleteLearnedSong, getLearnedSongBySpotifyIdAndUserId } from "@lib/api"
import { useEffect, useState } from "react"
export default function Track({ tracks, userId, techniqueId }) {

    const [isLearned, setIsLearned] = useState(false)
    const [learnedSong, setLearnedSong] = useState({})

    
    useEffect(() => {
        if(!tracks.id || !userId) return;
        const load = async () => {
            const result = await getLearnedSongBySpotifyIdAndUserId(tracks.id, userId);
            if(result.length !== 0){
                setIsLearned(true)
                setLearnedSong(result[0])
            }
        }

        load();
    }, [tracks, userId])

    const setTrueOrFalse = async () => {
        if (isLearned) {
            await deleteLearnedSong(learnedSong.id)
        } else {
            const model = {
                song_id: tracks.id,
                user_id: userId,
                techniqueId : techniqueId
            }
            const response = await createLearnedSong(model)
            setLearnedSong(response)
            console.log(tracks)
        }
        setIsLearned(!isLearned)
    }

    return (
        <div className={styles.main}>
            <Link href={`/${tracks.id}/track`} passHref>
                <img src={tracks.album.images[0].url} />
            </Link>

            <p>
                {tracks.name}
                <br />
                {tracks.artists[0].name}
            </p>
            <p>Popularity: {tracks.popularity}%</p>
            <label>Learned: </label>
            <input type="checkbox" checked={isLearned} onChange={setTrueOrFalse} />

        </div>
    )
}