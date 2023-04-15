import { Layout } from '@/components/Layout';
import '@/styles/globals.css';
import { theme } from '@/styles/theme';
import { createEmotionCache } from '@/utils/create-emotion-cache';
import { CacheProvider, EmotionCache } from '@emotion/react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { ConfirmProvider } from 'material-ui-confirm';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { Toaster } from 'sonner';

const clientSideEmotionCache = createEmotionCache();

export interface CustomAppProps extends AppProps {
	emotionCache?: EmotionCache;
}

export default function App({
	Component,
	emotionCache = clientSideEmotionCache,
	pageProps
}: CustomAppProps) {
	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Toaster richColors position="top-right" />
				<ConfirmProvider>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ConfirmProvider>
			</ThemeProvider>
		</CacheProvider>
	);
}
