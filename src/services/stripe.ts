import Stripe from 'stripe'
import packageInfo from '../../package.json';

const apiKey = process.env.STRIPE_API_KEY

export const stripe = apiKey
    ? new Stripe(apiKey, {
        apiVersion: '2025-02-24.acacia',
        appInfo: {
            name: 'Ignews',
            version: packageInfo.version
        }
    })
    : null
