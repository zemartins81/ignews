import { GetStaticProps } from "next";
import * as prismic from '@prismicio/client';
import Head from 'next/head';
import Link from 'next/link';
import { asText } from '@prismicio/richtext';
import { getPrismicClient } from "../../services/prismic";
import styles from './styles.module.scss';


type Post = {
    slug: string,
    title: string,
    excerpt: string,
    updatedAt: string
}

interface PostsProps {
    posts: Post[]
}

export default function Posts({ posts }: PostsProps) {
    return (
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    {posts.map(post => (
                        <Link key={post.slug} href={`/posts/${post.slug}`}>
                            <time>{post.updatedAt}</time>
                            <strong>{post.title}</strong>
                            <p>{post.excerpt}</p>
                        </Link>
                    ))
                    }
                </div>
            </main>
        </>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    let posts: Post[] = []

    if (process.env.PRISMIC_ENDPOINT) {
        const prismicClient = getPrismicClient()

        const response = await prismicClient.getByType('publication', {
            fetch: ['publication.title', 'publication.content'],
            pageSize: 100,
        })

        posts = response.results.map(post => {
            const data = post.data as any
            return {
                slug: post.uid ?? '',
                title: asText(data.title),
                excerpt: data.content?.find((content: any) => content.type === 'paragraph')?.text ?? '',
                updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-br', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric'
                })
            }

        })
    }

    return {
        props: {
            posts
        },
        revalidate: 60 * 60 * 24,
    }
}
