// jest.config.js
module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom", // Para pruebas en el navegador
    setupFilesAfterEnv: ["<rootDir>/setupTests.ts"], // Configuración adicional
  };