import Link from "next/link"
import { useEffect, useState } from "react"
import { useRouter } from "next/router"
import styles from "./techniques.module.css"
import { getAllTechniques } from "@lib/api"


export default function TechniquesPage() {

    const [techniques, setTehchniques] = useState([])

    useEffect(() => {
        const loadTechniques = async () => {
            try {
                const techniques = await getAllTechniques()
                setTehchniques(techniques)
            } catch (e) {
                alert("Could not load techniques!")
            }
        }
        loadTechniques()
    }, [])

    return (
        <div className={styles.main}>
            <h2>Techniques</h2>
            <div className={styles.techniquesLayout}>
                {
                    techniques.map((technique) => (
                        <div>
                                <div>
                                    <img src={technique.imgURL} />
                                    <p>{technique.name}</p>
                                    <p>{technique.difficulty}</p>
                                    <Link href={`${technique.id}/technique/`} passHref >
                                    <a>Read more</a>
                                    </Link>
                                </div>

                        </div>
                    )
                    )
                }
            </div>

        </div >



    )
}