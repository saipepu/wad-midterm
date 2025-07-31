/*
✅ Bootstrap has been replaced with MUI.
*/

import {
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  IconButton,
  TableFooter,
} from "@mui/material"
import { CiShoppingCart } from "react-icons/ci"
import ClearIcon from "@mui/icons-material/Clear"
import DeleteIcon from "@mui/icons-material/Delete"

import style from "./mystyle.module.css"

function QuotationTable({ data, deleteByIndex, handleClear }) {
  // Guard condition
  if (!data || data.length === 0) {
    return (
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          SaiPePu's Quotation
        </Typography>
        <Box display="flex" alignItems="center" gap={1}>
          <CiShoppingCart />
          <Typography>No items</Typography>
        </Box>
      </Container>
    )
  }

  const total = data.reduce((acc, v) => acc + v.qty * v.ppu, 0)
  const totalDiscount = data.reduce((acc, v) => acc + (v.discount || 0), 0)

  const handleDelete = (index) => {
    deleteByIndex(index)
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        SaiPePu's Quotation
      </Typography>
      <Button
        variant="outlined"
        color="inherit"
        startIcon={<ClearIcon />}
        sx={{ mb: 2 }}
        onClick={handleClear}
      >
        Clear
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center">-</TableCell>
              <TableCell align="center">Qty</TableCell>
              <TableCell align="center">Item</TableCell>
              <TableCell align="center">Price/Unit</TableCell>
              <TableCell align="center">Total Price</TableCell>
              <TableCell align="center">Discount</TableCell>
              <TableCell align="center">Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((v, i) => {
              let amount = v.qty * v.ppu - (v.discount || 0)
              return (
                <TableRow key={i} hover>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleDelete(i)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                  <TableCell align="center">{v.qty}</TableCell>
                  <TableCell>{v.item}</TableCell>
                  <TableCell align="center">{v.ppu}</TableCell>
                  <TableCell align="center">{v.qty * v.ppu}</TableCell>
                  <TableCell align="center">{v.discount || 0}</TableCell>
                  <TableCell align="right">{amount}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          <TableFooter>
            <TableRow sx={{ "& td": { border: 0 } }}>
              <TableCell colSpan={4} align="right">
                <Typography>Total</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>{total}</Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ "& td": { border: 0 } }}>
              <TableCell colSpan={5} align="right">
                <Typography>Total Discount</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography>{totalDiscount}</Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ "& td": { border: 0 } }}>
              <TableCell colSpan={6} align="right">
                <Typography variant="h6">Grand Total</Typography>
              </TableCell>
              <TableCell align="right">
                <Typography variant="h6">{total - totalDiscount}</Typography>
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default QuotationTable
