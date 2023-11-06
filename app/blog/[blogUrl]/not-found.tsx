import Link from "next/link";

export default function NotFound() {
    return (
        <div className="container flex flex-col sm:p-32 p-12 items-center">
            <h1 className="text-2xl">Oops...</h1>
            <p className="text-md">We couldn&apos;t find that blog post.</p>
            <p className="text-xl">Go back to <Link href="/blog"><span className="hover:text-highlighttext underline">all blogs</span></Link> to find what you&apos;re looking for.</p>
        </div>
    );
}