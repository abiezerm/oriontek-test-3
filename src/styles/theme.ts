import { ThemeOptions, createTheme } from '@mui/material/styles';

export const darkThemeOptions: ThemeOptions = {
	palette: {
		mode: 'dark'
	}
};

export const theme = createTheme(darkThemeOptions);
