import React from "react";
// import logo from "../../assets/icons/logo.png";
import {
  createStyles,
  makeStyles,
  withStyles,
  Theme,
} from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import InputBase from "@material-ui/core/InputBase";

const BootstrapInput = withStyles((theme: Theme) =>
  createStyles({
    root: {
      "label + &": {
        marginTop: theme.spacing(3),
      },
    },
    input: {
      borderRadius: 4,
      position: "relative",
      backgroundColor: theme.palette.background.paper,
      border: "1px solid #ced4da",
      fontSize: 16,
      padding: "10px 26px 10px 12px",
      transition: theme.transitions.create(["border-color", "box-shadow"]),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:focus": {
        borderRadius: 4,
        borderColor: "#80bdff",
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.25)",
      },
    },
  })
)(InputBase);

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    margin: {
      margin: theme.spacing(1),
    },
  })
);

export default function CustomizedSelects() {
  const classes = useStyles();
  const [age, setAge] = React.useState("Etherium");
  const [count, setCount] = React.useState(0);
  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setAge(event.target.value as string);
  };
  function handelInput(e:any) {
    setCount(e.target.value)
  }
  return (
    <div >
      <FormControl className={classes.margin}>
        <InputLabel id="demo-customized-select-label">Crypto</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          placeholder={age}
          value={age}
          style={{width:"10rem"}}
          onChange={handleChange}
          input={<BootstrapInput />}
        >
           {/*<MenuItem value="">
            <em>Select</em>
             </MenuItem>*/}
        
          <MenuItem value={"ChromeScan"} >ChromeScan</MenuItem>
          <MenuItem value={"Etherium"}>Etherium</MenuItem>
          <MenuItem value={"Bit-Torrent"}>Bit-Torrent</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.margin}>
        
        <InputLabel htmlFor="demo-customized-textbox">Receiver Address</InputLabel>
        <BootstrapInput id="demo-customized-textbox" style={{width:"11rem"}} placeholder="0" value={count} onChange={handelInput}/>
      </FormControl>
      <p style={{fontSize:".85rem"}}>{count} {age} available to swap.</p>
    </div>
  );
}
