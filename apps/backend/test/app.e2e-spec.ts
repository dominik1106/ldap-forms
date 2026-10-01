import { Test, type TestingModule } from '@nestjs/testing';
import type { INestApplication } from '@nestjs/common';
import request from 'supertest';
import type { App } from 'supertest/types.js';
import type { HealthResponse } from '@ldap-forms/shared';
import { AppModule } from '../src/app.module.js';
import { configureApp } from '../src/configure-app.js';

describe('App (e2e)', () => {
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    configureApp(app);
    await app.init();
  });

  it('GET /api/health', async () => {
    const res = await request(app.getHttpServer())
      .get('/api/health')
      .expect(200);

    const body = res.body as HealthResponse;
    expect(body.status).toBe('ok');
  });

  afterEach(async () => {
    await app.close();
  });
});
