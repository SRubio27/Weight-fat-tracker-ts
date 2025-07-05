/client
├── /src                       # Código fuente principal del frontend
│   ├── /components            # Componentes reutilizables de la interfaz (botones, inputs, tarjetas, etc.)
│   ├── /pages                 # Vistas completas o pantallas (ej: Página de inicio, Perfil, Registro)
│   ├── /services              # Llamadas a la API (fetch/axios que comunican con el backend)
│   ├── /context               # Gestión de estado global (con React Context o Zustand)
│   ├── /utils                 # Funciones auxiliares (formateo, validaciones, helpers)
│   ├── /hooks                 # Hooks personalizados (useMeasure, useForm, etc.)
│   ├── App.tsx                # Componente raíz de la aplicación
│   └── main.tsx (o index.tsx) # Punto de entrada del frontend (monta React en el DOM)
├── /public                    # Archivos estáticos públicos (favicon, index.html, manifest.json)
├── package.json               # Dependencias y scripts del frontend
└── tsconfig.json              # Configuración de TypeScript para el frontend



/server
├── /src                       # Código fuente principal del backend
│   ├── /controllers           # Lógica que maneja las peticiones (ej: qué hacer cuando alguien llama a /measures)
│   ├── /routes                # Define las rutas del API y las conecta con los controladores
│   ├── /services              # Contiene la lógica de negocio (ej: cálculos, validaciones, etc.)
│   ├── /middlewares           # Funciones que se ejecutan entre la petición y el controlador (auth, logs, etc.)
│   ├── /utils                 # Funciones reutilizables (formateo de fechas, validadores, etc.)
│   ├── app.ts                 # Configuración principal de la app (Express, middlewares, rutas)
│   └── server.ts              # Punto de entrada del servidor (inicia la app en un puerto)
├── /prisma                    # Configuración de Prisma y el esquema de base de datos
│   ├── schema.prisma          # Modelo de datos usado por Prisma para generar el cliente
│   └── /migrations            # Carpeta generada por Prisma para gestionar cambios en la base de datos
├── package.json               # Dependencias y scripts del backend
└── tsconfig.json              # Configuración de TypeScript para el backend
