import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormularioCliente } from "../components/FormularioCliente";
import "../css/ListaClientes.css";
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
  Button,
} from "@mui/material";

function ListaClientes() {
  const [clientes, setClientes] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerClientes = async () => {
      try {
        setLoading(true);
        setError(false);

        const respuesta = await fetch("https://fakestoreapi.com/users");
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
  }, []);

  const clientesFiltrados = clientes.filter((cliente) => {
    const apellido = cliente.name.lastname.toLowerCase();
    const ciudad = cliente.address.city.toLowerCase();
    const texto = busqueda.toLowerCase();

    return apellido.includes(texto) || ciudad.includes(texto);
  });

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

  if (error) {
    return <Alert severity="error">Error al cargar los clientes.</Alert>;
  }

  return (
    <div className="lista-container">
      <h2 className="lista-title">Lista de Clientes</h2>

      <TextField
        className="lista-buscador"
        label="Buscar por apellido o ciudad"
        variant="outlined"
        fullWidth
        margin="normal"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />

      <FormularioCliente />

      <TableContainer component={Paper} className="tabla-clientes">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nombre Completo</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Teléfono</TableCell>
              <TableCell>Ciudad</TableCell>
              <TableCell align="center">Acciones</TableCell>
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

                <TableCell align="center">
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={() => navigate(`/clientes/${cliente.id}`)}
                  >
                    Ver Detalles
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default ListaClientes;