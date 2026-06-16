import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

import { AdminContext } from "../context/AdminContext";

const DetalleCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { admin } = useContext(AdminContext);

  const [cliente, setCliente] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerCliente = async () => {
      try {
        const respuesta = await fetch(`https://fakestoreapi.com/users/${id}`);
        if (!respuesta.ok)
          throw new Error("Error al traer los datos del cliente");

        const datos = await respuesta.json();
        setCliente(datos);
      } catch (err) {
        setError(err.message);
      } finally {
        setCargando(false);
      }
    };

    obtenerCliente();
  }, [id]);

  const handleEliminar = async () => {
    try {
      await fetch(`https://fakestoreapi.com/users/${id}`, { method: "DELETE" });
      alert("¡Cliente eliminado con éxito! (Simulación)");
      navigate("/clientes"); // Volvemos a la lista
    } catch {
      alert("Hubo un error al eliminar el cliente");
    }
  };

  if (cargando)
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Alert severity="error" sx={{ mt: 5 }}>
        {error}
      </Alert>
    );
  if (!cliente)
    return (
      <Alert severity="warning" sx={{ mt: 5 }}>
        Cliente no encontrado
      </Alert>
    );

  const { address, username, password, email, name } = cliente;

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Ficha del Cliente #{cliente.id}
        </Typography>

        {/* Datos Generales */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" color="primary">
            Datos Personales
          </Typography>
          <Typography>
            <strong>Nombre:</strong> {name.firstname} {name.lastname}
          </Typography>
          <Typography>
            <strong>Email:</strong> {email}
          </Typography>
        </Box>

        {/* Datos Anidados: Dirección */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" color="primary">
            Dirección
          </Typography>
          <Typography>
            <strong>Calle:</strong> {address.street} {address.number}
          </Typography>
          <Typography>
            <strong>Ciudad:</strong> {address.city}
          </Typography>
          <Typography>
            <strong>Código Postal:</strong> {address.zipcode}
          </Typography>
        </Box>

        {/* Datos Anidados: Credenciales */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" color="primary">
            Credenciales de Acceso
          </Typography>
          <Typography>
            <strong>Usuario:</strong> {username}
          </Typography>
          <Typography>
            <strong>Contraseña:</strong> {password}
          </Typography>
        </Box>

        <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={() => navigate("/clientes")}>
            Volver a la lista
          </Button>

          {/* RENDERIZADO CONDICIONAL: Solo Gerencia ve este botón */}
          {admin?.sector === "Gerencia" && (
            <Button variant="contained" color="error" onClick={handleEliminar}>
              Eliminar Cliente
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default DetalleCliente;
