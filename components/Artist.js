import styles from "./Artist.module.css"
import Link from "next/link"

export default function Artist({ artist, albums }) {

    return (
        <div className={styles.main}>
            <h1>
                {artist.name}
            </h1>
            <img src={artist && artist.images && artist.images[0] && artist.images[0].url} />
            <div className={styles.popularity}>
                <p>
                    Followers: {artist.followers.total}
                </p>
                <p>
                    Popularity: {artist.popularity}%
                </p>
            </div>

            <h3>
                Genres
            </h3> {artist.genres.map(genre =>

                <p>
                    {genre} <br />
                </p>
            )}


            <div>
                <h2>
                    Albums
                </h2>

                <div className={styles.albumGrid}>
                    {albums.items.map(album =>
                        <div className={styles.space}>
                            <Link href={`/${album.id}/album`}>
                                <img src={album.images[0].url} />
                            </Link>
                            <h4>{album.name}</h4>
                            <p>{album.release_date}</p>

                        </div>
                    )}
                </div>


            </div>


        </div>
    )
}