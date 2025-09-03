const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const router = Router();
const { Admin, Card } = require("../db/index");
const { signupSchema, loginSchema, cardSchema, updateCardSchema } = require("../db/types");
const { JWT_SECRET, ADMIN_SIGNUP_KEY } = require("../config");
const jwt = require("jsonwebtoken");

// Admin Routes

// Singup route
router.post('/signup', async (req, res) => {

    // Validate input using Zod 
    const validInput = signupSchema.safeParse(req.body);

    if(!validInput.success){
        return res.status(400).json({
            message: "Invalid input",
            errors: validInput.error.errors
        });
    }

    const { email, password, adminkey } = validInput.data;

    // 2. Check if the provided admin key is correct
    if(adminkey !== ADMIN_SIGNUP_KEY){
        return res.status(403).json({
            message: "Invalid Admin key. You are not authorized to create an admin account."
        });
    }

    // Implement admin signup logic
    await Admin.create({
        email: email,
        password: password
    });

    res.json({
        message: 'Admin created successfully'
    })
    
});

//Signin route
router.post('/signin', async (req, res) => {

    // Validate input using Zod 
    const validInput = loginSchema.safeParse(req.body);

    if(!validInput.success){
        return res.status(400).json({
            message: "Invalid input",
            errors: validInput.error.errors
        });
    }

    // Implement admin signup logic
    // Used the validated input data directly from the Zod result. This is safer and cleaner.
    const user = await Admin.findOne(validInput.data);

    if(user){

        const token = jwt.sign({ email: validInput.data.email }, JWT_SECRET);

        res.json({ token });
    }
    else{
        res.status(401).json({
            message: "Incorrect email or password"
        })
    }
});

// Create Cards
router.post('/card', adminMiddleware, async (req, res) => {
    // Validate the input using zod
        const validInput = updateCardSchema.safeParse(req.body);
    
        if(!validInput.success){
            return res.status(400).json({
                message: 'Invalid Input',
                errors: validInput.error.errors
            });
        }
    
        // Implement course creation logic
        // Used the validated input data directly from the Zod result. This is safer and cleaner.
        const createcourse = await Card.create(validInput.data);
    
        res.json({
            message: 'Course created successfully',
            cardId: createcourse._id
        })
});

// Get info on all the available cards
router.get('/cards', adminMiddleware, async (req, res) => {
    // Implement fetching all courses logic
    const response = await Card.find({});

    if(!response){
        return res.status(404).json({message: "No Cards are found"});
    }

    res.json({
        Cards: response
    })
});

// Get an single card with ID
router.get("/cards/:cardId", adminMiddleware, async (req, res) => {
    const cardid  = req.params.cardId;

    const response = await Card.findById(cardid);

    if(!response){
        return res.status(404).json({message: "Card not found"});
    }

    res.json({
        Cards: response
    })

});

// Updates the content inside the card route
router.put('/cards/:cardId', adminMiddleware, async (req, res) => {
    // Validate the input using zod
        const validInput = updateCardSchema.safeParse(req.body);
    
        if(!validInput.success){
            return res.status(400).json({
                message: 'Invalid Input',
                errors: validInput.error.errors
            });
        }

        const cardid = req.params.cardId;

        const response = await Card.findByIdAndUpdate(cardid,validInput.data,{ new: true});

        if(!response){
            return res.status(404).json({message: "No Update was made to the card"});
        }

        res.json({
            message: "Card Updated"
        })
});

// whole card deletion route
router.delete('/cards/:cardId', adminMiddleware, async(req, res) => {

    const cardid = req.params.cardId;

    const response = await Card.findByIdAndDelete(cardid);

    if(!response){
        return res.status(404).json({message: "Card is not available to be database."});
    }

    res.json({
        message: "Card Deleted"
    })

});


// Items in interest deletion in the card route
router.delete('/cards/:cardId/interests', adminMiddleware, async(req, res) => {

    const cardid = req.params.cardId;

    const response = await Card.findByIdAndUpdate(cardid, {
        "$pull": {
            interests: req.body.interests
        }
    },{ new: true});

    if(!response){
        return res.status(404).json({message: "Item in the interest section is not available"});
    }

    res.json({
        message: "The Item has been deleted from the Interest Section"
    })

});

// Fields in the card can be deleted in this route
router.delete('/cards/:cardId/fields', adminMiddleware, async(req, res) => {
    
    const cardid = req.params.cardId;
    
    const deletefields = req.body.fieldsToDelete;

    if(!deletefields){
        return res.status(404).json({message: "Enter the fields that you want to delete from the card"});
    }

    const fieldsToUnset = {};

    deletefields.forEach(fieldName => {   // This foreach is created for the placeholder which the mongodb requires for the $unset operator.
        fieldsToUnset[fieldName] = 1;
    })

    const response = await Card.findByIdAndUpdate(cardid, {
        "$unset": fieldsToUnset
    });

    if(!response){
        return res.status(404).json({message: "Section that you are trying to delete is not available"});
    }

    res.json({
        message: "The fields have been deleted from the card database."
    })

});

router.use((err, req, res, next) => {
    res.status(500).json({ error: 'Internal server error', details: err });
});

module.exports = router;