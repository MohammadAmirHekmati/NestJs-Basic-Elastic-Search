import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { AppController } from './controllers/app.controller';
import { AppService } from './service/app.service';

@Module({
  imports:[ElasticsearchModule.register({
    node:"http://localhost:9200",
    
    maxRetries:10,
    requestTimeout:60000,
    auth:{
      username:"elastic",
      password:""
    }
})],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
