import NextAuth, { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

import { fauna } from '../../../services/fauna'
import { query as q } from 'faunadb'

declare module 'next-auth' {
    interface Session {
        activeSubscription?: object | null
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID ?? '',
            clientSecret: process.env.GITHUB_CLIENT_SECRET ?? '',
            authorization: {
                params: {
                    scope: 'read:user',
                },
            },
        }),
    ],
    callbacks: {
        async session({ session, user }) {
            if (!fauna) {
                return { ...session, activeSubscription: null }
            }

            try {
                const userActiveSubscription = await fauna.query(
                    q.Get(
                        q.Intersection([
                            q.Match(
                                q.Index('subscription_by_user_ref'),
                                q.Select(
                                    "ref",
                                    q.Get(
                                        q.Match(
                                            q.Index('user_by_email'),
                                            q.Casefold(user.email!)
                                        )
                                    )
                                )
                            ),
                            q.Match(
                                q.Index('subscription_by_status'),
                                "active"
                            )
                        ])
                    )
                )
                return {
                    ...session,
                    activeSubscription: userActiveSubscription
                }
            } catch {
                return {
                    ...session,
                    activeSubscription: null
                }
            }
        },

        async signIn({ user, account, profile }) {
            if (!fauna) {
                return true
            }

            const { email } = user
            try {
                await fauna.query(
                    q.If(
                        q.Not(
                            q.Exists(
                                q.Match(
                                    q.Index('user_by_email'),
                                    q.Casefold(email!)
                                )
                            )
                        ),
                        q.Create(
                            q.Collection('users'),
                            { data: { email } }
                        ),
                        q.Get(
                            q.Match(
                                q.Index('user_by_email'),
                                q.Casefold(email!)
                            )
                        )
                    )
                )
                return true
            } catch {
                return false
            }
        }
    }
}

export default NextAuth(authOptions)
