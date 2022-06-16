import styles from "./Album.module.css"
import Link from "next/link"
import Track from "./Track"
import TrackNoDetails from "./TrackNoDetails"

export default function Album({ album, songs }) {
    return (
        <div className={styles.main}>
            <h1>
                {album.name}
            </h1>
            <Link href={`/${album && album.images && album.artists[0] && album.artists[0].id}/artist`} passHref>
                
                <h2>
                <a>{album && album.images && album.artists[0] && album.artists[0].name}</a>
                    

                </h2>
            </Link>
            {album && album.images && album.images[0] && <img src={album.images[0].url} />}
            <p>
                Popularity: {album.popularity}% <br />
                Release Date: {album.release_date} <br />
                Tracks : {album.total_tracks}
            </p>
            <h2>
                Tracks
            </h2>

            <div className={styles.songsGrid}>
                {
                    songs.map((song) =>

                        <TrackNoDetails tracks={song} />
                    )

                }
            </div>

        </div>
    )
}