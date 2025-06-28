// import { useNavigate } from "react-router-dom";
import Dashboard from "@/screens/dashboard";
import { parseJwt } from "@/lib/utils";

const HomePage = () => {
  // const navigate = useNavigate();
  const idToken = parseJwt(sessionStorage.idToken);
  const accessToken = parseJwt(sessionStorage.accessToken);
  console.log(parseJwt(sessionStorage.idToken.toString()));
  console.log("Amazon Cognito ID token encoded: " + sessionStorage.idToken.toString());
  console.log("Amazon Cognito ID token decoded: ");
  console.log(idToken);
  console.log("Amazon Cognito access token encoded: " + sessionStorage.accessToken.toString());
  console.log("Amazon Cognito access token decoded: ");
  console.log(accessToken);
  console.log("Amazon Cognito refresh token: ");
  console.log(sessionStorage.refreshToken);
  console.log("Amazon Cognito example application. Not for use in production applications.");
  // const handleLogout = () => {
  //   sessionStorage.clear();
  //   navigate("/login");
  // };

  return <Dashboard />;
};

export default HomePage;
