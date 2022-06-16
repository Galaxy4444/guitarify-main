import Artist from "@components/Artist"
import { getArtistBySpotifyId, getArtistAlbumsBySpotifyId } from "@lib/api"
import Link from "next/link"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import styles from "./artist.module.css"

export default function TechniquePage({ session }) {
    const router = useRouter()
    const { id } = router.query


    const [artist, setArtists] = useState()
    const [albums, setAlbums] = useState()



    useEffect(() => {
        if (!id) return;
        const loadArtists = async () => {
            let response = await getArtistBySpotifyId(session.access_token, id)
            setArtists(response)
            console.log(response)
        }
        const loadAlbums = async () => {
            let response = await getArtistAlbumsBySpotifyId(session.access_token, id)
            setAlbums(response)
            console.log(response)
        }
        loadArtists()
        loadAlbums()
    }, [router])


    return (

        <div className={styles.main}>

            {artist && setArtists && albums && setAlbums && <Artist artist={artist} albums={albums}/>}
        </div>

    )
}