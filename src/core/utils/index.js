const production = process.env.NODE_ENV === "production";

//change prod-url to the domain later
export const SITE_URL = production
  ? "https://epic-sass-test.vercel.app"
  : "http://localhost:3000";
