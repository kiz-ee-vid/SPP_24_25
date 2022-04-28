import UserResolver from "./user.resolver";
import TodoResolver from "./todo.resolver";

export const resolvers = [UserResolver, TodoResolver] as const;