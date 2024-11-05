import ITableColumn from "../components/common/table/ITableColumn";

const getHiddenColumns = <T>(columns: ITableColumn[]) => {
    return columns.reduce((acc, column) => {
        if (column.isHidden) { acc[column.key as keyof T] = false }
        return acc;
    }, {} as Record<keyof T, boolean>);
}

export default getHiddenColumns