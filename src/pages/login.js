import Link from "next/link";
import Logo from "src/core/components/Logo";
import LoginForm from "src/login/components/LoginForm";
import login from "../../public/assets/login.png";
import Image from "next/image";

// to find the solution for the passwordless, for now it will retrieve the email from stripe
export default function LoginPage() {
  return (
    <div className="grid-halves h-screen">
      <div className="border-right bg-offwhite">
        <div className="column-padding">
          <div className="tablet-centered">
            <Link href="/" className="logo-container">
              <Logo style={{ width: 150 }} />
            </Link>
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-teal border-right">
        <Image src={login} alt="login" className="callout-image" />
      </div>
    </div>
  );
}
