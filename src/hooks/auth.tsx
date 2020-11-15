import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../global/api';

interface UserProps {
  _id: string;
  name: string;
  email: string;
}

interface AuthState {
  user: UserProps;
  token: string;
}
interface SignInCredentials {
  email: string;
  password: string;
}

interface SignUpCredentials {
  name: string;
  email: string;
  password: string;
}

interface AuthContextProps {
  user: UserProps;
  signIn(credentials: SignInCredentials): Promise<void>;
  signUp(credentials: SignUpCredentials): Promise<void>;
  signOut(): void;
}
const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const user = localStorage.getItem('@ChatApp:user');
    const token = localStorage.getItem('@ChatApp:token');

    if (user && token) {
      api.defaults.headers.authorization = `Bearer ${token}`;
      return { user: JSON.parse(user), token };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('user/login', { email, password });

    const { user, token } = response.data;

    localStorage.setItem('@ChatApp:user', JSON.stringify(user));
    localStorage.setItem('@ChatApp:token', token);


    api.defaults.headers.authorization = `Bearer ${token}`;

    setData({ user, token });
  }, []);

  const signUp = useCallback(async ({ name, email, password }) => {
    await api.post('user/register', {
      name,
      email,
      password,
    });
  }, []);


  const signOut = useCallback(() => {
    localStorage.removeItem('@ChatApp:user');
    localStorage.removeItem('@ChatApp:token');

    delete api.defaults.headers.authorization;

    setData({} as AuthState);
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }, []);


  return (
    <AuthContext.Provider
      value={{ user: data.user, signIn, signUp, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
};
