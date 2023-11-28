import GetInTouch from "@/components/getintouch/GetInTouch";
import Link from "next/link";

const Contact = (props: any) => {

    return (
            <section>
            <div className="h-screen w-full grid md:grid-cols-5 md:grid-rows-5 grid-cols-3 grid-rows-2">
            <p className="md:row-start-2 md:col-start-2 md:col-span-3 text-4xl row-start-1 col-span-3 place-self-end">I&apos;m friendly and approachable and always on the lookout for collabs and projects.</p>
            <p className="md:row-start-3 md:col-start-2 text-3xl underline row-start-2 col-start-1">bettison.rob1@gmail.com</p>
            <Link href="/contact/#getintouch" className="md:row-start-4 md:col-start-2 md:col-span-3 row-start-2 col-start-2 text-4xl flex flex-col items-center text-center place-self-center gap-8 hover:stroke-highlighttext hover:text-highlighttext">
            <h1 className="font-bold">Get in touch.</h1>
              
                      <svg xmlns="http://www.w3.org/2000/svg" 
                          fill="none" viewBox="0 0 24 24" strokeWidth={1.5} 
                          stroke="currentColor" className="w-6 h-6 ">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                      </svg>
              
            </Link>
            {/* <img alt="Me"/> */}
            </div>
              <GetInTouch />
            </section>
    )
  }

  export default Contact;