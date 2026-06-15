import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
} from "@mui/material";

function ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    fetch("https://fakestoreapi.com/users")
      .then((res) => res.json())
      .then((data) => setClientes(data))
      .catch((error) => console.error(error));
  }, []);

  const clientesFiltrados = clientes.filter((cliente) => {
    const apellido = cliente.name.lastname.toLowerCase();
    const ciudad = cliente.address.city.toLowerCase();
    const texto = busqueda.toLowerCase();

    return apellido.includes(texto) || ciudad.includes(texto);
  });

  return (
    <>
      <h2>Lista de Clientes</h2>

      <TextField
        label="Buscar por apellido o ciudad"
        variant="outlined"
        fullWidth
        margin="normal"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre Completo</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Ciudad</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {clientesFiltrados.map((cliente) => (
              <TableRow key={cliente.id}>
                <TableCell>{cliente.id}</TableCell>
                <TableCell>
                  {cliente.name.firstname} {cliente.name.lastname}
                </TableCell>
                <TableCell>{cliente.email}</TableCell>
                <TableCell>{cliente.phone}</TableCell>
                <TableCell>{cliente.address.city}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ListaClientes;