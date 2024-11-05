import { MRT_RowData, MRT_TableInstance } from "material-react-table";
import { Dispatch, SetStateAction } from "react";
import { Schema } from "yup";
import { TRecord } from "./getColumns";
import validateData from "./validateItems";

const validateAndSaveData = async <T extends MRT_RowData>(
    schema: Schema<T>,
    values: T,
    table: MRT_TableInstance<T>,
    saveFunction: (values: T) => Promise<void> | Promise<null> | Promise<T[]>,
    onValidationErrors: Dispatch<SetStateAction<TRecord>>
) => {
    const newValidationErrors = await validateData<T>(schema, values);
    if (newValidationErrors && Object.values(newValidationErrors).some((error) => error)) {
        onValidationErrors(newValidationErrors);
        return;
    }
    onValidationErrors({});
    await saveFunction(values);
    table.setCreatingRow(null);
    table.setEditingRow(null);
};
export default validateAndSaveData