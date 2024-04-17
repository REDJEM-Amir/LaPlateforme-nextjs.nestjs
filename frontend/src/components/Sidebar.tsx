import React from 'react'
import '@/styles/sidebar.css'
import { getSession } from '@auth0/nextjs-auth0';

const Sidebar = async () => {
    const session = await getSession();
    if (!session || !session.user) {
        return (
            <div className='nav'>
                <div className="contentLogo">
                    <img className='logo' src="/logo_laplateforme.png" alt="La Plateforme" />
                </div>
                <div className='title'>Motus</div>
            </div>
        )
    } else {
        return (
            <div className='nav'>
                <div className='contentL'>
                    <div className="contentLogo">
                        <img className='logo' src="/logo_laplateforme.png" alt="La Plateforme" />
                    </div>
                    <div className='title'>Motus</div>
                </div>
                <div className='contentR'>
                    <a href="/api/auth/logout">
                        <div className='logout'>se déconnecter</div>
                    </a>
                </div>
            </div>
        )
    }

}

export default Sidebar