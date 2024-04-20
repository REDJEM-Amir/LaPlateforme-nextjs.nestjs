import LandingPage from "@/components/LandingPage";
import Motus from "@/components/Motus";
import Ranking from "@/components/Ranking";
import "@/styles/page.css";
import { getSession } from "@auth0/nextjs-auth0";

export default async function Page() {
  const session = await getSession();

  if (!session || !session.user) {
    return (
      <LandingPage />
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