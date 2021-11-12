import Head from 'next/head'
import styles from './styles.module.css'

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a>
                        <time>12/11/2021</time>
                        <strong>ABXDS</strong>
                        <p>asdasdasdasdasdasdasdasdasdsasdasds</p>
                    </a>
                    <a>
                        <time>12/11/2021</time>
                        <strong>ABXDS</strong>
                        <p>asdasdasdasdasdasdasdasdasdsasdasds</p>
                    </a>
                    <a>
                        <time>12/11/2021</time>
                        <strong>ABXDS</strong>
                        <p>asdasdasdasdasdasdasdasdasdsasdasds</p>
                    </a>
                </div>
            </main>
        </>
    )
}