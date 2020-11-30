import cuid from 'cuid';
import Schema, { string, DateType, Type } from 'computed-types';

const RequestSchema = Schema({
  id: string,
  date: DateType,
  requestUserId: string,
  title: string.trim().normalize().between(1, 128),
  permissionId: string,
  comments: string.trim().normalize().between(1, 512).optional(),
});

const RequestDTOSchema = Schema({
  requestUserId: string,
  title: string.trim().normalize().between(1, 128),
  permissionId: string,
  comments: string.trim().normalize().between(1, 512).optional(),
});

type Request = Type<typeof RequestSchema>;
type RequestDTO = Type<typeof RequestDTOSchema>;

export const makeRequest = (requestDTO : RequestDTO) : Request => {
  const id = cuid();
  const date = new Date();
  const request = RequestSchema({
    id,
    date,
    ...requestDTO,
  });

  return Object.freeze(request);
};
