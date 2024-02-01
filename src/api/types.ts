export type APIError = {
  reason: string;
};

export type UserDTO = {
  id: number;
  login: string;
  first_name: string;
  second_name: string;
  display_name: string;
  avatar: string;
  phone: string;
  email: string;
};

export type TCreateUser = Omit<UserDTO, "avatar" | "display_name" | "id">  & {
  password: string;
}

export type TSignUpResponse = {
  id: number;
}

export type TLoginRequestData = {
  login: string,
  password: string,
}

export type TEditProfileData = {
  first_name?: string,
  second_name?: string,
  display_name?: string,
  login?: string,
  email?: string,
  phone?: string,
}

export type TEditPasswordData = {
  oldPassword: string,
  newPassword: string,
}
