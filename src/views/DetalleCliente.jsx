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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
} from "@mui/material";

import { AdminContext } from "../context/AdminContext";

const DetalleCliente = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { admin } = useContext(AdminContext);

  const [cliente, setCliente] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [alerta, setAlerta] = useState({
    abierta: false,
    mensaje: "",
    gravedad: "error",
  });

  useEffect(() => {
    const obtenerCliente = async () => {
      setCargando(true);
      setError(null);

      const clientesGuardados =
        JSON.parse(localStorage.getItem("clientesNuevos")) || [];
      const clienteLocal = clientesGuardados.find(
        (c) => String(c.id) === String(id),
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
  const abrirModal = () => setModalAbierto(true);
  const cerrarModal = () => setModalAbierto(false);
  const cerrarAlerta = () => setAlerta({ ...alerta, abierta: false });
  const handleConfirmarEliminacion = async () => {
    try {
      cerrarModal();
      const clientesGuardados =
        JSON.parse(localStorage.getItem("clientesNuevos")) || [];
      const esLocal = clientesGuardados.some(
        (c) => String(c.id) === String(id),
      );

      if (esLocal) {
        const actualizados = clientesGuardados.filter(
          (c) => String(c.id) !== String(id),
        );
        localStorage.setItem("clientesNuevos", JSON.stringify(actualizados));
      } else {
        await fetch(`https://fakestoreapi.com/users/${id}`, {
          method: "DELETE",
        });
      }

      setAlerta({
        abierta: true,
        mensaje: "¡Cliente eliminado con éxito!",
        gravedad: "success",
      });
      setTimeout(() => {
        navigate("/clientes");
      }, 2000);
    } catch {
      setAlerta({
        abierta: true,
        mensaje: "Hubo un error al eliminar el cliente",
        gravedad: "error",
      });
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
    <Container maxWidth="sm" className="detalle-container">
      <Paper elevation={3} className="detalle-paper">
        <Typography variant="h4" gutterBottom className="detalle-title">
          Ficha del Cliente #{cliente.id}
        </Typography>

        <Box className="detalle-section">
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

        <Box className="detalle-section">
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

        <Box className="detalle-section">
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

        <Box className="detalle-buttons">
          <Button variant="outlined" onClick={() => navigate("/clientes")}>
            Volver a la lista
          </Button>

          {admin?.rol === "Gerencia" && (
            <Button variant="contained" color="error" onClick={abrirModal}>
              Eliminar Cliente
            </Button>
          )}
        </Box>
      </Paper>
      <Dialog open={modalAbierto} onClose={cerrarModal}>
        <DialogTitle>¿Confirmar eliminación?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Estás a punto de eliminar al cliente{" "}
            <strong>
              {name.firstname} {name.lastname}
            </strong>
            . Esta acción no se puede deshacer. ¿Deseas continuar?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={cerrarModal} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={handleConfirmarEliminacion}
            color="error"
            variant="contained"
          >
            Sí, eliminar
          </Button>
        </DialogActions>
      </Dialog>
      <Snackbar
        open={alerta.abierta}
        autoHideDuration={2500}
        onClose={cerrarAlerta}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={cerrarAlerta}
          severity={alerta.gravedad}
          sx={{ width: "100%" }}
        >
          {alerta.mensaje}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default DetalleCliente;
