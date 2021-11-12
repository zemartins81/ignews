import Head from 'next/head'
import styles from './styles.module.scss'

export default function Posts() {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href="#">
                        <time>12/11/2021</time>
                        <strong>ABXDS</strong>
                        <p>asdasdasdasdasdasdasdasdasdsasdasds</p>
                    </a>
                    <a href="#">
                        <time>12/11/2021</time>
                        <strong>ABXDS</strong>
                        <p>asdasdasdasdasdasdasdasdasdsasdasds</p>
                    </a>
                    <a href="#">
                        <time>12/11/2021</time>
                        <strong>ABXDS</strong>
                        <p>asdasdasdasdasdasdasdasdasdsasdasds</p>
                    </a>
                </div>
            </main>
        </>
    )
}