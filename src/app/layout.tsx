// src/app/layout.tsx
import type { Metadata, Viewport } from 'next';
import './globals.css'; // Asegúrate de que tus estilos globales estén importados

// Opcional: Si estás usando una fuente específica como 'Segoe UI' y quieres optimizarla con next/font
// import { Segoe_UI } from 'next/font/google';
// const segoe = Segoe_UI({ subsets: ['latin'], weight: ['300', '400', '700'] });

export const metadata: Metadata = {
  title: 'Prod-UIBO - Reloj de Productividad Inteligente',
  description: 'Maximiza tu enfoque y gestiona tu tiempo eficazmente con Prod-UIBO, tu reloj de productividad personalizable.',
  applicationName: 'Prod-UIBO',
  keywords: ['productividad', 'reloj', 'temporizador', 'gestión del tiempo', 'enfoque', 'UIBO', 'Prod-UIBO', 'timer', 'pomodoro'],
  authors: [{ name: 'Tu Nombre o Nombre de tu Equipo', url: 'https://tu-web.com' }], // Personaliza esto
  creator: 'Tu Nombre o Nombre de tu Equipo', // Personaliza esto
  publisher: 'Tu Nombre o Nombre de tu Equipo', // Personaliza esto
  // Favicon y otros iconos
  icons: {
    icon: '/prod-iubo.png', // Favicon principal (usará tu PNG)
    shortcut: '/prod-iubo.png', // Para navegadores más antiguos
    apple: '/prod-iubo.png', // Para Apple Touch Icon (cuando se añade a la pantalla de inicio en iOS)
    // other: { // Si tuvieras otros iconos para propósitos específicos
    //   rel: 'android-chrome-192x192',
    //   url: '/android-chrome-192x192.png',
    // },
  },
  // Open Graph (para compartir en redes sociales como Facebook, LinkedIn)
  openGraph: {
    type: 'website',
    url: 'https://tu-dominio-prod-uibo.com', // Reemplaza con la URL de tu sitio cuando lo despliegues
    title: 'Prod-UIBO - Reloj de Productividad Inteligente',
    description: 'Maximiza tu enfoque y gestiona tu tiempo eficazmente con Prod-UIBO.',
    siteName: 'Prod-UIBO',
    images: [
      {
        url: '/prod-iubo.png', // Imagen que se mostrará al compartir. Idealmente una imagen más grande y descriptiva.
        width: 256, // Ancho de tu prod-iubo.png (ajústalo si es diferente)
        height: 256, // Alto de tu prod-iubo.png (ajústalo si es diferente)
        alt: 'Logo de Prod-UIBO',
      },
    ],
  },
  // Twitter Card (para compartir en Twitter)
  twitter: {
    card: 'summary', // o 'summary_large_image' si tu imagen es más grande y quieres que destaque
    // site: '@tuUsuarioTwitter', // Opcional: tu usuario de Twitter
    // creator: '@tuUsuarioCreadorTwitter', // Opcional: usuario del creador
    title: 'Prod-UIBO - Reloj de Productividad Inteligente',
    description: 'Maximiza tu enfoque y gestiona tu tiempo eficazmente con Prod-UIBO.',
    images: ['/prod-iubo.png'], // URL de la imagen para la Twitter card
  },
  // Robots: Controla cómo los motores de búsqueda rastrean tu sitio
  // robots: { // Descomenta y ajusta según tus necesidades de SEO
  //   index: true,
  //   follow: true,
  //   nocache: false,
  //   googleBot: {
  //     index: true,
  //     follow: true,
  //     noimageindex: false,
  //     'max-video-preview': -1,
  //     'max-image-preview': 'large',
  //     'max-snippet': -1,
  //   },
  // },
  // manifest: '/site.webmanifest', // Si tienes un archivo de manifiesto PWA
};

// Opcional: Configuración del Viewport para responsividad y tema de color
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, // Puedes ajustar esto si necesitas zoom
  themeColor: [ // Colores para la barra de direcciones del navegador
    { media: '(prefers-color-scheme: light)', color: '#f0f0f0' }, // Color para tema claro
    { media: '(prefers-color-scheme: dark)', color: '#1a1a1a' },  // Color para tema oscuro (el de tu app)
  ],
  colorScheme: 'dark light', // Indica que tu sitio soporta ambos esquemas
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      {/*
        <body className={segoe.className}> // Si usas next/font
      */}
      <body>
        {children}
      </body>
    </html>
  );
}