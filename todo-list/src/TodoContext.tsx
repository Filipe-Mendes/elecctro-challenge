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

