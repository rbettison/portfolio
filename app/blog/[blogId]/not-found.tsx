import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
    return (
        <main className={styles.container}>
            <h1>There was a problem.</h1>
            <p>We couldn't find that blog post.</p>
            <p>Go back to <Link href="/blog"><span>all blogs</span></Link>.</p>
        </main>
    );
}