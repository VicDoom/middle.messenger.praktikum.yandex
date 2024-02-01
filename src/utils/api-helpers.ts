import { APIError, UserDTO } from "../api/types";
import { User } from "../types";

export function apiHasError (response: any): response is APIError {
  return response?.reason;
}

export const transformUser = (data: UserDTO): User => {
  return {
    id: data.id,
    login: data.login,
    firstName: data.first_name,
    secondName: data.second_name,
    displayName: data.display_name,
    avatar: data.avatar,
    phone: data.phone,
    email: data.email,
  };
}; 
