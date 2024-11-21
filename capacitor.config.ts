import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'RegistrAPP',
  webDir: 'www',
  plugins: {
    BarcodeScanner: {
      cameraFacing: 'back', // Usa la cámara trasera, si deseas cambiar a la cámara delantera, usa 'front'
      enableFlashOnScan: false, // Si deseas habilitar/deshabilitar el flash en el escaneo
    },
  },
};

export default config;
