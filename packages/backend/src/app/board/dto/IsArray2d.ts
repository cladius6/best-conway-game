import {registerDecorator, ValidationArguments, ValidationOptions} from "class-validator";

export function IsArray2d(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsArray2d',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (Array.isArray(value)) {
            for (let i = 0; i < value.length; i++) {
              if (!Array.isArray(value[i])) {
                return false;
              }
              for (let j = 0; j < value[i].length; j++) {
                if (typeof value[i][j] !== 'number') {
                  return false;
                }
              }
            }
            return true;
          }
        },
      },
    });
  }
}
