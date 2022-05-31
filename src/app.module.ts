import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { TenantModule } from './tenants/tenants.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import configuration from './config/configuration';
import entities from './entities';
import { TenantMiddleware } from './middlewares/tenant.middleware';

interface DatabaseConfiguration {
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
}

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        `${process.cwd()}/.${String(process.env.NODE_ENV).trim()}.env`,
      ],
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const databaseConfiguration =
          configService.get<DatabaseConfiguration>('database');

        return {
          type: 'postgres',
          host: databaseConfiguration.host,
          port: databaseConfiguration.port,
          username: databaseConfiguration.username,
          password: databaseConfiguration.password,
          database: databaseConfiguration.name,
          entities,
          synchronize: true,
        };
      },
      inject: [ConfigService],
    }),
    ProjectsModule,
    TasksModule,
    TenantModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TenantMiddleware).forRoutes('');
  }
}
