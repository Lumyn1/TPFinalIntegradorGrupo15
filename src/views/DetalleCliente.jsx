import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../css/DetalleCliente.css";
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
      setCargando(true);
      setError(null);

      const clientesGuardados = JSON.parse(localStorage.getItem("clientesNuevos")) || [];
      const clienteLocal = clientesGuardados.find(
        (c) => String(c.id) === String(id)
      );

      if (clienteLocal) {
        setCliente(clienteLocal);
        setCargando(false);
        return;
      }

      try {
        const respuesta = await fetch(`https://fakestoreapi.com/users/${id}`);
        if (!respuesta.ok)
          throw new Error("Error al traer los datos del cliente");

        const datos = await respuesta.json();

        if (!datos || !datos.name) {
          throw new Error("Cliente no encontrado");
        }

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
      const clientesGuardados = JSON.parse(localStorage.getItem("clientesNuevos")) || [];
      const esLocal = clientesGuardados.some((c) => String(c.id) === String(id));

      if (esLocal) {
        const actualizados = clientesGuardados.filter(
          (c) => String(c.id) !== String(id)
        );
        localStorage.setItem("clientesNuevos", JSON.stringify(actualizados));
      } else {
        await fetch(`https://fakestoreapi.com/users/${id}`, { method: "DELETE" });
      }

      alert("¡Cliente eliminado con éxito! (Simulación)");
      navigate("/clientes");
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
  <Container
    maxWidth="sm"
    className="detalle-container"
  >
    <Paper
      elevation={3}
      className="detalle-paper"
    >
      <Typography
        variant="h4"
        gutterBottom
        className="detalle-title"
      >
        Ficha del Cliente #{cliente.id}
      </Typography>

      <Box className="detalle-section">
        <Typography variant="h6" color="primary">
          Datos Personales
        </Typography>

        <Typography>
          <strong>Nombre:</strong>
          {" "}
          {name.firstname}
          {" "}
          {name.lastname}
        </Typography>

        <Typography>
          <strong>Email:</strong>
          {" "}
          {email}
        </Typography>
      </Box>

      <Box className="detalle-section">
        <Typography variant="h6" color="primary">
          Dirección
        </Typography>

        <Typography>
          <strong>Calle:</strong>
          {" "}
          {address.street}
          {" "}
          {address.number}
        </Typography>

        <Typography>
          <strong>Ciudad:</strong>
          {" "}
          {address.city}
        </Typography>

        <Typography>
          <strong>Código Postal:</strong>
          {" "}
          {address.zipcode}
        </Typography>
      </Box>

      <Box className="detalle-section">
        <Typography variant="h6" color="primary">
          Credenciales de Acceso
        </Typography>

        <Typography>
          <strong>Usuario:</strong>
          {" "}
          {username}
        </Typography>

        <Typography>
          <strong>Contraseña:</strong>
          {" "}
          {password}
        </Typography>
      </Box>

      <Box className="detalle-buttons">
        <Button
          variant="outlined"
          onClick={() => navigate("/clientes")}
        >
          Volver a la lista
        </Button>

        {admin?.rol === "Gerencia" && (
          <Button
            variant="contained"
            color="error"
            onClick={handleEliminar}
          >
            Eliminar Cliente
          </Button>
        )}
      </Box>
    </Paper>
  </Container>
);
};

export default DetalleCliente;
