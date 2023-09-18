import styles from './experience.module.css';

export default function Experience() {
    return (
        <section id="experience" className={styles.container}>
            <div className={styles.container}>
            <h1>Companies I've worked with...</h1>
            
            <div className={styles.clientsContainer}>
            <img src="/clients/jlr.svg" alt="JLR" />
            <img src="/clients/gla.svg" alt="GLA" />
            <img src="/clients/peel.svg" alt="Peel" />
            <img src="/clients/serco.svg" alt="Serco" />
            <img src="/clients/tods.svg" alt="TODs" />
            <img src="/clients/woodside.svg" alt="Woodside" />
            </div>
            </div>

        </section>
    )
}