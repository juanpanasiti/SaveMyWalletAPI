import { FilterOptions } from '../interfaces/generic.interfaces';
import { UserModel } from '../interfaces/user.interface';

// For mongoose
export type UserFilterOptions = FilterOptions<UserModel>;
