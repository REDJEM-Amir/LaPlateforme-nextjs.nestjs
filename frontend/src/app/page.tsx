import Motus from "@/components/Motus";
import Ranking from "@/components/Ranking";
import "@/styles/page.css";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Page() {
  const session = await getSession();

  if (!session || !session.user) {
    return (
      <div className="containerInit">
        <div className="contentLogin">
          <a href="/api/auth/login">
            <div className="login">Connecte toi pour jouer</div>
          </a>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="contentOne">
          <Ranking />
        </div>
        <div className="contentTwo">
          <Motus />
        </div>
        <div className="contentThree">

        </div>
      </div>
    );
  }
}