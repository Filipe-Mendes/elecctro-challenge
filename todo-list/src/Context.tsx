/* import { createContext, Dispatch, SetStateAction } from 'react';

export type TodoContextType = {
    todo: boolean;
    setTodo: Dispatch<SetStateAction<boolean>>; 
};


export const TodoContext = createContext<TodoContextType>({ 
    todo: false, 
    setTodo: () => { } 
}) */

import { createContext, Dispatch, SetStateAction } from 'react';
import { Todo } from './model/Todo';

export type TodoContextType = {
    todo: Todo[];
    setTodo: Dispatch<SetStateAction<Todo[]>>; 
};


export const TodoContext = createContext<TodoContextType>({ 
    todo: [], 
    setTodo: () => { } 
})

