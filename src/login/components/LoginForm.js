import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";

export default function LoginForm({ setSubmitted }) {
  const supabaseClient = useSupabaseClient();
  const [error, setError] = useState("");
  const [isLoading, setLoading] = useState(false);

  async function onSubmit(event) {
    setLoading(true);
    event.preventDefault();
    const email = event.target.elements.email.value;

    // Email domain validation
    if (!email.endsWith("@gmail.com") && !email.endsWith("@gmail.com.my")) {
      setError("Email should end with @gmail.com or @gmail.com.my");
      setLoading(false);
      return;
    }

    try {
      // Check if user exists in profile table
      let { data, error: selectError } = await supabaseClient
        .from("user_profile")
        .select("email")
        .eq("email", email);

      // If user does not exist, create new user
      if (!data && !selectError) {
        let { error: insertError } = await supabaseClient
          .from("user_profile")
          .insert([{ email: email }]);

        if (insertError) throw insertError;
      }

      // Handle OTP authentication
      const { error: authError } = await supabaseClient.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: true,
          emailRedirectTo: window.location.origin,
        },
      });

      if (authError) throw authError;
      setSubmitted(email);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
    if (user) {
      await supabaseClient
        .from("user_profile")
        .upsert({ auth_user_id: user.id, email: email });
    }
    setSubmitted(email);
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
