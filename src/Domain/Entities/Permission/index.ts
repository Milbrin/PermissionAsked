import cuid from 'cuid';
import Schema, {
  string, DateType, boolean, Type,
} from 'computed-types';

const PermissionSchema = Schema({
  id: string,
  permissionUserID: string,
  date: DateType,
  verdict: boolean,
  comments: string.trim().normalize().between(1, 512).optional(),
});

const PermissionDTOSchema = Schema({
  permissionUserID: string,
  verdict: boolean,
  comments: string.trim().normalize().between(1, 512).optional(),
});

type Permission = Type<typeof PermissionSchema>;
type PermissionDTO = Type<typeof PermissionDTOSchema>;

export const makePermission = (permissionDTO : PermissionDTO) : Permission => {
  const id = cuid();
  const date = new Date();
  const permission = PermissionSchema({
    id,
    date,
    ...permissionDTO,
  });

  return Object.freeze(permission);
};
