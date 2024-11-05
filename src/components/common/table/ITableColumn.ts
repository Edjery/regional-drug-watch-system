import { InputHTMLAttributes } from "react";

export default interface ITableColumn {
  /**
    * The name of the column in the database.
    */
  key: string;
  /**
   * The label displayed in the table header.
   */
  label: string;
  /**
   * The field type of the column.
   * @default "text" if not specified.
   */
  fieldType?: InputHTMLAttributes<unknown>['type'];
  /**
   * The requirement type of input for the column.
   * @default "false" if not specified.
   */
  required?: boolean
  /**
   * The type of input for the column.
   * @default "text" if not specified.
   */
  editType?: "text" | "select";
  /**
   * Indicates the column's edit option.
   * @default false
   */
  enableEdit?: boolean;
  /**
   * Options for a select input type. Only applicable if `type` is "select".
   */
  selectOptions?: string[];
  /**
   * Length of the header in the table.
   */
  width?: number
  /**
   * Determine whether the column is hidden or not
   */
  isHidden?: boolean
}
