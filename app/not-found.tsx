import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
    return (
        <div className="container flex flex-col sm:p-32 p-12 items-center">
            <h1 className="text-2xl">There was a problem.</h1>
            <p className="text-md">We could not find the page you were looking for.</p>
            <p className="text-xl">Go back <Link href="/"><span className="hover:text-highlighttext underline">home</span></Link>.</p>
        </div>
    );
}