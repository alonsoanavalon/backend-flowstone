import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ReportModule } from './report/report.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://jacaton:3c4j6ro8w09Q1zX5@dbaas-db-6569546-9c4d19ba.mongo.ondigitalocean.com/admin?replicaSet=dbaas-db-6569546&tls=true&authSource=admin'),
    ReportModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
