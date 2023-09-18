import styles from './experience.module.css';
import Image from 'next/image';

export default function Experience() {
    return (
        <section id="experience" className={styles.container}>
            <div className={styles.container}>
            <h1>Companies I&apos;ve worked with...</h1>
            
            <div className={styles.clientsContainer}>
            <Image src="/clients/jlr.svg" alt="JLR" />
            <Image src="/clients/gla.svg" alt="GLA" />
            <Image src="/clients/peel.svg" alt="Peel" />
            <Image src="/clients/serco.svg" alt="Serco" />
            <Image src="/clients/tods.svg" alt="TODs" />
            <Image src="/clients/woodside.svg" alt="Woodside" />
            </div>
            </div>

        </section>
    )
}