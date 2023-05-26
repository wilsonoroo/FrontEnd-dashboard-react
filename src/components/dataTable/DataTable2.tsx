import { TriangleDownIcon, TriangleUpIcon } from "@chakra-ui/icons";
import {
  Box,
  chakra,
  HStack,
  IconButton,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import * as React from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronsLeft,
  FiChevronsRight,
} from "react-icons/fi";

export type DataTableProps<Data extends object> = {
  data: Data[];
  columns: ColumnDef<Data, any>[];
};

export function DataTable2<Data extends object>({
  data,
  columns,
}: DataTableProps<Data>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <>
      <Table variant="striped">
        <Thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <Tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta: any = header.column.columnDef.meta;
                return (
                  <Th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    isNumeric={meta?.isNumeric}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}

                    <chakra.span pl="4">
                      {header.column.getIsSorted() ? (
                        header.column.getIsSorted() === "desc" ? (
                          <TriangleDownIcon aria-label="sorted descending" />
                        ) : (
                          <TriangleUpIcon aria-label="sorted ascending" />
                        )
                      ) : null}
                    </chakra.span>
                  </Th>
                );
              })}
            </Tr>
          ))}
        </Thead>
        <Tbody>
          {table.getRowModel().rows.map((row) => (
            <Tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                // see https://tanstack.com/table/v8/docs/api/core/column-def#meta to type this correctly
                const meta: any = cell.column.columnDef.meta;
                return (
                  <Td key={cell.id} isNumeric={meta?.isNumeric}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </Td>
                );
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
      <HStack>
        <Box>
          <IconButton
            colorScheme="blue"
            aria-label="Search database"
            fontSize="20px"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
            borderRadius={5}
            icon={<FiChevronsLeft />}
          />
        </Box>
        <Box>
          <IconButton
            colorScheme="blue"
            aria-label="Search database"
            fontSize="20px"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            borderRadius={5}
            icon={<FiChevronLeft />}
          />
        </Box>
        <Box>
          <IconButton
            colorScheme="blue"
            aria-label="Search database"
            fontSize="20px"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            borderRadius={5}
            icon={<FiChevronRight />}
          />
        </Box>
        <Box>
          <IconButton
            colorScheme="blue"
            aria-label="Search database"
            fontSize="20px"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
            borderRadius={5}
            icon={<FiChevronsRight />}
          />
        </Box>
        <Box>
          <IconButton
            colorScheme="blue"
            aria-label="Search database"
            fontSize="20px"
            borderRadius={5}
            icon={<FiChevronLeft />}
          />
        </Box>
        <span className="flex items-center gap-1">
          <div>Page</div>
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={table.getState().pagination.pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              table.setPageIndex(page);
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Cantidad Por Pagina {pageSize}
            </option>
          ))}
        </select>
      </HStack>
    </>
  );
}
