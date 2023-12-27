// export default function LoginSubmitted({submitted}) {
//   return(
//     <div className="content-grid home-hero">
//       <h1>Link sent!</h1>
//       <p>Check your email ({submitted}) to finish logging in</p>
//     </div>
//   )

// }

// LoginSubmitted.js
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
      // Verify the OTP token
      const { user, error: verifyError } = await supabaseClient.auth.verifyOtp({
        token_hash: otp,
        type: "email",
      });

      if (verifyError) throw verifyError;
      if (user) {
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
