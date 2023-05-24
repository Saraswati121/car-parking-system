import React ,{useState,useEffect} from 'react'
import axios from 'axios'
import { Navbar } from './Navbar'
import { Grid, Paper,Typography,useTheme, TextField, Button,  FormControl,
  InputLabel,
  MenuItem,
  Select,} from "@mui/material";

export const User = () => {
  const theme = useTheme();
  const [selectplace, setSelectplace] = useState([]);
  const [selectedPlace,setSelectedPlace] = useState("");
  const [pincode, setPincode] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [duration, setDuration] = useState(0);
  const [cumulativePrice, setCumulativePrice] = useState(0);
  //console.log(selectedPlace)

  useEffect(() => {
    axios.get('http://localhost:8080/parkingPlace')
    .then((response) =>setSelectplace(response.data))
    .catch((err) => console.log("error", err))
  },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlace.place || !pincode || !vehicleType || !duration) {
      alert('Please fill in all the details');
      return;
    }
    if (isNaN(pincode) || pincode.length !== 6) {
      alert('Please enter a valid pincode');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8080/users/servicesRequest',
        {place: selectedPlace.place,pincode,vehicleType, duration: parseInt(duration) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //console.log(response.data);
    } catch (error) {
      if (error.response && error.response.data.message) {
        alert(error.response.data.message);
      } else {
        console.error('Error:', error);
      }
    }
  };

  const totalPrice = (e) => {
    const durationValue = parseInt(e);
    setDuration(durationValue);
    if (vehicleType === "fourWheelers") {
      setCumulativePrice(parseInt(selectedPlace.fourWheelersprice) * durationValue);
    } else {
      setCumulativePrice(parseInt(selectedPlace.twoWheelersprice) * durationValue);
    }
  };
  
 console.log(typeof(duration))

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
                 <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel id="vehicle-type-label" >Select Place</InputLabel>
                  <Select
                    labelId="vehicle-type-label"
                    id="vehicle-type-select"
                    value={selectedPlace}
                    onChange={(e) => setSelectedPlace(e.target.value)}
                    label="Vehicle Type"
                    sx={{
                      "& .MuiOutlinedInput-input": {
                        color: "white",
                        fontSize: "22px",
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
                  {selectplace && selectplace.map((e)=>{
                    return (
                      <MenuItem key={e._id} value={e}>{e.place}</MenuItem>
                    )
                  })}
                  </Select>
                </FormControl>
                  <TextField
                  type="number"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
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
                  type="time"
                  placeholder="Duration"
                  value={duration}
                  // onChange={(e) => setDuration(e.target.value)}
                  onChange={(e) => totalPrice(e.target.value)}
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
                <h2>Price :{cumulativePrice} </h2>
                <Button type="submit" variant="contained" color="primary" 
                 sx={{
                  fontSize: '1.2rem',
                  padding: '10px 20px',
                  minWidth: '200px',
                  color:"#f2c542",
                  marginTop:"10px"
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