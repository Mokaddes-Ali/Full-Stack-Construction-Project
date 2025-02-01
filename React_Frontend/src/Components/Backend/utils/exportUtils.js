import { utils, writeFile } from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

// Export to CSV
export const exportToCSV = (data, headers, filename) => {
  const csvHeaders = headers.map((header) => header.label);
  const csvData = data.map((row) =>
    headers.map((header) => row[header.key])
  );
  const csvContent = [csvHeaders, ...csvData]
    .map((row) => row.join(","))
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `${filename}.csv`;
  link.click();
};

// Export to PDF
export const exportToPDF = (data, headers, filename) => {
  const doc = new jsPDF();
  const tableHeaders = headers.map((header) => header.label);
  const tableData = data.map((row) =>
    headers.map((header) => row[header.key])
  );

  doc.autoTable({
    head: [tableHeaders],
    body: tableData,
  });
  doc.save(`${filename}.pdf`);
};

// Export to Excel
export const exportToExcel = (data, headers, filename) => {
  const worksheet = utils.json_to_sheet(data);
  const workbook = utils.book_new();
  utils.book_append_sheet(workbook, worksheet, "Sheet1");
  writeFile(workbook, `${filename}.xlsx`);
};