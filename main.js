const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");
const date = Date.now()
const fs = require("fs");
const path = require("path");

function makeDoc(template, data) {
    const content = fs.readFileSync(
        path.resolve(__dirname, `templates/template_${template}.docx`),
        "binary"
    );
    
    const zip = new PizZip(content);
    
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });
    
    doc.render(data);
    
    const buf = doc.getZip().generate({
        type: "nodebuffer",
        compression: "DEFLATE",
    });
    
    fs.writeFileSync(path.resolve(__dirname, `output/output-${date}.docx`), buf);
    }
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
// i know i write terrible code please don't bully me
let stores = ["verizon", "sprint", "applestore"]
switch(process.argv[2]) {
    default: 
    console.log(`no command argument specified, stores available are: ${stores}`)
    process.exit()
    case "applestore":
        let data = require("./data/data-applestore.json")
        data.cusnum = getRandomInt(100000,999999)
        data.devicemodel = data.devicemodel.toUpperCase()
        data.tax = Number(data.price)*Number(data.taxpercent)
        data.total = Number(data.tax)+Number(data.price)
        console.log(data)
        makeDoc("applestore", data)
        break;
    case "verizon":
        console.log("ermm well akshually... this doesn't work yet.,")
        process.exit()
    case "sprint":
        console.log("ermm well akshually... this doesn't work yet.,")
        process.exit()
}