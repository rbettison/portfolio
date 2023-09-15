import styles from '../blog.module.css';

export default function Page({ params }: 
  { params: { blogId: string } }) {
    return (
      <main className={styles.blog}>
        <h1 className={styles.blogTitle}>{params.blogId}</h1>
        <h2>13th August 2023</h2>
        <div className={styles.article}>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reiciendis adipisci ullam aperiam alias porro inventore exercitationem officiis consequatur dolore quos.</p>
          <p>Fugit error, nisi labore ea iusto voluptatibus aut laudantium unde officia, amet dignissimos id, ut odio. Dolorem exercitationem iure rerum.</p>
          <p>Nisi rem, voluptas enim delectus provident itaque modi quia, id odit ipsa dolorem, iste quas ea optio natus necessitatibus consequatur.</p>
          <p>Voluptate magnam incidunt officiis deserunt commodi tempora voluptatum et ducimus facilis nulla eaque, adipisci sed similique accusantium optio consectetur odit.</p>
          <p>Sequi porro odit qui eveniet cum, placeat quos reiciendis repellendus ut deserunt, quam hic numquam excepturi dignissimos nostrum. Rerum, blanditiis.</p>
          <p>Nesciunt nihil animi, quo inventore voluptate, vero quisquam eum fuga sint possimus, cupiditate ea odio? Illum, labore fuga. Autem, quo!</p>
          <p>Cumque exercitationem praesentium saepe repudiandae voluptate, omnis possimus laboriosam ratione ipsa illum eligendi ut a hic fuga ullam, suscipit similique.</p>
          <p>Molestiae, magnam totam maxime, pariatur, debitis eveniet veniam alias labore impedit dolore nam illum tempore aspernatur aliquam corporis quo animi.</p>
          <p>Veniam voluptatum debitis porro autem voluptatibus hic, corporis soluta. Perspiciatis veritatis porro sit alias praesentium ipsa iste libero odit eius!</p>
          <p>A, adipisci? Amet voluptas impedit nisi, reprehenderit minus temporibus, dolores vero, aliquid obcaecati repellendus illum veritatis aperiam assumenda natus ducimus.</p>
          <p>Maxime voluptas perspiciatis inventore porro repudiandae incidunt amet vel exercitationem cumque ipsum voluptatum consequatur quasi, saepe cupiditate architecto ab debitis?</p>
          <p>Possimus neque quia quos molestiae debitis delectus ipsam provident. A pariatur iste ea repudiandae aperiam deserunt eligendi consectetur, vel obcaecati.</p>
        </div>
      </main>
    )
}