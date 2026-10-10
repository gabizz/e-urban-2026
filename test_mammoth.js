import mammoth from 'mammoth';
import fs from 'fs';

mammoth.convertToHtml({path: "examples/formulare/CERERE AUTORIZATIE DE CONSTRUIRE.docx"})
    .then(function(result){
        var html = result.value; 
        var messages = result.messages;
        fs.writeFileSync('test_output.html', html);
        console.log("Done");
    })
    .catch(function(error) {
        console.error(error);
    });
