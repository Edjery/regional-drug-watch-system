import { MRT_ColumnDef, MRT_RowData } from "material-react-table";
import { Dispatch, SetStateAction, useMemo } from "react";
import ITableColumn from "../components/common/table/ITableColumn";

export type TRecord = Record<string, string | undefined>;

const generateColumnEditProps = (
    columnName: string,
    validationErrors?: TRecord,
    onValidationSet?: Dispatch<SetStateAction<TRecord>>
) => ({
    required: true,
    error: validationErrors ? !!validationErrors[columnName] : false,
    helperText: validationErrors ? validationErrors[columnName] : "",
    onFocus: () => { onValidationSet && onValidationSet(prev => ({ ...prev, [columnName]: undefined, })); },
});

const getColumns = <T extends MRT_RowData>(
    columnList: ITableColumn[],
    validationErrors?: TRecord,
    onValidationSet?: (value: SetStateAction<TRecord>) => void,
): MRT_ColumnDef<T>[] =>
    useMemo<MRT_ColumnDef<T>[]>(
        () => columnList.map((column) => {
            return {
                accessorKey: column.key,
                header: column.label,
                enableEditing: column.enableEdit,
                size: column.width,
                type: column.key || "text",
                editVariant: column.editType,
                editSelectOptions: column.selectOptions,
                muiEditTextFieldProps: generateColumnEditProps(column.key, validationErrors, onValidationSet)
            } as MRT_ColumnDef<T, any>;
        }), [validationErrors]
    );

export default getColumns
