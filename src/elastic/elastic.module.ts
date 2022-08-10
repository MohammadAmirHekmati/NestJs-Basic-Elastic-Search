import {DynamicModule, Module} from '@nestjs/common';
import {ElasticConnectionService} from "./services/elastic-connection.service";
import {ElasticSearchService} from "./services/elastic-search.service";

@Module({})
export class ElasticModule {
    static register():DynamicModule{
        return {
            module:ElasticModule,
            providers:[ElasticConnectionService,ElasticSearchService],
            global:true,
            exports:[ElasticSearchService,ElasticConnectionService]
        }
    }
}
