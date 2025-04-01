import DataUriParser from "datauri/parser.js"
import path from "path";
const getDataUri = (file) => {
    const parser = new DataUriParser();
    if (!file) {
        throw new Error('File is not provided');
    }
    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
}
export default getDataUri;

// const getDataUri = (file) => {
//     if (!file) throw new Error('File is not provided');
//     const fileExtension = path.extname(file.originalname);
//     return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
//   };