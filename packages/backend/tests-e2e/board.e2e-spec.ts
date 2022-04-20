import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { BoardModule } from  '../src/app/board/board.module';

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
    const response = await request(app.getHttpServer()).put('/board/cell').send({row: 1, col: 1})
    expect(response.status).toBe(200);
  });

  it('/ (GET) gets board correctly after setting cell', async () => {
    await request(app.getHttpServer()).post('/board/resize').send({size: 5});
    await request(app.getHttpServer()).put('/board/cell').send({row: 1, col: 1})
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

  it('/tick (GET) gets board correctly after tick', async () => {
    await request(app.getHttpServer()).post('/board/resize').send({size: 5});
    await request(app.getHttpServer()).put('/board/cell').send({row: 1, col: 2})
    await request(app.getHttpServer()).put('/board/cell').send({row: 1, col: 0})
    await request(app.getHttpServer()).put('/board/cell').send({row: 1, col: 1})
    await request(app.getHttpServer()).put('/board/cell').send({row: 2, col: 1})
    await request(app.getHttpServer()).put('/board/cell').send({row: 3, col: 2})
    let response = await request(app.getHttpServer()).get('/board');
    console.log(response.body)
    const response2 = await request(app.getHttpServer()).get('/board/tick');
    console.log(response2.body)
    expect(response2.body).toEqual([
      [0, 0, 0, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 1, 1, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0]
    ])
  });

  it('/resize (POST) should fail if size is negative', async () => {
    const response = await request(app.getHttpServer()).post('/board/resize').send({size: -5});
    expect(response.status).toBe(400);
  });

  it('/resize (POST) should fail if size is not a number', async () => {
    const response = await request(app.getHttpServer()).post('/board/resize').send({size: 'a'});
    expect(response.status).toBe(400);
  });

  it('/resize (POST) should fail if size is not an integer', async () => {
    const response = await request(app.getHttpServer()).post('/board/resize').send({size: 1.5});
    expect(response.status).toBe(400);
  });

  it('/cell (PUT) should fail if x is negative', async () => {
    const response = await request(app.getHttpServer()).put('/board/cell').send({x: -1, y: 1});
    expect(response.status).toBe(400);
  });

  it('/cell (PUT) should fail if x is not a number', async () => {
    const response = await request(app.getHttpServer()).put('/board/cell').send({x: 'a', y: 1});
    expect(response.status).toBe(400);
  });

  it('/cell (PUT) should fail if x is not an integer', async () => {
    const response = await request(app.getHttpServer()).put('/board/cell').send({x: 1.5, y: 1});
    expect(response.status).toBe(400);
  });
});
