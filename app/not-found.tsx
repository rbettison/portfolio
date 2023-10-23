import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
    return (
        <main className={styles.container}>
            <h1>There was a problem.</h1>
            <p>We could not find the page you were looking for.</p>
            <p>Go back <Link href="/"><span className="hover:text-highlighttext">home</span></Link>.</p>
        </main>
    );
}