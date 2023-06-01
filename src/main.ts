import express from 'express';
import cors from 'cors';
import { AdminRouter } from './routes/admin.route';
import { EmployeeRouter } from './routes/employee.route';
import { config as Env } from './utilities/config';
import { AuthRouter } from './routes/auth.router';
import { generalRoutes } from './routes/general.routes';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/', generalRoutes);
app.use('/auth', AuthRouter);
app.use('/admin', AdminRouter);
app.use('/employee', EmployeeRouter);

app.listen(Env.PORT, () => {
    console.log(`Server running on port ${Env.PORT} ... `);
});
