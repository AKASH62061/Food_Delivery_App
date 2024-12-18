
import foodModel from "../models/foodModel.js";
import fs from "fs";

// Add food items
const addFood = async (req, res) => {
  try {
    // Check if a file is uploaded
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded. Please upload an image.",
      });
    }

    // Extract file details
    const Image_filename = req.file.filename;

    // Create a new food item
    const food = new foodModel({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      category: req.body.category,
      Image: Image_filename,
    });

    // Save the food item to the database
    await food.save();

    res.status(201).json({
      success: true,
      message: "Food item added successfully",
    });
  } catch (error) {
    console.error("Error in addFood:", error);

    res.status(500).json({
      success: false,
      message: "An error occurred while adding the food item",
      error: error.message,
    });
  }
  //all food list
  
};
const listFood = async (req, res)=>{
    try {
        const foods = await foodModel.find({});
        res.json({success:true,data:foods})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:"Error"})
    }
  };
  const removeFood = async (req, res)=>{
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.Image}`, ()=>{})

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({success:true, message:"Foos Removed"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message:"Error"})
    }
  }
export { addFood, listFood, removeFood};
