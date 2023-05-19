import React ,{useState} from 'react'
import axios from 'axios'
import { Navbar } from './Navbar'
import { Grid, Paper,Typography,useTheme, TextField, Button,  FormControl,
  InputLabel,
  MenuItem,
  Select,} from "@mui/material";

export const User = () => {
  const theme = useTheme();
  const [place, setPlace] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [duration, setDuration] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8080/users/servicesRequest',
        { place, vehicleType, duration },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error.response);
    }
  };

  const styles = {
    titlePaper: {
      marginTop:"28px",
      textAlign: "center",
      alignItems: "center",
      position: "relative",
      backgroundColor: theme.palette.primary.dark,
  }
}
  return (
    <div>
      <Navbar/>
      <div>
      <Grid container alignItems="center" justifyContent="center">
                    <Grid item xs={12} sm={12}>
                        <Paper sx={{ ...styles.titlePaper, color: "yellow" }}>
                            <Typography variant="h4" >
                                Search & Book a Slot
                            </Typography>
                        </Paper>
                    </Grid>
        </Grid>
        <Grid container alignItems="center" justifyContent="center">
                    <Grid item xs={12} sm={12}>
                        <Paper sx={{ ...styles.titlePaper, color: "white" }}>
                            <Typography variant="h4" >
                                Select Vehicle Type
                            </Typography>
                        </Paper>
                    </Grid>
        </Grid>

        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} sm={6}>
            <Paper sx={{ ...styles.titlePaper ,color: "white",padding: "20px"}}><br/>
              <Typography variant="h4">Request Service</Typography><br/>
              <form onSubmit={handleSubmit}>
                <TextField
                  type="text"
                  placeholder="Place"
                  value={place}
                  onChange={(e) => setPlace(e.target.value)}
                  fullWidth
              margin="normal"
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-input": {
                  color: "white",
                  fontSize: "20px",
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                    color: "white",
                  },
                },
              }}
                />
             <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel id="vehicle-type-label" >Vehicle Type</InputLabel>
                  <Select
                    labelId="vehicle-type-label"
                    id="vehicle-type-select"
                    value={vehicleType}
                    onChange={(e) => setVehicleType(e.target.value)}
                    label="Vehicle Type"
                    sx={{
                      "& .MuiOutlinedInput-input": {
                        color: "white",
                        fontSize: "20px",
                      },
                      "& .MuiInputLabel-root": {
                        color: "white",
                      },
                      "& .MuiOutlinedInput-root": {
                        "& fieldset": {
                          borderColor: "white",
                          color: "white",
                        },
                      },
                    }}
                  >
                    <MenuItem value="twoWheelers">Two Wheeler</MenuItem>
                    <MenuItem value="fourWheelers">Four Wheeler</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  type="text"
                  placeholder="Duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  fullWidth
              margin="normal"
              variant="outlined"
                     sx={{
                "& .MuiOutlinedInput-input": {
                  color: "white",
                  fontSize: "20px",
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                    color: "white",
                  },
                },
              }}
                />
                <Button type="submit" variant="contained" color="primary" 
                 sx={{
                  fontSize: '1.2rem',
                  padding: '10px 20px',
                  minWidth: '200px',
                  color:"#f2c542",
                  marginTop:"10px"
                }}
                 onClick={() => {
                 alert('Data Submitted');
                }}>
                  Submit
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  )
}