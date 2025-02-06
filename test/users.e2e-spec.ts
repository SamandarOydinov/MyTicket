import { INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

describe('User (e2e)', () => {
  let app: INestApplication;
  let token: String;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe());
    await app.init();
    const response = await request(app.getHttpServer())
      .post('/auth/signin')
      .send({
        email: 's123@gmail.com',
        password: '123456',
        value: 'superAdmin',
      });
    token = response.body.token;
    console.log('token', token);
  });
  it('/users (GET) --> 200 OK', async () => {
    console.log('request: ', request);
    return await request(app.getHttpServer())
      .get('/users')
      .set('Authorization', `Bearer ${token}`)
      .expect('Content-Type', /json/) // Regex orqali tekshirish
      .expect(200);
  });

  it('/users (GET) --> 401 "Unauthorized" error', () => {
    console.log('request: ', request);
    return (
      request(app.getHttpServer())
        .get('/users')
        // .set('Authorization', `Bearer ${token}`)
        .expect('Content-Type', /json/) // Regex orqali tekshirish
        .expect(401)
    );
  });

  // it('/auth/signup (POST) --> 201 OK', () => {
  //   return (
  //     request(app.getHttpServer())
  //       .post('/auth/signup')
  //       .send({
  //         name: 'l1',
  //         email: 'l1@gmail.com',
  //         password: '123456',
  //         value: 'superAdmin',
  //       })
  //       // .set('Authorization', `Bearer ${token}`)
  //       .expect('Content-Type', /json/)
  //       .expect(201)
  //       .then((response) => {
  //         // console.log('response body: ', response.body);
  //         expect(response.body).toMatchObject({
  //           token: expect.any(String),
  //         });
  //       })
  //   );
  // });

  // it('/auth/signup (POST) --> 400', async () => {
  //   return await request(app.getHttpServer())
  //     .post('/auth/signup')
  //     .send({
  //       name: 'u',
  //       email: 'u@gmail.com',
  //       password: '123456',
  //       value: 'superAdmin',
  //     })
  //     // .set('Authorization', `Bearer ${token}`)
  //     .expect('Content-Type', /json/) // Regex orqali tekshirish
  //     .expect(201)
  //     .then((response) => {
  //       expect(response.body).toMatchObject({
  //         token: expect.any(String),
  //       });
  //     });
  // });

  // it('/auth/signup (POST) --> 400 on Validation error', () => {
  //   return request(app.getHttpServer())
  //     .post('/auth/signup')
  //     .send({
  //       name: 'u',
  //       email: 'u@gmail.com',
  //       password: '123456',
  //       value: 'superAdmin',
  //     })
  //     // .set('Authorization', `Bearer ${token}`)
  //     .expect('Content-Type', /json/) // Regex orqali tekshirish
  //     .expect(400)
  //     .expect({
  //         statusCode: 400,
  //         message: ["password is not strong enough"],
  //         error : "Bad Request",
  //       });
  // });

  afterAll(async () => {
    await app.close();
  });
});
