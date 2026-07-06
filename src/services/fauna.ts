import { Client } from 'faunadb'

const secret = process.env.FAUNADB_KEY

export const fauna = secret
    ? new Client({
        secret,
        scheme: "https",
        domain: "db.us.fauna.com",
        port: 443,
    })
    : null
