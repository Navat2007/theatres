import {createContext} from 'react';
import AuthService from "../services/auth.service";

export const UserContext = createContext(!!AuthService.getCurrentUser());