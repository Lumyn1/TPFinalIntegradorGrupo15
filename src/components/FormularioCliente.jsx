import { useState } from "react";
import axios from "axios"; 
import { 
  Box, 
  Button, 
  TextField, 
  Typography, 
  Paper, 
  Snackbar, 
  Alert 
} from "@mui/material";

export const FormularioCliente = ({ onClienteCreado }) => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
    phone: "",
    city: "",
    street : "",
    number : "",
    zipcode : "",
  });


  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [mensajeExito, setMensajeExito] = useState("");

 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const respuesta = await axios.post("https://fakestoreapi.com/users", {
        email: formData.email,
        username: formData.username,
        password: formData.password,
        name: {
          firstname: formData.firstname,
          lastname: formData.lastname
        },
        address: {
          city: formData.city,
          street: formData.street,
          number: formData.number,
          zipcode: formData.zipcode,
          geolocation: { lat: "0", long: "0" }
        },
        phone: formData.phone
      });

      if (respuesta.status === 200 || respuesta.status === 201) {
        const clientesGuardados = JSON.parse(localStorage.getItem("clientesNuevos")) || [];

        const idMasAlto = clientesGuardados.reduce(
          (max, c) => (c.id > max ? c.id : max),
          10
        );
        const idAsignado = idMasAlto + 1;

        const clienteCreado = {
          id: idAsignado,
          email: formData.email,
          username: formData.username,
          password: formData.password,
          name: {
            firstname: formData.firstname,
            lastname: formData.lastname,
          },
          address: {
            city: formData.city,
            street: formData.street,
            number: formData.number,
            zipcode: formData.zipcode,
            geolocation: { lat: "0", long: "0" },
          },
          phone: formData.phone,
        };

        if (onClienteCreado) {
          onClienteCreado(clienteCreado);
        }

        clientesGuardados.push(clienteCreado);
        localStorage.setItem("clientesNuevos", JSON.stringify(clientesGuardados));

        setMensajeExito(`¡Cliente creado exitosamente! ID asignado: ${idAsignado}`);
        setOpenSnackbar(true);

        setFormData({
          firstname: "", lastname: "", email: "", username: "", password: "", phone: "", city: "", street: "", zipcode: "", number: ""
        });
      }

    } catch (error) {
      console.error("Fallo en la petición POST:", error);
      alert("Hubo un error técnico al intentar registrar el cliente.");
    }
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') return;
    setOpenSnackbar(false);
  };

  return (
    <Paper sx={{ p: 3, mb: 4 }} elevation={2}>
      <Typography variant="h6" color="primary" gutterBottom>
        Alta de Nuevo Cliente 
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        <TextField label="Nombre" name="firstname" value={formData.firstname} onChange={handleChange} required size="small" />
        <TextField label="Apellido" name="lastname" value={formData.lastname} onChange={handleChange} required size="small" />
        <TextField label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required size="small" />
        <TextField label="Usuario" name="username" value={formData.username} onChange={handleChange} required size="small" />
        <TextField label="Contraseña" type="password" name="password" value={formData.password} onChange={handleChange} required size="small" />
        <TextField label="Teléfono" name="phone" value={formData.phone} onChange={handleChange} required size="small" />
        <TextField label="Ciudad" name="city" value={formData.city} onChange={handleChange} required size="small" />
        <TextField label="Calle" name="street" value={formData.street} onChange={handleChange} required size="small" />
        <TextField label="Número" name="number" value={formData.number} onChange={handleChange} required size="small" />
        <TextField label="Código Postal" name="zipcode" value={formData.zipcode} onChange={handleChange} required size="small" />
       

        <Button type="submit" variant="contained" color="success" sx={{ height: '40px', alignSelf: 'center' }}>
          Registrar Cliente
        </Button>
      </Box>

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={4000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
          {mensajeExito}
        </Alert>
      </Snackbar>
    </Paper>
  );
};