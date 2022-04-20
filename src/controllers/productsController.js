const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  // Root - Show all products
  index: (req, res) => {
    // Do the magic
    res.render("products", { products, toThousand });
  },

  // Detail - Detail from one product
  detail: (req, res) => {
    // Do the magic
    const id = req.params.id;

    res.render("detail", {
      product: products.find((element) => element.id == id),
    }); //
  },

  // Create - Form to create
  create: (req, res) => {
    // Do the magic
    res.render("product-create-form");
  },

  // Create -  Method to store
  store: (req, res) => {
    // Do the magic
    let maxId = 0;
    products.forEach((product) => {
      if (product.id > maxId) maxId = product.id;
    });
    let newProduct = { id: maxId + 1, image: "default-image.png", ...req.body };
    newProduct.price = Number(newProduct.price);
    newProduct.discount = Number(newProduct.discount);
    products.push(newProduct);

    let productsJSON = JSON.stringify(products);
    //fs.writeFileSync(productsFilePath, productsJSON, "utf-8");
    res.redirect("/");
  },

  // Update - Form to edit
  edit: (req, res) => {
    // Do the magic
    const id = req.params.id;
    res.render("product-edit-form", {
      productToEdit: products.find((p) => p.id == id),
    });
  },
  // Update - Method to update
  update: (req, res) => {
    // Do the magic
    console.log(req.body);
    res.send("estoy en update");
  },

  // Delete - Delete one product from DB
  destroy: (req, res) => {
    // Do the magic
    res.send("estoy en delete");
  },
};

module.exports = controller;
