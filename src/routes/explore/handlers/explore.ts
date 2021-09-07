import handleError from "../../../helpers/handle-error";
import FileUpload from "../../upload/handlers/schemas/fileUpload.schema";

const explore = async (req, res) => {
    try {
        const filesToSearch = await FileUpload.find() as any;

        res
            .status(200)
            .json({ files: filesToSearch });

    } catch (err) {
        handleError(err, res)
    }

}

export default explore;