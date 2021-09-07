import handleError from "../../../helpers/handle-error";
import FileUpload from "../../upload/handlers/schemas/fileUpload.schema";

const exploreArtists = async (req, res) => {
    try {
        const filesToSearch = await FileUpload.find().select('user') as any;
        const artists = new Set<string>();
        filesToSearch.forEach(({ user }) => artists.add(user));

        res
            .status(200)
            .json({ artists: [...artists.values()] });

    } catch (err) {
        handleError(err, res)
    }

}

export default exploreArtists;