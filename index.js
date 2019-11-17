require('dotenv').config();
const template = process.env.template || 'template.pdf';
const namesCSV = process.env.names || 'names.csv';
const x = process.env.x || 327.641;
const y = process.env.y || 209.058;
// Add customized fonts in ./node_module/hummus-recipe/fonts
const fontType = process.env.font || 'arial';
const fontS = process.env.fontSize || '36';
const fontColor = process.env.fontColor || '#000000';


const fsExtra = require('fs-extra');
const csv2json = require('csv2json');
const fs = require('fs');


fsExtra.emptyDir('./output/')
    .then(() => {
        fs.createReadStream(`${namesCSV}`)
            .pipe(csv2json({
                // Defaults to comma.
                separator: ';'
            }))
            .pipe(fs.createWriteStream('./temp/data.json'))
            .on('close', function(err) {
                // console.log('Stream has been Closed');
                const names = require('./temp/data.json');
                names.forEach(el => {
                    // console.log(el.Name);
                    createPDF(template, el.Name, x, y, fontColor, fontS, fontType);
                });
            })

        // console.log('success!')
    })
    .catch(err => {
        console.error(err)
    })


const createPDF = (template, output, x, y, fontColor, fontS, fontType) => {
    // new file names created with first & last name
    const outputName = output.replace(/\s+/g, '');
    // console.log('\n', outputName);
    const HummusRecipe = require('hummus-recipe');
    const pdfDoc = new HummusRecipe(`${template}`, `./output/${outputName}.pdf`);
    pdfDoc
    // edit 1st page
        .editPage(1)
        // .text('Mishal Dholakia', 50, 50)
        .text(`${output}`, `${x}`, `${y}`, {
            color: `${fontColor}`,
            fontSize: parseInt(`${fontS}`),
            font: `${fontType}`,
            // strikeOut: true,
            // highlight: {
            //     color: [255, 0, 0]
            // }
        })
        .endPage()
        // end and save
        .endPDF();
}