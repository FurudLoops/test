import handleError from "../../../helpers/handle-error";
import _fileHash from "../../../helpers/sha256";
import FileUpload from './schemas/fileUpload.schema';

const uploadDBSync = async (req: Request, res) => {
    try {
        const fileUpload = new FileUpload(req.body);
        await fileUpload.save();
        res
            .status(201)
            .contentType("text/json")
            .json({ response: 'sync done' });

    } catch (err) {
        handleError(err, res);
    }
}

export default uploadDBSync;