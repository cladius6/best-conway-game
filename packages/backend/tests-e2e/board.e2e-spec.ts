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

  it('/ (GET) gets board correctly', () => {
    return request(app.getHttpServer()).get('/board').expect(200).expect([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]);
  });

  it('/resize (POST) resize the board correctly', () => {
    request(app.getHttpServer()).post('/board/resize').send({size: 5}).expect(200);
  });

});
