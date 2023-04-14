import { validate } from "class-validator";

export default async function isValidSchema<T extends object>(body: T) {
  return await validate(body).then((errors) => {
    if (errors.length) {
      let errorTexts = Array();
      for (const errorItem of errors) {
        errorTexts = errorTexts.concat(errorItem.constraints);
      }
      return errorTexts;
    }
    return true;
  });
}
