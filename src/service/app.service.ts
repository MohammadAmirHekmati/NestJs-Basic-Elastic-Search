import { SearchHit, SearchResponse } from '@elastic/elasticsearch/lib/api/types';
import {  BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { NotFoundError } from 'rxjs';
import { EsCreateUser } from '../dto/es-create-user.dto';
import { EsMatchResponse } from '../dto/es-search-response';

@Injectable()
export class AppService {
  constructor(private elasticSearchService:ElasticsearchService)
    {}
    
  async createIndex(indexName:string)
  {
    const checkIndex=await this.elasticSearchService.indices.exists({index:indexName})

      if (!checkIndex) {
        const createIndex=await this.elasticSearchService.indices.create({index:indexName})
        return createIndex
      }
      
      if (checkIndex) {
        throw new ConflictException("Index Already exist")
      }
  }

  async createUser(indexName:string,esCreateUserDto:EsCreateUser)
  {
    const checkIndexExist=await this.elasticSearchService.indices.exists({index:indexName})
    if(checkIndexExist)
    {
     const createUser=new EsCreateUser()
     createUser.name=esCreateUserDto.name
     createUser.age=esCreateUserDto.age
     const saveCreatedUser=await this.elasticSearchService.index({index:indexName,body:createUser})
     return saveCreatedUser
    }
  
    if (!checkIndexExist) 
    throw new NotFoundException("Index Not Exist")
  }

  async searchBetweenAges(minAge:number,maxAge:number)
  {
    const search=await this.elasticSearchService.search({index:"posts",from:0,size:1000,query:{
      range:{
        age:{
          gte:minAge,
          lte:maxAge
        }}}
    })
    return search.hits.hits
  }

  async findByAge(age:number)
  {
    const findMatch=await this.elasticSearchService.search({index:"posts",query:{
      match:{
        age:age
      }
    }})
    return findMatch.hits.hits
  }

  async deleteByAge(age:number)
  {
    const deleteUsersWithIds=await this.elasticSearchService.deleteByQuery({index:"posts",query:{
      match:{
        age:1005
      }
    }})

    return deleteUsersWithIds
  }

  async insertFakeData()
  {
    for (let i = 0; i < 10000; i++) {
      const user:EsCreateUser=
      {
      name:`mamad_${i}`,
      age:i
      }
      const insertFakeData=await this.elasticSearchService.index({index:"posts",body:user})  
      console.log(insertFakeData._seq_no);
    }
    
  }

}
