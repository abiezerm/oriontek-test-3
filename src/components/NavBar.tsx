import { AppBar, Toolbar, Typography } from '@mui/material';
import Box from '@mui/material/Box';

export function NavBar() {
	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						Company X
					</Typography>
				</Toolbar>
			</AppBar>
		</Box>
	);
}
