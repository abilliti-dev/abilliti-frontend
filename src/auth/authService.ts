import {
  CognitoIdentityProviderClient,
  InitiateAuthCommand,
  SignUpCommand,
  ConfirmSignUpCommand,
  SignUpCommandOutput,
  UsernameExistsException,
  CognitoIdentityProviderServiceException,
} from "@aws-sdk/client-cognito-identity-provider";
import { config } from "./config";

export const cognitoClient = new CognitoIdentityProviderClient({
  region: config.region,
});

export const signIn = async (username: string, password: string) => {
  const params: any = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: config.clientId,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };
  try {
    const command = new InitiateAuthCommand(params);
    const { AuthenticationResult } = await cognitoClient.send(command);
    console.log(AuthenticationResult);
    if (AuthenticationResult) {
      sessionStorage.setItem("idToken", AuthenticationResult.IdToken || "");
      sessionStorage.setItem("accessToken", AuthenticationResult.AccessToken || "");
      sessionStorage.setItem("refreshToken", AuthenticationResult.RefreshToken || "");
      return AuthenticationResult;
    }
  } catch (error) {
    console.error("Error signing in: ", error);
    throw error;
  }
};

interface ISignUpResponse {
  response: SignUpCommandOutput | null;
  error: string | null;
  description: string | null;
  classType: unknown;
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
    description: null,
    classType: null,
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
    signUpResult = { response: response, error: null, description: null, classType: null };
    console.log("Sign up success: ", response);
    return signUpResult;
  } catch (error) {
    if (error instanceof UsernameExistsException) {
      signUpResult = {
        response: null,
        error: "Email already in use",
        description: "Use a different email address or log in to existing account",
        classType: UsernameExistsException,
      };
      console.warn("Error signing up: ", error);
    }
  }

  return signUpResult;
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
    return true;
  } catch (error) {
    throw error;
  }
};
