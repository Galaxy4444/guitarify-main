import styles from "./SongDetails.module.css"
import Link from "next/link"
import Track from "@components/Track"

export default function SongDetails({ track, analysis }) {

    const calcTime = function (time) {
        let seconds = time % 60
        let minutes = (time - seconds) / 60;
        if (seconds < 10) {
            return minutes + ":" + "0" + Math.round(seconds)
        }
        return minutes + ":" + Math.round(seconds)
    }
    console.log(track)

    const pitchClass = ["C", "C#/Db", "D", "D#/Eb", "E", "F", "F#/Gb", "G", "G#/Ab", "A", "A#/Bb", "B"]
    return (
        <div className={styles.main}>
            <div className={styles.main}>
                <img src={track.album.images[0].url} />

                <h2>
                    {track.name}
                </h2>
                <h3>
                    <Link href={`/${track.artists[0].id}/artist`} passHref>
                        {track.artists[0].name}
                    </Link>

                </h3>
                <div className={styles.layoutForDesktop}>
                    <div>
                        <h2>Details</h2>
                        <p>Popularity: {track.popularity}%</p>

                        <p>
                            Duration: {analysis && calcTime(analysis.track.duration)}
                        </p>
                        <p>
                            BPM: {analysis && Math.round(analysis.track.tempo)}
                        </p>
                        <p>
                            Key: {analysis && pitchClass[analysis.track.key]}  {analysis && analysis.track.mode == 1 ? "Major" : "Minor"}
                        </p>
                        <p>
                            Signature: {analysis && analysis.track.time_signature}/4
                        </p>
                    </div>
                    <div className={styles.main}>
                        <h2>Album</h2>

                        <p>
                            Name: {track.album.name}
                        </p>
                        <p>
                            Tracks: {track.album.total_tracks}
                        </p>
                        <p>
                            Release Date: {track.album.release_date}
                        </p>

                        <Link href={`/${track.album.id}/album`}>
                            More
                        </Link>
                    </div >
                </div>


            </div>



        </div>
    )
}