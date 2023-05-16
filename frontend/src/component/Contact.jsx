import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { Button, TextField, useTheme, Grid, Paper } from "@mui/material";

export const Contact = () => {
  const theme = useTheme();
  const [formData, setFormData] = useState("");
  const styles = {
    mainCont: {
      marginTop: "5em",
      width: "auto",
      marginBottom: "5em",
      padding: "2em",
    },
    paper: {
      padding: "2em",
      background: theme.palette.primary.dark,
      color: "white",
    },
    listItemText: {
      padding: "3px",
    },
    formContainer: {
      marginTop: "1rem",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "70%",
      margin: "auto",
      "@media (max-width : 500px)": {
        width: "100%",
      },
    },
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };
  return (
    <div>
      <Navbar />
      <div className="about">
        <Grid item xs={12} sm={6}>
          <Paper
            sx={{
              padding: "1em",
              borderRadius: "20px",
              boxShadow: "10px 5px 5px darkviolet",
            }}
          >
            <form
              autoComplete="off"
              noValidate
              sx={styles.form}
              onSubmit={handleSubmit}
            >
              <Grid container sx={styles.formContainer} spacing={2}>
                <Grid item sm={12} xs={12} sx={styles.ipFields}>
                  <TextField
                    name="firstName"
                    type="text"
                    variant="outlined"
                    required
                    fullWidth
                    label="Enter Your first name"
                    onChange={handleChange}
                    value={formData.firstName}
                  />
                </Grid>
                <Grid item sm={12} xs={12} sx={styles.ipFields}>
                  <TextField
                    name="lastName"
                    type="text"
                    variant="outlined"
                    required
                    fullWidth
                    label="Enter Your last name"
                    onChange={handleChange}
                    value={formData.lastName}
                  />
                </Grid>
                <Grid item sm={12} xs={12} sx={styles.ipFields}>
                  <TextField
                    name="country"
                    type="text"
                    variant="outlined"
                    required
                    fullWidth
                    label="Enter Your Country name"
                    onChange={handleChange}
                    value={formData.country}
                  />
                </Grid>
                <Grid item sm={12} xs={12} sx={styles.ipFields}>
                  <TextField
                    name="feedback"
                    type="text"
                    variant="outlined"
                    required
                    fullWidth
                    multiline
                    label="Enter Your Feedback"
                    onChange={handleChange}
                    rows={6}
                    value={formData.feedback}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    sx={{ padding: "1em", fontWeight: "bold" }}
                    variant="contained"
                    type="submit"
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </div>
    </div>
  );
};
