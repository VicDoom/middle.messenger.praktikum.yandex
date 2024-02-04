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

type LastMessage = {
  user: UserDTO,
  time: string,
  content: string
}

export type ChatDTO = {
  id: number,
  title: string,
  avatar: string | null,
  unread_count: number,
  last_message: LastMessage | null
}

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

export type TMessageDTO = {
  id: number;
  time: string;
  type: "message" | "file";
  user_id: number;
  content: string;
  file?: TFileDTO;
}

export type TFileDTO = {
  id: number;
  user_id: number;
  path: string;
  filename: string;
  content_type: string;
  content_size: number;
  upload_date: string;
}

export type TSearchUser = {
  login: string;
}
