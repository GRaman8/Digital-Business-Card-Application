const { Router } = require("express");
const router = Router();
const {  Card } = require("../db/index");

router.get('/cards', async (req, res) => {
    // Implement listing all courses logic
    const response = await Card.find({});

    res.json({
        Cards: response
    })
});

// Get an single card with ID
router.get("/cards/:cardId", async (req, res) => {
    const cardid  = req.params.cardId;

    const response = await Card.findById(cardid);

    if(!response){
        return res.status(404).json({message: "Card not found"});
    }

    res.json({
        Cards: response
    })

});

router.use((err, req, res, next) => {
    res.status(500).json({ error: 'Internal server error', details: err });
});

module.exports = router