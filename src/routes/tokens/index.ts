const express = require('express');
const router = express.Router();

import getMyTokens from "./handlers/getMyTokens";

router
    .route('/get-my-tokens')
    .post(getMyTokens);


export default router;
