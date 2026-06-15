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
  CircularProgress,
  Alert,
} from "@mui/material";

function ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        setLoading(true);
        setError(false);

        const respuesta = await fetch(
          "https://fakestoreapi.com/users"
        );

        const data = await respuesta.json();

        setClientes(data);
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    obtenerClientes();

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

  // Estado de carga
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <Alert severity="error">
        Error al cargar los clientes.
      </Alert>
    );
  }

  // Estado de éxito
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