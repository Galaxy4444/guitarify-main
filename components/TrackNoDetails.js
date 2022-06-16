import styles from "./TrackNoDetails.module.css"
import Link from "next/link"

export default function TrackNoDetails({ tracks }) {
    return (
        <div className={styles.main}>

            <h4>
                {tracks.name}
            </h4>
            <Link href={`/${tracks.id}/track`} passHref>
                See More
            </Link>
        </div>
    )
}