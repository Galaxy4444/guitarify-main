import Link from "next/link"
import { useEffect, useState } from "react"
import { searchSong } from "@lib/api"
import { useRouter } from "next/router"
import styles from "./search.module.css"
import Track from "@components/Track"




export default function SearchPage({ session }) {

    const [tracks, setTracks] = useState([])

    const handleChange = async (e) => {
        const value = e.target.value

        let response = await searchSong(session.access_token, value)
        setTracks(response.tracks.items)
        console.log(tracks)

    }


    return (
        <div className={styles.main}>
            <h1>Search</h1>
            <form>
                <input type="text" placeholder="Enter what you want to search" onChange={handleChange} />
            </form>

            <div className={styles.songLayout}>
                {


                    tracks.map((track) => (
                        <div>
                                

                                <Track tracks={track}/>

                        </div>


                    )
                    )
                }
            </div>

        </div >



    )
}