import React from "react";
import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import Visibility from "@material-ui/icons/Visibility";
import InputAdornment from "@material-ui/core/InputAdornment";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import Input from "@material-ui/core/Input";

const ShowAndHidePassword = () => {
const [values, setValues] = React.useState({
	password: "",
	showPassword: false,
});

const handleClickShowPassword = () => {
	setValues({ ...values, showPassword: !values.showPassword });
};

const handleMouseDownPassword = (event) => {
	event.preventDefault();
};

// const handlePasswordChange = (prop) => (event) => {
// 	setValues({ ...values, [prop]: event.target.value });
// };

return (
	<div
	style={{
		marginLeft: "30%",
	}}
	>
	<h4>How to show and hide password in ReactJS?</h4>
	<InputLabel htmlFor="standard-adornment-password">
		Enter your Password
	</InputLabel>
	<Input
		type={values.showPassword ? "text" : "password"}
		// onChange={handlePasswordChange("password")}
		value={values.password}
		endAdornment={
		<InputAdornment position="end">
			<IconButton
			onClick={handleClickShowPassword}
			onMouseDown={handleMouseDownPassword}
			>
			{values.showPassword ? <Visibility /> : <VisibilityOff />}
			</IconButton>
		</InputAdornment>
		}
	/>
	</div>
);
};

export default ShowAndHidePassword;
