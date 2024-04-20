import LandingPage from "@/components/LandingPage";
import Motus from "@/components/Motus";
import Profile from "@/components/Profile";
import Ranking from "@/components/Ranking";
import css from "@/styles/page.module.css";

import { getSession } from "@auth0/nextjs-auth0";

export default async function Page() {
  const session = await getSession();

  if (!session || !session.user) {
    return (
      <LandingPage />
    );
  } else {
    return (
      <div className={css.containerGame}>
        <div className={css.contentOne}>
          <Ranking />
        </div>
        <div className={css.contentTwo}>
          <Motus />
        </div>
        <div className={css.contentThree}>
          <Profile />
        </div>
      </div>
    );
  }
}