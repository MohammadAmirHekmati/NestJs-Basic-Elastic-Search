import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { AppController } from './controllers/app.controller';
import { AppService } from './service/app.service';
import {ElasticModule} from "../elastic/elastic.module";

@Module({
  imports:[ElasticModule.register()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

