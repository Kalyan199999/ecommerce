const Product = require('../models/Product');

const addNewProduct =  async (req, res) => {
  try 
  {
    const { title, description, price, category, stock, createdBy } = req.body;
    const imagePaths = req.files.map(file => file); // or `file.path` for full paths

    const product = new Product({
      title,
      description,
      price,
      category,
      stock,
      createdBy,
      images: imagePaths
    });

    await product.save();
    return res.status(201).json(product);
  } 
  catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Product creation failed' });
  }
}

const getProducts = async (req, res) => {
  try 
  {
    const products = await Product.find();
    return res.status(201).json({message: 'Products fetched successfully', products});
  } 
  catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getProductById = async (req, res) => {
  try 
  {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ msg: 'Product not found' });
    return res.json(product);
  } 
  catch (err) 
  {
    return res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try 
  {
    const item = await Product.findByIdAndDelete(req.params.id);
    return res.json({ msg: 'Product deleted' , item });
  } 
  catch (err) 
  {
    return res.status(500).json({ error: err.message });
  }
};

module.exports = {
    addNewProduct,
    getProducts, 
    getProductById, 
    deleteProduct
}