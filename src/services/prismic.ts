import * as prismic from '@prismicio/client'

export function getPrismicClient(req?: unknown) {
    const endpoint = process.env.PRISMIC_ENDPOINT

    if (!endpoint) {
        throw new Error('Missing PRISMIC_ENDPOINT environment variable')
    }

    const client = prismic.createClient(
        endpoint,
        {
            accessToken: process.env.PRISMIC_ACCESS_TOKEN
        }
    )

    return client
}
