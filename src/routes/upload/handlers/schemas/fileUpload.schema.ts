import { model, Schema } from "mongoose";

const FileUploadSchema = new Schema({
    user: String,
    transaction: String,
    uri: String,
    confirmed_txn_note: {
        cid: String,
        filename: String,
        fileHash: String,
        extension: String
    },
    file_id: String,
    form_data: {
        image: String,
        description: String,
        album: String,
        music_file: String,
        title: String
    }
})

const FileUpload = model('FileUpload', FileUploadSchema)

export default FileUpload;