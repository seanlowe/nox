import Link from 'next/link'

const BackToHome = () => {
    return (
        <Link href='/'>
            <a><i class='fa fa-arrow-left'></i></a>
        </Link>
    )
}

export default BackToHome
