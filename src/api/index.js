import projectRoutes from "./routes/projects";

export default (app) => {
    app.use('/api/projects', projectRoutes);
};