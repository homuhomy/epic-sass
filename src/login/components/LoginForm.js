export default function LoginForm() {
  return (
    <form className="content-grid home-hero">
      <h1>Hi there!</h1>
      <div className="email-input">
        <label htmlFor="email"></label>
        <input id="email" type="email" autoComplete="email"/>
        {/* <input id="otp" type=""/> */}
      </div>
      <button type="submit" className="large-button">
        <div className="large-button-text">Login</div>
      </button>
    </form>
  );
}
