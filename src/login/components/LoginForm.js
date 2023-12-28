import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";

export default function LoginForm({ setSubmitted }) {
  const supabaseClient = useSupabaseClient();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  // Function to validate email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  async function onSubmit(event) {
    setLoading(true);
    event.preventDefault();
    const email = event.target.elements.email.value;

    // Email format validation
    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      // Handle OTP authentication
      const { user, error: authError } =
        await supabaseClient.auth.signInWithOtp({
          email,
          options: {
            shouldCreateUser: true,
            emailRedirectTo: window.location.origin,
          },
        });

      if (authError) throw authError;

      // If the user is successfully authenticated, insert or update their profile
      if (user) {
        await supabaseClient
          .from("profile")
          .upsert({ auth_user_id: user.id, email: email });
      }

      setSubmitted(email);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="content-grid home-hero">
      {error && (
        <div className="danger" role="alert">
          {error}
        </div>
      )}
      <h1>Hi there!</h1>
      <p>Enter your e-mail to receive the code to login or sign up</p>
      <div className="email-input">
        <label htmlFor="email"></label>
        <input id="email" type="email" autoComplete="email" />
        {/* <input id="otp" type=""/> */}
      </div>
      <button disabled={isLoading} type="submit" className="large-button">
        <div className="large-button-text">
          {isLoading ? "Logging in..." : "Log In"}
        </div>
      </button>
    </form>
  );
}
