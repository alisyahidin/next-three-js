import JSZip from 'jszip'
import { saveAs } from 'file-saver'
import Excel from 'exceljs'

const DownloadZip = () => {
  const getFiles = async () => {
    const workbook = new Excel.Workbook();
    workbook.creator = "Test Application";
    workbook.lastModifiedBy = "Test Application";
    workbook.created = new Date();
    workbook.modified = new Date();

    const worksheet = workbook.addWorksheet('List Test');
    worksheet.getRow(1).font = { bold: true };

    worksheet.columns = [
      { header: 'Test', key: 'test', width: 15 },
    ];

    worksheet.addRows([{ test: 'Test 1' }, { test: 'Test 2' }]);

    // save under export.xlsx
    const buffer = await workbook.xlsx.writeBuffer();
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    const blob = new Blob([buffer], { type: fileType });

    const zip = new JSZip();
    zip.file("Test.xlsx", blob, { binary: true });
    zip.file("Test.txt", "Hello Test\n");
    zip.generateAsync({ type: "blob" })
      .then(function (content) {
        saveAs(content, "example.zip");
      });
  }
  return (
    <div>
      <button onClick={getFiles}>Download</button>
    </div>
  )
}

export default DownloadZip
