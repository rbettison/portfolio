import GetInTouch from "@/components/getintouch/GetInTouch";
import styles from "./contact.module.css";
import Link from "next/link";

const Contact = (props: any) => {

    return (
            <>
            <div className="h-screen w-full grid grid-cols-5 grid-rows-5">
            <p className="row-start-2 col-start-2 col-span-3 text-4xl">I&apos;m friendly and approachable and always on the lookout for collabs and projects.</p>
            <p className="row-start-3 col-start-2 text-3xl underline">bettison.rob1@gmail.com</p>
            <Link href="/contact/#getintouch" className="row-start-4 col-start-2 col-span-3 text-4xl flex flex-col items-center text-center gap-8 hover:stroke-highlighttext hover:text-highlighttext">
            <h1>Get in touch.</h1>
              
                      <svg xmlns="http://www.w3.org/2000/svg" 
                          fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                          stroke="currentColor" className="w-6 h-6 ">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                      </svg>
              
            </Link>
            {/* <img alt="Me"/> */}
            </div>
              <GetInTouch />
            </>
    )
  }

  export default Contact;