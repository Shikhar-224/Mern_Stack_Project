const express = require('express');
const router = express.Router()

const { create, productById, read, remove, update, list, listSearch, listRelated, listCategory, listBySearch, photo } = require('../controller/product');
const { requireSignin, isAuth, isAdmin } = require('../controller/auth');
const { userById } = require('../controller/user');

router.post('/product/create/:userId', requireSignin, isAuth, isAdmin, create);
router.get('/product/:productId', read);
router.delete('/product/:productId/:userId', requireSignin, isAuth, isAdmin, remove);
router.put('/product/:productId/:userId', requireSignin, isAuth, isAdmin, update);

router.get('/products', list);
router.get("/products/search", listSearch);
router.get('/products/related/:productId', listRelated);
router.get('/products/category', listCategory);
router.post("/products/by/search", listBySearch);
router.get('/products/photo/:productId', photo);

router.param('userId', userById);
router.param('productId', productById);

module.exports = router;