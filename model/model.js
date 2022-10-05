const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    _links: { self: { href: "string" } },
    identifier: "string",
    family: "string",
    parent: "string",
    groups: ["string"],
    categories: ['string'],
    enabled: "boolean",
    values: Object,
    created: 'string',
    updated: 'string',
    associations: Object
})

module.exports = mongoose.model("Products", productSchema);