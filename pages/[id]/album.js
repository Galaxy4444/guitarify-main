import Album from "@components/Album"
import { getAlbumBySpotifyId } from "@lib/api"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "./album.module.css"

export default function AlbumPage({ session }) {

    const router = useRouter()
    const { id } = router.query
    const [album, setAlbum] = useState([])
    const [songs, SetSongs] = useState([])


    useEffect(() => {
        if(!id) return;
        const loadAlbum = async () => {
            let album = await getAlbumBySpotifyId(session.access_token, id)
            setAlbum(album)
            SetSongs(album.tracks.items)
            console.log(album)
            
        }
        loadAlbum()
        
    }, [router])

    return (

            <div className={styles.main}>
                {album && setAlbum &&<Album album={album} songs={songs}/>}
            </div>
    )
}