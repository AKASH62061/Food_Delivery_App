import userModel  from "../models/userModel.js"

//add itmes to user cart
const addToCart = async (req,res)=>{
try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;


    if(!cartData[req.body.itemId]){
        cartData[req.body.itemId] = 1
    }
    else{
        cartData[req.body.itemId] += 1
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true,message:"Added To Cart"});
} catch (error) { 
    console.log(error);
    res.json({success:false,message:"Error"})
}
}

//romove items from users cart
const removeFromCart = async (req,res) => {
try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData
    if(cartData[req.body.itemId]>0){
        cartData[req.body.itemId] -= 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId,{cartData});
    res.json({success:true, message:"removed From Cart"})
} catch (error) {
    console.log(error);
    res.json({success:false, message:"Error"})
}
}

//fetch user cart data
const getCart = async (req,res) =>{
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartData = await userData.cartData
        res.json({success:true,cartData})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
}

export {addToCart,removeFromCart,getCart}










// import userModel from "../models/userModel.js";

// // Add items to user cart
// const addToCart = async (req, res) => {
//     try {
//         const userId = req.user.id; // Use the user ID from auth middleware
//         const { itemId } = req.body;

//         if (!itemId) {
//             return res.status(400).json({ success: false, message: "Item ID is required" });
//         }

//         const userData = await userModel.findById(userId);
//         if (!userData) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         let cartData = userData.cartData || {}; // Ensure cartData is an object
//         if (!cartData[itemId]) {
//             cartData[itemId] = 1;
//         } else {
//             cartData[itemId] += 1;
//         }

//         await userModel.findByIdAndUpdate(userId, { cartData }, { new: true }); // Update the user's cart
//         res.json({ success: true, message: "Added to cart" });
//     } catch (error) {
//         console.error("Error adding to cart:", error);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };

// // Remove items from user's cart
// const removeFromCart = async (req, res) => {
//     try {
//         const userId = req.user.id; // Use the user ID from auth middleware
//         const { itemId } = req.body;

//         if (!itemId) {
//             return res.status(400).json({ success: false, message: "Item ID is required" });
//         }

//         const userData = await userModel.findById(userId);
//         if (!userData) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         let cartData = userData.cartData || {}; // Ensure cartData is an object
//         if (cartData[itemId] && cartData[itemId] > 0) {
//             cartData[itemId] -= 1;
//             if (cartData[itemId] === 0) {
//                 delete cartData[itemId]; // Remove item from cart if count reaches zero
//             }
//         } else {
//             return res.status(400).json({ success: false, message: "Item not in cart" });
//         }

//         await userModel.findByIdAndUpdate(userId, { cartData }, { new: true }); // Update the user's cart
//         res.json({ success: true, message: "Removed from cart" });
//     } catch (error) {
//         console.error("Error removing from cart:", error);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };

// // Fetch user cart data
// const getCart = async (req, res) => {
//     try {
//         const userId = req.user.id; // Use the user ID from auth middleware

//         const userData = await userModel.findById(userId);
//         if (!userData) {
//             return res.status(404).json({ success: false, message: "User not found" });
//         }

//         const cartData = userData.cartData || {}; // Ensure cartData is an object
//         res.json({ success: true, cartData });
//     } catch (error) {
//         console.error("Error fetching cart:", error);
//         res.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// };

// export { addToCart, removeFromCart, getCart };
