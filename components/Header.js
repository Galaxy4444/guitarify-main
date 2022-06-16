import styles from "./Header.module.css"
import Link from "next/link"


export default function Header({  session }) {
    return (
        <header className={styles.header}>
            <Link href="/search">
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.svg} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            </Link>
            <Link href="/profile">
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.svg} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </Link>

            <Link href="/">
                <h1>
                    GUITARIFY
                </h1>
            </Link>
        
            <svg xmlns="http://www.w3.org/2000/svg"  className={styles.svg} viewBox="0 0 24 24" onClick={session.logout}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>

            <Link href="/login">
                <svg xmlns="http://www.w3.org/2000/svg" className={styles.svg} viewBox="0 0 24 24" >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
            </Link>




        </header>
    )
}