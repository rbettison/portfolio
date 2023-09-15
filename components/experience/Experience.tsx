import styles from './experience.module.css';

export default function Experience() {
    return (
        <section id="experience" className={styles.container}>
            <div className={styles.container}>
            <h1>Companies I've worked with...</h1>
            
            <div className={styles.clientsContainer}>
            <img src="/clients/jlr.png" alt="JLR" />
            <img src="/clients/gla.png" alt="GLA" />
            <img src="/clients/peel.png" alt="Peel" />
            <img src="/clients/serco.png" alt="Serco" />
            <img src="/clients/tods.png" alt="TODs" />
            <img src="/clients/woodside.png" alt="Woodside" />
            </div>
            </div>

        </section>
    )
}