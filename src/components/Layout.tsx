import type { ReactNode } from 'react';
import { NavBar } from './NavBar';

export const Layout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<NavBar />
			<main>{children}</main>
			<style jsx>{`
				main {
					padding: 20px 35px;
				}
			`}</style>
		</>
	);
};
