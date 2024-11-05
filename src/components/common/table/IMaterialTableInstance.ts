import { MRT_RowData, MRT_TableInstance } from "material-react-table";

export default interface IMaterialTableInstance<T extends MRT_RowData> {
    table: MRT_TableInstance<T>;
}
