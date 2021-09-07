"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
const passport = require('passport');
router.get('/login/google', passport.authenticate('google', { scope: ['profile'] }));
router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});
router.get('/return', passport.authenticate('google', { failureRedirect: '/' }), (req, res, next) => {
    res.redirect('/');
});
exports.default = router;
//# sourceMappingURL=index.js.map