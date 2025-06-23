import { CognitoJwtVerifier } from "aws-jwt-verify";

// Async authentication check
export async function checkAuth() {
  const verifier = CognitoJwtVerifier.create({
    userPoolId: import.meta.env.VITE_USER_POOL_ID,
    tokenUse: "access",
    clientId: String(import.meta.env.VITE_CLIENT_ID),
  });

  const token = sessionStorage.getItem("accessToken");
  if (!token) return false;

  try {
    await verifier.verify(token);
    return true;
  } catch (err) {
    console.error("Login required!");
    return false;
  }
}
