import { api } from '@/pages/services';
import React, {createContext, useEffect, useState} from 'react';

interface IContextReturnTypes {
  user:
    | {
        id: number;
        name: string;
        email: string;
      }
    | undefined;
  updateUser: () => Promise<void>;
  isLoggedIn: () => boolean;
}

interface IContextStateTypes {
  user:
    | {
        id: number;
        name: string;
        email: string;
      }
    | undefined;
}

interface IContextPropsTypes {
  children: React.ReactNode;
}

export const context = createContext<IContextReturnTypes>(
  {} as IContextReturnTypes
);

const MainContext = ({children}: IContextPropsTypes) => {
  const [state, setState] = useState<IContextStateTypes>({
    user: undefined,
  });

  useEffect(() => {
    updateUser();
  }, [])

  const updateUser = async (): Promise<void> => {
    try {
      const response = await api.get('/getUser');
      setState({user: response.data.user});
    } catch(error) {
      console.log(error);
    }
  }

  const isLoggedIn = (): boolean => {
    return state.user !== undefined;
  };

  return <context.Provider value={{user: state.user, updateUser, isLoggedIn}}>{children}</context.Provider>;
};

// Here we declare a context, and its provider component.
// Now we can use the provider and context inside the components.

export default MainContext;
