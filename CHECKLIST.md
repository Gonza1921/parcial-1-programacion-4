# Lista de Verificación del Proyecto Integrador

## Backend (FastAPI + SQLModel)

- [x] Entorno: Uso de .venv, requirements.txt y FastAPI funcionando en modo dev
- [x] Modelado: Tablas creadas con SQLModel incluyendo relaciones Relationship (1:N y N:N)
- [x] Validación: Uso de Annotated, Query y Path para reglas de negocio
- [x] CRUD Persistente: Endpoints funcionales para Crear, Leer, Actualizar y Borrar en PostgreSQL
- [x] Seguridad de Datos: Implementación de response_model para no filtrar datos sensibles
- [x] Estructura: Código organizado por módulos (routers, schemas, services, models)

## Frontend (React + TypeScript + Tailwind)

- [x] Setup: Proyecto creado con Vite + TS y estructura de carpetas limpia
- [x] Componentes: Uso de componentes funcionales y Props debidamente tipadas
- [x] Estilos: Interfaz construida íntegramente con Tailwind CSS 4
- [x] Navegación: Configuración de react-router-dom con rutas (/categorias, /productos, /ingredientes)
- [x] Estado Local: Uso de useState para manejo de formularios y UI interactiva

## Integración y Server State

- [x] Lectura (useQuery): Listados consumiendo datos reales de la API
- [x] Escritura (useMutation): Formularios que envían datos al backend con éxito
- [x] Sincronización: Uso de invalidateQueries para refrescar la UI tras cambios
- [x] Feedback: Gestión visual de "Cargando..." y "Error" en peticiones

## Módulos a realizar

- [x] Backend: Categoría, Producto, Ingrediente, ProductoIngrediente
- [x] Frontend: Páginas para Categorías, Productos, Ingredientes
- [x] Cada módulo tiene tabla con botones de acciones
- [x] Cada módulo tiene modal con formulario de alta y edición

## Video de Presentación

- [ ] Duración: El video dura 15 minutos o menos
- [ ] Audio/Video: La voz es clara y la resolución permite leer código
- [ ] Demo: Se muestra flujo completo desde creación hasta persistencia
- [ ] Explicación técnica: Se justifican decisiones de código
