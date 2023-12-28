import Image from "next/image";
import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import Link from "next/link";
import hero from "../../public/assets/hero.png";

export default function HomePage() {
  const session = useSession();
  // console.log({ user, session });
  const supabaseClient = useSupabaseClient();

  return (
    <div className="grid-halves h-screen-navbar">
      <div className="bg-teal border-right">
        <div className="column-padding">
          <div className="tablet-centered">
            <div className="content-grid home-hero"></div>
            <h1>
              Agile Awareness <br />
              Survey 2024
            </h1>
            <p className="section-subtitle">Tinjauan Kesedaran Agile 2024</p>
            <Link href="/login" className="pill bg-white">
              <div className="large-button-text">Login</div>
            </Link>
          </div>
        </div>
      </div>
      <div className="bg-salmon">
        <div className="column-padding centered">
          <div className="callout-wrap">
            <Image
              src={hero}
              alt=""
              placeholder="blur"
              className="callout-image"
            ></Image>
          </div>
        </div>
      </div>
    </div>
  );
}
