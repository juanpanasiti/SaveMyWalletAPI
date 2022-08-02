import { FilterQuery, ProjectionType, QueryOptions } from 'mongoose';
export interface FilterOptions<T> {
    filter: FilterQuery<T> | undefined;
    projection?: ProjectionType<T> | null | undefined;
    options?: QueryOptions<T> | undefined;
}
