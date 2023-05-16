import React from 'react'
import { Navbar } from './Navbar'
import { Grid, Paper,Typography,useTheme } from "@mui/material";

export const User = () => {
  const theme = useTheme();
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
      </div>
    </div>
  )
}
