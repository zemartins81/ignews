import styles from './styles.module.scss'
import {func} from "prop-types";
import {useSession, signIn} from "next-auth/client";

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({priceId}: SubscribeButtonProps) {
    const [session] = useSession()
    function handleSubscribe() {
        if(!session) {
            signIn('github').then(r => {

            })
            return
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