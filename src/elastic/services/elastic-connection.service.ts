import {Client} from "@elastic/elasticsearch";

export const elasticConstant = "ELASTIC_SEARCH_CLIENT"
export const ElasticConnectionService = {
    provide: elasticConstant,
    useFactory: () => {
        const client = new Client({
                node: "http://localhost:9200",
                auth: {
                    username: "elastic",
                    password: "1Mwy_vm1WBxz-ytzaWyS"
                }
            }
        )
        return client
    }
}