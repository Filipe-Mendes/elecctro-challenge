import { createContext, Dispatch, SetStateAction } from 'react';

export type AuthContextType = {
    token: string;
    setToken: Dispatch<SetStateAction<string>>;
};

export const AuthContext = createContext<AuthContextType>({
    token: '',
    setToken: () => {}
})

