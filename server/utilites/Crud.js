const Create =async (req,res) => {
  const newProduct = new Product({
    title: req.body.data.title,
    description: req.body.data.description,
    price: req.body.data.price,
    discountPercentage: req.body.data.discountPercentage,
    rating: req.body.data.rating,
    stock: req.body.data.stock,
    brand: req.body.data.brand,
    category: req.body.data.category,
    images: req.body.data.images,
  });

  await Product.create(newProduct);
  res.send("Product saved to the database!");
}
const Read = async (req,res)=>{
 
}
const Update= async (req,res)=> {
  const product_id = req.params.id;
  await Product.findByIdAndUpdate(product_id, {
    title: req.body.title,
    description: req.body.description,
    price: req.body.price,
    discountPercentage: req.body.discountPercentage,
    rating: req.body.rating,
    stock: req.body.stock,
    brand: req.body.brand,
    category: req.body.category,
    images: req.body.images,
  });;
  res.send("Product Updated successfully");
}
const Delete = async (req,res) =>{
  const product_id = req.params.id;
  await Product.findByIdAndDelete(product_id);
  res.send("Product deleted!");
}
module.exports={Create,Read,Update,Delete};