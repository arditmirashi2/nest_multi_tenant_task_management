import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import entities from 'src/entities';
import { TenantMiddleware } from './middlewares/tenant.middleware';
import { RouterModule } from '@nestjs/core';

interface DatabaseConfiguration {
  host: string,
  port: number,
  username: string,
  password: string, 
  name: string
}

console.log(`${process.cwd()}/.env.${process.env.NODE_ENV}`)

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${process.cwd()}/.env`],
      load: [configuration]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const databaseConfiguration = configService.get<DatabaseConfiguration>("database");
        console.log(databaseConfiguration)
        return {
          type: 'postgres',
          host: databaseConfiguration.host,
          port: databaseConfiguration.port,
          username: databaseConfiguration.username,
          password: databaseConfiguration.password,
          database: databaseConfiguration.name,
          entities,
          synchronize: true,
        }
      },
      inject: [ConfigService],
    }),
    RouterModule.register([
      {
        path: "tenants/:tenantId",
        module: ProjectsModule
      },
      {
        path: "tenants/:tenantId/projects/:projectId",
        module: TasksModule
      }
    ]),
    ProjectsModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(TenantMiddleware)
      .forRoutes('');
  }
}
