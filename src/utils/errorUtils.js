import { textCapitalize } from "./textUtils";

export function getErrorMessages({ data: { errors } }) {
  return Object.entries(errors).map(
    ([key, value]) => `${textCapitalize(key)} ${value}`
  );
}
