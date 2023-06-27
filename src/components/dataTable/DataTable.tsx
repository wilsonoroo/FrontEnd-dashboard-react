import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TriangleDownIcon,
  TriangleUpIcon,
} from "@chakra-ui/icons";
import {
  Flex,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tooltip,
  Tr,
  chakra,
} from "@chakra-ui/react";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
  sortees?: SortingState;
  hiddenEmptyRow?: boolean;
};

export function DataTable<Data extends object>({
  data,
  columns,
  sortees,
  hiddenEmptyRow = false,
}: DataTableProps<Data>) {
  const [sorting, setSorting] = React.useState<SortingState>(sortees);

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },

    debugTable: false,
  });

  const createEmptyRow = () => {
    return (
      <Tr height={"60px"}>
        {table.getHeaderGroups().map((headerGroup: any) =>
          headerGroup.headers.map((column: any) => (
            // eslint-disable-next-line react/jsx-key
            <Td>{flexRender("", column.getContext())} </Td>
          ))
        )}
      </Tr>
    );
  };

  const getRowsEmpty = () => {
    const pageSize = table.getState().pagination.pageSize;
    const page = table.getRowModel().rows;
    const emptyRows = [];

    if (page.length % pageSize !== 0)
      for (let i = 0; i < pageSize - (page.length % pageSize); i++) {
        const rowItem = createEmptyRow();

        emptyRows.push(rowItem);
      }

    if (data.length === 0 || pageSize === 0)
      for (let i = 0; i < pageSize; i++) emptyRows.push(createEmptyRow());

    return emptyRows;
  };

  return (
    <>
      <div style={{ overflowX: "auto" }}>
        <Table
          variant="striped"
          style={{ borderCollapse: "separate", borderSpacing: "0 0em" }}
        >
          <Thead>
            {table.getHeaderGroups().map((headerGroup, index) => (
              <Tr key={"header_" + headerGroup.id + "_" + index} px={0} py={0}>
                {headerGroup.headers.map((header, index) => {
                  // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                  const meta: any = header.column.columnDef.meta;
                  if (meta?.isSortable) {
                    header.column.getToggleSortingHandler();
                  }

                  return (
                    // eslint-disable-next-line react/jsx-key
                    //<th {...column.getHeaderProps(column?.isSortable ? column.getSortByToggleProps() : {})}>
                    <Th
                      key={header.index + "_" + header.id + "_" + index}
                      onClick={header.column.getToggleSortingHandler()}
                      isNumeric={meta?.isNumeric}
                      width={header.column.columnDef.size + "px"}
                      minWidth={header.column.columnDef.minSize + "px"}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Text fontSize="sm">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </Text>
                        <chakra.span pl="4">
                          {header.column.getIsSorted() ? (
                            header.column.getIsSorted() === "desc" ? (
                              <TriangleDownIcon
                                aria-label="sorted descending"
                                color={"black"}
                              />
                            ) : (
                              <TriangleUpIcon aria-label="sorted ascending" />
                            )
                          ) : null}
                        </chakra.span>
                      </div>
                    </Th>
                  );
                })}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.map((row, index) => (
              <Tr key={"row" + row.index + "_" + row.id + "_" + index}>
                {row.getVisibleCells().map((cell, index) => {
                  // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                  const meta: any = cell.column.columnDef.meta;

                  return (
                    <Td
                      key={index + "_" + cell.id}
                      isNumeric={meta?.isNumeric}
                      width={cell.column.columnDef.size + "px"}
                      minWidth={cell.column.columnDef.minSize + "px"}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </Td>
                  );
                })}
              </Tr>
            ))}
            {!hiddenEmptyRow ? getRowsEmpty() : <></>}
          </Tbody>
        </Table>
      </div>
      {/* fotert de la tabla */}
      <Flex justifyContent="space-between" m={4} alignItems="center">
        <Flex>
          <Tooltip label="First Page">
            <IconButton
              onClick={() => table.setPageIndex(0)}
              isDisabled={!table.getCanPreviousPage()}
              icon={<ArrowLeftIcon h={3} w={3} />}
              mr={4}
              aria-label={""}
            />
          </Tooltip>
          <Tooltip label="Atras">
            <IconButton
              onClick={() => table.previousPage()}
              isDisabled={!table.getCanPreviousPage()}
              icon={<ChevronLeftIcon h={6} w={6} />}
              aria-label={""}
            />
          </Tooltip>
        </Flex>

        <Flex alignItems="center">
          <Text flexShrink="0" mr={8}>
            Pagina{" "}
            <Text fontWeight="bold" as="span">
              {table.getState().pagination.pageIndex + 1}
            </Text>{" "}
            de{" "}
            <Text fontWeight="bold" as="span">
              {table.getPageOptions().length}
            </Text>
          </Text>
          <Text flexShrink="0">Ir a la pagina:</Text>{" "}
          <NumberInput
            ml={2}
            mr={8}
            w={28}
            min={1}
            onChange={(value: any) => {
              const page = value ? value - 1 : 0;

              table.setPageIndex(page);
            }}
            defaultValue={table.getState().pagination.pageIndex + 1}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
          <Select
            w={32}
            value={table.getPageCount()}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </Select>
        </Flex>

        <Flex>
          <Tooltip label="Next Page">
            <IconButton
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              isDisabled={!table.getCanNextPage()}
              icon={<ChevronRightIcon h={6} w={6} />}
              aria-label={""}
            />
          </Tooltip>
          <Tooltip label="Last Page">
            <IconButton
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              isDisabled={!table.getCanNextPage()}
              icon={<ArrowRightIcon h={3} w={3} />}
              ml={4}
              aria-label={""}
            />
          </Tooltip>
        </Flex>
      </Flex>
    </>
  );
}
