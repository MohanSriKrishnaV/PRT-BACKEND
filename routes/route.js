const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const user = require("../models/user");
router.use(express.json());
const bodyparser = require("body-parser")

router.use(bodyparser.json())
router.post("/contacts", async (req, res) => {
    try {

        const reqs = req.body;
        const new_user = await user.create({
            firstname: reqs.firstName,
            lastname: reqs.lastName,
            email: reqs.email,
            phone: reqs.phone
        })

        res.status(201).json(new_user)
    } catch (e) {
        res.status(400).json({ err: e.message })
    }
})

router.get("/contacts", async (req, res) => {

    try {

        const all_data = await user.find();
        res.status(200).json(all_data)

    } catch (e) {
        res.status(400).json({ status: "failed", err: e.message })

    }
})


router.get("/contacts/:id", async (req, res) => {
    try {
        const x = req.params.id;
        let a = x.split(":")[1];
        const search_user = await user.findOne({ _id: a })
        res.status(200).json(search_user)

    } catch (e) {
        res.status(404).json({ error: "there is no user with such ID" })


    }
})


router.delete("/contacts/:id", async (req, res) => {
    try {
        const x = req.params.id;
        let a = x.split(":")[1];
        const deleted_user = await user.deleteOne({ _id: a })
        res.status(204).json({})

    } catch (e) {
        res.status(204).json({ error: e.message })
    }
})


router.put("/contacts/:id", async (req, res) => {
    try {
        const x = req.params.id;
        const new_data = req.body;
        let a = x.split(":")[1];
        const updated_user = await user.findOneAndUpdate(
            { _id: a }, { firstname: new_data?.firstName, lastname: new_data?.lastName, email: new_data?.email, phone: new_data?.phone }, { upsert: true });
        res.status(204).json({})

    } catch (e) {
        res.status(404).json({ error: "there is no user with such id " })
    }
})

module.exports = router;