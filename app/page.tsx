import Experience from '@/components/experience/Experience'
import styles from './page.module.css'
import Hero from '@/components/hero/Hero'
import GetInTouch from '@/components/getintouch/GetInTouch'
import Portfolio from '@/components/portfolio/Portfolio'

export default function Home() {
  return (
    // <main className={styles.main}>
    <div>

      <Hero />
      <Experience />
    
      </div>
    // </main>
  )
}
