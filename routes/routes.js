const express = require("express");
const router = express.Router();
const fs = require("fs");

const Product = require("../model/model");
const jsonData = require("../data.json");

const db = require("../helpers/key").MongoURI;

router.post('/uploads', async (req, res) => {
    try {
        await Product.insertMany(jsonData)
        res.status(200).send("Succes")
    } catch (e){
        res.status(500).send(e.message);
    }
})

router.get('/products/:identifier', async (req, res) => {
    try {
        let searchedProduct = await Product.findOne({ identifier: req.params.identifier });
        res.status(200).send(searchedProduct)
    } catch (e) {
        res.send(e.message)
    }
})

router.patch('/product/:identifier', async (req, res) => {
    
    const data = req.body;

    try {
        let searchedProduct = await Product.findOne({ identifier: req.params.identifier });
        let newProduct = {
            $set: {
                _links: data._links,
                identifier: data.identifier,
                family: data.family,
                parent: data.parent,
                groups: data.groups,
                categories: data.categories,
                enabled: data.enabled,
                values: data.values,
                created: data.created,
                updated: data.updated,
                associations: data.associations,
            }
        }

        await Product.updateOne(searchedProduct, newProduct);
        
        res.status(200).send("Succes");
        
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.delete('/product/:identifier', async (req, res) => {
    try {
        await Product.deleteOne({ identifier: req.params.identifier })
        res.status(200).send("Succes")
    } catch (e) {
        res.status(500).send(e.message)
    }
})

router.get('/products', async (req, res) => { 
    console.log(req.query.family)
    try {
        let results = await Product.find({ family: req.query.family })
        res.send(results)
    } catch (e) {
        res.send(e.message)
    }
})

module.exports = router;