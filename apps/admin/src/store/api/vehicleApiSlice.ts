import { apiSlice } from './apiSlice';

export interface Vehicle {
  id: string;
  modelName: string;
  year: number;
  engineSize?: string;
  createdAt: string;
  updatedAt: string;
}

export const vehicleApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getVehicles: builder.query<Vehicle[], void>({
      query: () => '/vehicles',
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: 'Vehicle' as const, id })),
              { type: 'Vehicle', id: 'LIST' },
            ]
          : [{ type: 'Vehicle', id: 'LIST' }],
    }),
    createVehicle: builder.mutation<Vehicle, Partial<Vehicle>>({
      query: (body) => ({
        url: '/vehicles',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Vehicle', id: 'LIST' }],
    }),
    updateVehicle: builder.mutation<Vehicle, { id: string; body: Partial<Vehicle> }>({
      query: ({ id, body }) => ({
        url: `/vehicles/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (_, __, { id }) => [{ type: 'Vehicle', id }],
    }),
    deleteVehicle: builder.mutation<void, string>({
      query: (id) => ({
        url: `/vehicles/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Vehicle', id: 'LIST' }],
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useCreateVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
} = vehicleApiSlice;
