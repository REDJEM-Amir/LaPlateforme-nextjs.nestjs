import React from 'react'
import { getSession } from '@auth0/nextjs-auth0';
import { FaGamepad } from "react-icons/fa6";
import css from '@/styles/sidebar.module.css'
import Link from 'next/link';

const Sidebar = async () => {
    const session = await getSession();
    if (!session || !session.user) {
        return (
            <div className={css.container}>
                <div className={css.contentLogo}>
                    <FaGamepad className={css.logo} />
                    <div className={css.textLogo}>Motus Game</div>
                </div>
                <div className={css.contentSection}>
                    <Link href="#Home" className={css.link}>
                        <div className={css.section}>
                            <div className={css.sectionText}>Home</div>
                        </div>
                    </Link>
                    <Link href="#About" className={css.link}>
                        <div className={css.section}>
                            <div className={css.sectionText}>About us</div>
                        </div>
                    </Link>
                    <Link href="#Game" className={css.link}>
                        <div className={css.section}>
                            <div className={css.sectionText}>Game</div>
                        </div>
                    </Link>
                </div>
                <Link href="/api/auth/login" className={css.link}>
                    <div className={css.contentConnect}>
                        <div className={css.connect}>Connect to play</div>
                    </div>
                </Link>
            </div>
        )
    } else {
        return (
            <div className={css.container}>
                <div className={css.contentLogo}>
                    <FaGamepad className={css.logo} />
                    <div className={css.textLogo}></div>
                </div>
                <Link href="/api/auth/logout" className={css.link}>
                    <div className={css.contentConnect}>
                        <div className={css.connect}>Disconnect</div>
                    </div>
                </Link>
            </div>
        )
    }

}

export default Sidebar