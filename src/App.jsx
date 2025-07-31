/*
✅ Bootstrap has been replaced with MUI.
*/

import { useState } from "react";
import { 
  Container, 
  Grid, 
  Button, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  TextField, 
  Box 
} from "@mui/material";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const [dataItems, setDataItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(products[0].code);
  const [ppu, setPpu] = useState(products[0].price);
  const [qty, setQty] = useState(1);
  const [discount, setDiscount] = useState(0);

  const addItem = () => {
    console.log("Adding item...");
    console.log(selectedItem, ppu, qty);
    let item = products.find((v) => selectedItem === v.code)

    const newItem = {
      item: item.name,
      ppu: ppu,
      qty: qty,
      discount: discount || 0, // Default to 0 if no discount is set
    };

    // increase the quantity if the item already exists
    // check redundant items with same name and same price
    const existingItemIndex = dataItems.findIndex(
      (v) => v.item === item.name && v.ppu === ppu && v.discount === discount
    );
    if (existingItemIndex !== -1) {
      // If item exists, update the quantity
      const updatedItems = [...dataItems];
      updatedItems[existingItemIndex].qty += qty;
      setDataItems(updatedItems);
      return;
    }

    setDataItems([...dataItems, newItem]);
  };

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  }

  const productChange = (event) => {
    const selectedCode = event.target.value;
    setSelectedItem(selectedCode);
    let item = products.find((v) => selectedCode === v.code)
    setPpu(item.price)
  }
  
  const handleClear = () => {
    setDataItems([]);
    setSelectedItem(products[0].code);
    setPpu(products[0].price);
    setQty(1);
  }

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}>
          <Box sx={{ backgroundColor: "#e4e4e4", p: 2 }}>
            <Box sx={{ mb: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Item</InputLabel>
                <Select
                  value={selectedItem}
                  label="Item"
                  onChange={productChange}
                >
                  {products.map((p) => (
                    <MenuItem key={p.code} value={p.code}>
                      {p.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Price Per Unit"
                type="number"
                fullWidth
                value={ppu ? ppu : ""}
                onChange={(e) => setPpu(Number(e.target.value))}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Quantity"
                type="number"
                fullWidth
                value={qty}
                onChange={(e) => setQty(Number(e.target.value))}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                label="Discount"
                type="number"
                fullWidth
                value={discount ? discount : ""}
                onChange={(e) => setDiscount(Number(e.target.value))}
              />
            </Box>
            <Box sx={{ borderTop: 1, borderColor: 'divider', pt: 2 }}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                onClick={addItem}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={8}>
          <QuotationTable
            data={dataItems}
            deleteByIndex={deleteByIndex}
            handleClear={handleClear}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
