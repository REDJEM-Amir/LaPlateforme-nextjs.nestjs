import React from 'react'
import css from '@/styles/landingPage.module.css'

const LandingPage = () => {
    return (
        <div className={css.container}>
            <div id='Home' className={css.section}>
                <div className={css.contentText}>
                    <div className={css.text}>Découvrez Motus Web,<br /> la plateforme interactive pour <br /> les passionnés de mots.</div>
                    <div className={css.subText}>Explorez Motus Web, la destination ultime pour tous les amateurs de jeux de mots en quête de défis et de divertissement.</div>
                </div>
                <div className={css.contentImg}>
                    <img className={css.img} src="imgSection1.png" alt="Home" />
                </div>
            </div>
            <div id='About' className={css.section2}>
                <div className={css.contentImg}>
                    <img className={css.img} src="imgSection2.jpg" alt="About" />
                </div>
                <div className={css.contentText2}>
                    <div className={css.text2}>En savoir plus, Motus Game</div>
                    <div className={css.subText2}>Motus Web invite à des parties endiablées de mots croisés en ligne. <br /> Profitez d'un environnement stimulant pour améliorer vos compétences <br /> linguistiques, seul ou en compétition. Rejoignez notre communauté et <br /> testez votre agilité verbale dans des défis quotidiens.</div>
                </div>
            </div>
            <div id='Game' className={css.section3}>
                <div className={css.text3}>Les régles du Motus</div>
                <div className={css.contentCol}>
                    <div className={css.col}>
                        <div className={css.contentColImg}>
                            <img className={css.colImg} src="imgSection3p1.jpg" alt="" />
                        </div>
                        <div className={css.contentColText}>
                            <div className={css.colTitle}>1ère étape : Le choix du mot mystère</div>
                            <div className={css.colText}>Au début de chaque partie de Motus, l'ordinateur sélectionne un mot mystère que les joueurs doivent deviner. <br /> <br /> Ce mot a une longueur prédéfinie, souvent de six à neuf lettres. Les joueurs entament le jeu en proposant un mot qui respecte cette longueur.<br /> <br /> Ce premier essai est souvent une chance pour tâter le terrain et commencer à réfléchir aux possibilités.</div>
                        </div>
                    </div>
                    <div className={css.col}>
                        <div className={css.contentColImg}>
                            <img className={css.colImg} src="imgSection3p2.jpg" alt="" />
                        </div>
                        <div className={css.contentColText}>
                            <div className={css.colTitle}>2ème étape : Analyser les indices</div>
                            <div className={css.colText}>Après chaque proposition, l'ordinateur offre des indices sur la justesse des lettres choisies. <br /> <br /> Les lettres correctement placées dans le mot sont indiquées en rouge, tandis que celles qui sont correctes mais mal placées sont marquées en jaune. <br /> <br /> Les lettres qui ne figurent pas dans le mot mystère ne reçoivent aucun indicateur de couleur. Ces indices sont cruciaux pour affiner les propositions suivantes.</div>
                        </div>
                    </div>
                    <div className={css.col}>
                        <div className={css.contentColImg}>
                            <img className={css.colImg} src="imgSection3p3.jpg" alt="" />
                        </div>
                        <div className={css.contentColText}>
                            <div className={css.colTitle}>3ème étape : La résolution du mot</div>
                            <div className={css.colText}>En se basant sur les indices fournis par les tentatives précédentes, les joueurs continuent à proposer de nouveaux mots, ajustant leur choix en fonction des lettres confirmées rouges et jaunes. <br /> <br /> Le jeu continue ainsi jusqu'à ce que le joueur découvre le mot mystère ou épuise le nombre de tentatives autorisées. <br /> <br /> Si le joueur ne réussit pas à deviner le mot dans le nombre de tentatives alloué, l'ordinateur révèle le mot mystère à la fin de la partie.</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage