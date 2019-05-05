import projectRoutes from "./routes/projects";
import literatureRoutes from "./routes/literature";

export default (app) => {
    app.use('/api/projects', projectRoutes);
    app.use('/api/literature', literatureRoutes);
};