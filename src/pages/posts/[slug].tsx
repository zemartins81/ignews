import { GetServerSideProps } from "next"
import { getSession } from "next-auth/client"

export default function Post() {
    return (
        <h1>Teste</h1>
    )
}

export const getServerSIdeProps: GetServerSideProps = async ({req}) => {
    const session = await getSession({req})

    // if(!session) {
        
    // }
}