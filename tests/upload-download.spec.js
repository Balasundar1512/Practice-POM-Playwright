const {test, expect} = require('@playwright/test')

const ExcelJs = require('exceljs');




async function writeExcelTest(searchText, replaceText,change, filePath) 
{

    
    const Workbook = new ExcelJs.Workbook();
    await Workbook.xlsx.readFile(filePath);
    const Worksheet =  Workbook.getWorksheet('Sheet1');
    const output = await readExcelTest(Worksheet, searchText);

    const cell = Worksheet.getCell(output.row, output.column+change.colChange);
    cell.value = replaceText;
    await Workbook.xlsx.writeFile(filePath);


}

async function readExcelTest(Worksheet, searchText) 
{
    let output = { row: -1, column: -1 }
    Worksheet.eachRow((row, rowNumber) => {

        row.eachCell((cell, colNumber) => {

            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }


        })

    })
    return output;

}

//writeExcelTest("Mango", 350, {rowChange:0, colChange:2}, "C:/Users/wwwba/OneDrive/Documents/excelTest.xlsx");

test("upload and download", async ({page})=>{

    const updateValue = "350";
    const textValue = "Mango"

    await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
    const downloadPromise = page.waitForEvent('download');
    await page.getByRole('button', { name: 'Download' }).click();

    const download = await downloadPromise;

    const filePath = "C:/Users/wwwba/Downloads/download.xlsx";

    await download.saveAs(filePath);
    writeExcelTest("Mango", 350, {rowChange:0, colChange:2}, filePath);
    await page.locator('#fileinput').click();
    await page.locator('#fileinput').setInputFiles(filePath)
    const textLocator = await page.getByText(textValue);
    const desiredRow = await page.getByRole('row').filter({has: textLocator});
    await expect(desiredRow.locator('#cell-4-undefined')).toContainText(updateValue);







})
