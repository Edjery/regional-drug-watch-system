import { Schema, ValidationError } from "yup";
import { popupError } from "../components/Popups";
import { DEFAULT_ERROR_MESSAGE } from "../values/defaultValues";
import { TRecord } from "./getColumns";

const validateData = async <T>(schema: Schema<T>, object: T) => {
    try {
        await schema.validate(object, { abortEarly: false });
    } catch (error) {
        if (error instanceof ValidationError) {
            const errorList: TRecord = {};
            error.inner.forEach((error: ValidationError) => {
                if (error.path) {
                    errorList[error.path] = error.message;
                }
            });
            return errorList;
        } else {
            popupError(DEFAULT_ERROR_MESSAGE);
        }
    }
};

export default validateData