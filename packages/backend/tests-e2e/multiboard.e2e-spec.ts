import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import {MultiBoardModule} from "../src/app/multiboard/multiboard.module";

describe('MultiboardController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [MultiBoardModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/1 (GET) gets board with id correctly', async () => {
    await request(app.getHttpServer()).put('/multiboard').send({row: 5, col: 5});
    const response = await request(app.getHttpServer()).get('/multiboard/1');
    console.log(response.body);
    expect(response.body).toEqual({
      id: "1",
      board: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]
    })
  });

  it('/cell/1 (PUT) updates board with id correctly', async () => {
    await request(app.getHttpServer()).put('/multiboard').send({row: 5, col: 5});
    const response = await request(app.getHttpServer()).put('/multiboard/1').send({row: 5, col: 5});
    console.log(response.body);
    expect(response.body).toEqual({
      id: "1",
      board: [
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0],
      ]
    })
  });

});
