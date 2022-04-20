const fs = require("fs");
const path = require("path");

const productsFilePath = path.join(__dirname, "../data/productsDataBase.json");
const products = JSON.parse(fs.readFileSync(productsFilePath, "utf-8"));

const toThousand = (n) =>
  Math.round(n)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
  index: (req, res) => {
    // Do the magic
    console.log("pase por / ...index");
    res.render("index", {
      productsVisited: products.filter(
        (product) => product.category == "visited"
      ),
      productsInSale: products.filter(
        (product) => product.category == "in-sale"
      ),
      toThousand,
    });
  },
  search: (req, res) => {
    // Do the magic
    let keyword = req.query.keywords;
    result = products.filter((product) => {
      return product.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1;
    });

    res.render("results", { result, keyword });
  },
};

module.exports = controller;
