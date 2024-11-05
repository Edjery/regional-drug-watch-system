import { MRT_TableOptions, useMaterialReactTable } from "material-react-table";
import { useState } from "react";
import { Schema } from "yup";
import GenericService, { Identifiable } from "../../../service/genericService";
import ITableColumn from "./ITableColumn";
import getHiddenColumns from "../../../helper/getHiddenColumns";
import getColumns from "../../../helper/getColumns";
import theme from "../../../values/theme";
import validateAndSaveData from "../../../helper/validateAndSaveData";
import CreateItemDialog from "./dialogs/CreateItemDialog";
import EditItemDialog from "./dialogs/EditItemDialog";
import TopToolbar from "./toolbars/TopToolbar";
import RowActions from "./actions/RowActions";

const outerColor = theme.palette.primary.main;
const innerHeadColor = theme.palette.secondary.dark;
const innerBodyColor = theme.palette.secondary.main;
const innerTableColor = theme.palette.primary.light;

export type TRecord = Record<string, string | undefined>;

const genericReactTable = <T extends Identifiable>(
  columns: ITableColumn[],
  schema: Schema<T>,
  apiService: GenericService<T>,
  additionalTableOptions?: MRT_TableOptions<T>,
  dummyData: T[] = []
) => {
  const [validationErrors, setValidationErrors] = useState<TRecord>({});
  const { mutateAsync: createData, isLoading: isCreating } = apiService.createItem();
  const {
    data: fetchedData = [],
    isError: isLoadingDataError,
    isFetching: isFetchingData,
    isLoading: isLoadingData,
  } = apiService.getAllItems(dummyData);
  const { mutateAsync: updateData, isLoading: isUpdating } = apiService.updateItem();
  const { mutateAsync: deleteData, isLoading: isDeleting } = apiService.deleteItem();

  const hiddenColumnsObject = getHiddenColumns(columns);

  const table = useMaterialReactTable({
    // Main
    columns: getColumns<T>(columns, validationErrors, setValidationErrors),

    // Service related
    getRowId: (row: T) => row.id?.toString() ?? "0",
    data: fetchedData,
    state: {
      isLoading: isLoadingData,
      isSaving: isCreating || isUpdating || isDeleting,
      showAlertBanner: isLoadingDataError,
      showProgressBars: isFetchingData,
    },
    muiToolbarAlertBannerProps: isLoadingDataError
      ? {
          color: "error",
          children: "Error loading data",
        }
      : undefined,

    // CRUD methods
    onCreatingRowCancel: () => setValidationErrors({}),
    onCreatingRowSave: async ({ values, table }) =>
      await validateAndSaveData<T>(schema, { ...values, id: 0 } as T, table, createData, setValidationErrors),
    renderCreateRowDialogContent: CreateItemDialog,

    onEditingRowCancel: () => setValidationErrors({}),
    onEditingRowSave: async ({ values, table }) =>
      await validateAndSaveData<T>(schema, { ...values } as T, table, updateData, setValidationErrors),
    renderEditRowDialogContent: EditItemDialog,

    renderTopToolbarCustomActions: ({ table }) => <TopToolbar table={table} />,
    renderRowActions: ({ row, table }) => <RowActions row={row} table={table} onDelete={deleteData} />,

    // Utility
    enableEditing: true,
    initialState: { columnVisibility: hiddenColumnsObject },
    createDisplayMode: "row",
    editDisplayMode: "row",

    // Design
    muiTopToolbarProps: {
      sx: { bgcolor: outerColor, height: "5vh" },
    },
    muiTableHeadRowProps: {
      sx: { bgcolor: innerHeadColor, height: "5vh" },
    },
    muiTableContainerProps: {
      sx: { minHeight: "60vh" },
    },
    muiTableBodyRowProps: {
      sx: { bgcolor: innerBodyColor },
    },
    muiBottomToolbarProps: {
      sx: { bgcolor: outerColor, minHeight: "10vh" },
    },
    muiTablePaperProps: {
      sx: { bgcolor: innerTableColor, minHeight: "75vh" },
    },

    ...additionalTableOptions,
  });

  return table;
};

export default genericReactTable;
