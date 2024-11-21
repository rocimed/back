import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppConfig } from './app.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigKeys } from './common/enum/configkeys.enum';
import { join } from 'path';
import { MesasModule } from './mesas/mesas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { BebidasModule } from './bebidas/bebidas.module';
import { ComandaModule } from './comanda/comanda.module';
import { DetalleComandaModule } from './detalle-comanda/detalle-comanda.module';

@Module({
  imports: [
    ConfigModule.forRoot(AppConfig),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (_configService: ConfigService) => ({
        type: 'mssql',
        host: _configService.get<string>(ConfigKeys.MSS_HOST),
        port: +_configService.get<string>(ConfigKeys.MSS_PORT),
        username: _configService.get<string>(ConfigKeys.MSS_USERNAME),
        password: _configService.get<string>(ConfigKeys.MSS_PASSWORD),
        database: _configService.get<string>(ConfigKeys.MSS_DATABASE),
        synchronize: false,
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        options: {
          encrypt: false,
        },
      }),
    }),
    MesasModule,
    UsuariosModule,
    BebidasModule,
    ComandaModule,
    DetalleComandaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
