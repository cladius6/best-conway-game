import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BoardModule } from  '../src/app/board/board.module';
import exp = require("constants");

describe('BoardController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [BoardModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET) gets board correctly', async () => {
    const response = await request(app.getHttpServer()).get('/board');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ])
  });

  it('/resize (POST) resize the board correctly', async () => {
    const response = await request(app.getHttpServer()).post('/board/resize').send({size: 5});
    expect(response.status).toBe(201);
  });

  it('/ (GET) gets resize board correctly', async () => {
    await request(app.getHttpServer()).post('/board/resize').send({size: 5});
    const response = await request(app.getHttpServer()).get('/board');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]]
    )
  });

  it('/ (PUT) sets cell correctly', async () => {
    const response = await request(app.getHttpServer()).put('/board/cell').send({x: 1, y: 1})
    expect(response.status).toBe(200);
  });

  it('/ (GET) gets board correctly after setting cell', async () => {
    await request(app.getHttpServer()).post('/board/resize').send({size: 5});
    await request(app.getHttpServer()).put('/board/cell').send({x: 1, y: 1})
    const response = await request(app.getHttpServer()).get('/board');
    console.log(response.body)
    expect(response.status).toBe(200);
    expect(response.body).toEqual([
      [0, 0, 0, 0, 0],
      [0, 1, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ])
  });

});
