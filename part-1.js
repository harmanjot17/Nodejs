const express = require('express')
const app = express();
const port = 8000;
app.get('/item/:brand/:itemname',(req,res) => {
	

	const data = req.params;
	res.json({"Brand Name":data.brand,
	"Item Name" : data.itemname});

})
app.listen(port,() => {
    console.log('Example app listening on port ${port}!')});
