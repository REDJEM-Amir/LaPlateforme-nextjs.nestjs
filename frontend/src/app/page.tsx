import Motus from "@/components/Motus";
import "@/styles/page.css";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Page() {
  const session = await getSession();

  if (!session || !session.user) {
    return (
      <div className="container">
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
        <Motus />
      </div>
    );
  }
}