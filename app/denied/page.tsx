import Link from "next/link";

export default function Denied() {
    return(
        <>
        <div className="container flex flex-col sm:p-32 p-12 items-center">
        <p className="text-2xl">Oops...</p>
        <p className="text-md">You don&apos;t have the permissions to view this page.</p>
        <p className="text-xl">Go back <Link href="/" className="hover:text-highlighttext underline">home</Link>.</p>
        </div>
        </>
    )
}