import { Outlet } from 'react-router-dom'
import { Header } from '../../modules/Header'
import { Footer } from '../../modules/Footer'
const Layout = () => {
    return (
        <>
            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout