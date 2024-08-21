import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  InitiateAuthCommandInput,
  SignUpCommand,
  ConfirmSignUpCommand,
  AuthenticationResultType,
  SignUpCommandOutput,
  UsernameExistsException,
} from "@aws-sdk/client-cognito-identity-provider";
import { config } from "./config";
import { error } from "console";

export const cognitoClient = new CognitoIdentityProviderClient({
  region: config.region,
});

type ISignInResponse = {
  auth: AuthenticationResultType | undefined;
  error: string | undefined;
};

export const signIn = async (username: string, password: string): Promise<ISignInResponse> => {
  const params: InitiateAuthCommandInput = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: config.clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };
  try {
    const command = new InitiateAuthCommand(params);
    const response = await cognitoClient.send(command);
    console.log(response);
    const AuthenticationResult = response.AuthenticationResult;
    if (AuthenticationResult) {
      sessionStorage.setItem("idToken", AuthenticationResult.IdToken || "");
      sessionStorage.setItem("accessToken", AuthenticationResult.AccessToken || "");
      sessionStorage.setItem("refreshToken", AuthenticationResult.RefreshToken || "");
    }
  } catch (error: unknown) {
    console.error("Error signing in: ", error);
    return { auth: undefined, error: error?.message };
  }

  return { auth: AuthenticationResult, error: undefined };
};

interface ISignUpResponse {
  response: SignUpCommandOutput | null;
  error: string | null;
}

export const signUp = async (
  email: string,
  password: string,
  firstName: string,
  lastName: string
) => {
  let signUpResult: ISignUpResponse = {
    response: null,
    error: null,
  };
  const params = {
    ClientId: config.clientId,
    Username: email,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
      {
        Name: "given_name",
        Value: firstName,
      },
      {
        Name: "family_name",
        Value: lastName,
      },
    ],
  };
  try {
    const command = new SignUpCommand(params);
    const response = await cognitoClient.send(command);
    signUpResult = { response: response, error: null };
    console.log("Sign up success: ", response);
    return signUpResult;
  } catch (error) {
    if (error instanceof UsernameExistsException) {
      signUpResult = { response: null, error: "Username already exists" };
      console.error("Error signing up: ", error);
    }
  }
};

export const confirmSignUp = async (username: string, code: string) => {
  const params = {
    ClientId: config.clientId,
    Username: username,
    ConfirmationCode: code,
  };
  try {
    const command = new ConfirmSignUpCommand(params);
    await cognitoClient.send(command);
    console.log("User confirmed successfully");
    return true;
  } catch (error) {
    console.error("Error confirming sign up: ", error);
    throw error;
  }
};
