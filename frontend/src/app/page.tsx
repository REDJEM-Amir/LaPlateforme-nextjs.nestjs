import css from "@/styles/page.module.css";

export default function Page() {
  return (
    <div className={css.container}>
      <div className={css.contentPicture}>
        <img className={css.picture} src="/Bannière.png" alt="La Plateforme_" />
      </div>
      <div className={css.contentStart}>
        <a className={css.link} href="/api/auth/login">
          <div className={css.text}>Discover</div>
        </a>
      </div>
    </div>
  );
}
