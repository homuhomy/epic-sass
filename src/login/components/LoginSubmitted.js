import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useState } from "react";
import { useRouter } from "next/router";

export default function LoginSubmitted({ submitted }) {
  const supabaseClient = useSupabaseClient();
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function onVerify() {
    try {
      const { data, error: verifyError } = await supabaseClient.auth.verifyOtp({
        email: submitted,
        token: otp,
        type: "email",
      });

      if (verifyError) throw verifyError;
      if (data.session) {
        router.push("/success"); // Navigate to success page on successful verification
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="content-grid home-hero">
      <h1>Check your email</h1>
      <p>Enter the OTP code sent to {submitted}</p>
      <input
        type="text"
        placeholder="Enter OTP code"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={onVerify} className="large-button">
        <div className="large-button-text">Verify</div>
      </button>
      {error && <div className="danger">{error}</div>}
    </div>
  );
}
