import Link from "next/link";

// to find the solution for the passwordless, for now it will retrieve the email from stripe
export default function LoginPage() {
    return (
        <div className="section bg-pink h-screen">
          <div className="container">
            <div className="section-intro welcome">
                <h1>You&apos;re in!</h1>
                <p>You can now access everything on this website.
                    <br /> Ready to get started?
                </p>
                <Link href='/login' className="large-button">
                    <div className="large-button-text">Send Code</div>
                </Link>
            </div>
          </div>
        </div>
      );
}
