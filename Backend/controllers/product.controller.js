import Product from "../models/Product.model.js";
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "cant fetch the data server error" });
    console.log("error", error.message);
  }
}

export const createProduct = async (req, res) => {
  const { name, price, image } = req.body;

  if (!name || !price || !image) {
    return res.status(400).json({
      success: false,
      message: "Please provide name, price, and image.",
    });
  }

  const newProduct = new Product({ name, price, image });

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error("❌ Error saving product:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
} 

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ success: true, data: updatedProduct });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "server error " }, error.message);
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  console.log("id:", id);
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "product deleted" });
  } catch (error) {
    res.status(404).json({ message: "product not found" }, error.message);
  }
}