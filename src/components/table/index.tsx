import * as React from "react";
import { Checkbox } from "../checkbox";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./based";

interface Column {
  header: string | React.ReactNode;
  accessor: string;
  headerClassName?: string; // Custom class for header cells
  cellClassName?: string; // Custom class for body cells
  render?: (value: any, row: DataRow) => React.ReactNode;
}

interface DataRow {
  [key: string]: React.ReactNode | string | boolean | undefined;
  disabled?: boolean; // 👈 Add optional disabled field to DataRow
}

interface Selected {
  [key: string]: React.ReactNode;
}

interface CustomTableProps {
  columns: Column[];
  data: DataRow[];
  caption?: string;
  footer?: DataRow;
  className?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  asSelect?: boolean;
  asDetail?: boolean;
  selected?: Selected[];
  selectAccessor?: string;
  setSelected?: (key: Selected[]) => void;
  onDetailChange?: () => void;
  indeterminate?: boolean;
}

const CustomTable: React.FC<CustomTableProps> = ({
  columns,
  data,
  caption,
  footer,
  className,
  headerClassName,
  bodyClassName,
  footerClassName,
  asSelect = false,
  asDetail = false,
  selected = [],
  selectAccessor = "id",
  setSelected = () => {},
  onDetailChange = () => {},
  indeterminate = false,
}) => {
  const onParentClick = (e: any, item: DataRow) => {
    if (e.target.tagName !== "BUTTON") {
      if (asSelect && !asDetail) {
        const checkSelected = selected.some(
          (selectedItem) =>
            selectedItem[selectAccessor] === item[selectAccessor]
        );
        if (!item.disabled) {
          handleSelect(!checkSelected, item);
        }
      }
      if (asDetail && !asSelect) {
        onDetailChange();
      }
    }
  };

  const handleSelectAll = (checked: boolean) => {
    const selectableData = data.filter((item) => !item.disabled);
    const newSelected = checked
      ? [...selected, ...selectableData]
      : selected.filter(
          (selectedItem) =>
            !selectableData.some(
              (item) => item[selectAccessor] === selectedItem[selectAccessor]
            )
        );
    setSelected(newSelected);
  };

  const handleSelect = (checked: boolean, item: DataRow) => {
    const isSelected = selected.some(
      (selectedItem) => selectedItem[selectAccessor] === item[selectAccessor]
    );

    if (checked && !isSelected) {
      setSelected([...selected, item]);
    } else if (!checked && isSelected) {
      setSelected(
        selected.filter(
          (selectedItem) =>
            selectedItem[selectAccessor] !== item[selectAccessor]
        )
      );
    }
  };

  const dataIds = data
    .filter((item) => !item.disabled)
    .map((item) => item[selectAccessor]);
  const selectedIds = selected.map((item) => item[selectAccessor]);

  return (
    <Table className={className}>
      {caption && <TableCaption>{caption}</TableCaption>}
      <TableHeader className={headerClassName}>
        <TableRow>
          {asSelect && (
            <TableHead key="check_all">
              <Checkbox
                onCheckedChange={handleSelectAll}
                checked={
                  dataIds.length > 0 &&
                  dataIds.every((id) => selectedIds.includes(id))
                }
                indeterminate={
                  indeterminate &&
                  selectedIds.length > 0 &&
                  !dataIds.every((id) => selectedIds.includes(id))
                }
              />
            </TableHead>
          )}
          {columns.map((column, index) => (
            <TableHead key={index} className={column.headerClassName}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className={bodyClassName}>
        {data?.map((row, rowIndex) => {
          const isRowSelected = selected?.some(
            (selectedItem) =>
              selectedItem[selectAccessor] === row[selectAccessor]
          );
          return (
            <TableRow key={rowIndex} onClick={(e) => onParentClick(e, row)}>
              {asSelect && (
                <TableCell key="check">
                  <input
                    type="checkbox"
                    disabled={row.disabled}
                    checked={isRowSelected}
                    onChange={(e) => {
                      if (!row.disabled) {
                        handleSelect(e.target.checked, row);
                      }
                    }}
                    className="hidden peer"
                  />
                  <div
                    className={`h-4 w-4 rounded-sm border flex items-center justify-center ${
                      isRowSelected
                        ? "bg-primary text-primary-foreground"
                        : "bg-white border-primary"
                    } ${
                      row.disabled
                        ? "opacity-50 cursor-not-allowed border-gray-400"
                        : ""
                    }`}
                  >
                    {isRowSelected && (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-check h-4 w-4"
                      >
                        <path d="M20 6 9 17l-5-5"></path>
                      </svg>
                    )}
                  </div>
                </TableCell>
              )}
              {columns.map((column, colIndex) => (
                <TableCell key={colIndex} className={column.cellClassName}>
                  {column.render
                    ? column.render(row[column.accessor], row)
                    : row[column.accessor]}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
      {footer && (
        <TableFooter className={footerClassName}>
          <TableRow>
            {columns.map((column, index) => (
              <TableCell key={index}>{footer[column.accessor]}</TableCell>
            ))}
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
};

export default CustomTable;
