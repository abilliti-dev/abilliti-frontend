import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  InitiateAuthCommandInput,
  SignUpCommand,
  ConfirmSignUpCommand,
  AuthenticationResultType,
  SignUpCommandOutput,
  UsernameExistsException,
  NotAuthorizedException,
  UserNotFoundException,
} from "@aws-sdk/client-cognito-identity-provider";
import { config } from "./config";

export const cognitoClient = new CognitoIdentityProviderClient({
  region: config.region,
});

interface ISignInResponse {
  auth: AuthenticationResultType | undefined;
  error: string | null;
}

export const signIn = async (username: string, password: string): Promise<ISignInResponse> => {
  const signInParams: InitiateAuthCommandInput = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: config.clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };
  let AuthenticationResult: AuthenticationResultType | undefined = undefined;

  try {
    const command = new InitiateAuthCommand(signInParams);
    const response = await cognitoClient.send(command);
    console.log(response);
    AuthenticationResult = response.AuthenticationResult;
    if (AuthenticationResult) {
      sessionStorage.setItem("idToken", AuthenticationResult.IdToken || "");
      sessionStorage.setItem("accessToken", AuthenticationResult.AccessToken || "");
      sessionStorage.setItem("refreshToken", AuthenticationResult.RefreshToken || "");
    }
  } catch (error: unknown) {
    console.log("Error signing in: ", error);
    if (error instanceof NotAuthorizedException || error instanceof UserNotFoundException) {
      return { auth: undefined, error: error.message };
    }
    return { auth: undefined, error: "An unknown error occurred" };
  }

  return { auth: AuthenticationResult, error: null };
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
