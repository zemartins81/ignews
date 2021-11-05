import styles from './styles.module.scss'
import {func} from "prop-types";
import {useSession, signIn} from "next-auth/client";
import {api} from "../../services/api";

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({priceId}: SubscribeButtonProps) {
    const [session] = useSession()
    async function handleSubscribe() {
        if(!session) {
            signIn('github').then(r => {
                try {
                    const response = await api.post('/subscribe')
                    const {sessionId} = response.data
                }
            }).catch(() => {return})
        }
    }
    return (
        <button
        type="button"
        className={styles.subscribeButton}
        onClick={handleSubscribe}
        >
            Subscribe now
        </button>
    )
}