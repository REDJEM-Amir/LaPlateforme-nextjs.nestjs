import Board from "@/components/Board";
import KeyBoard from "@/components/KeyBoard";
import css from "@/styles/welcome.module.css";

export default function () {
    return (
        <div className={css.container}>
            <div className={css.contentOne}>
                <div className={css.contentRight}>

                </div>
                <div className={css.contentMid}>
                    <Board />
                </div>
                <div className={css.contentLeft}>

                </div>
            </div>
            <div className={css.contentTwo}>
                <KeyBoard />
            </div>
        </div>
    );
}