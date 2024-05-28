import request from 'supertest';
import app from '../app';
import sequelize from '../config/database';
import Phone from '../models/phoneModel';
import { phoneMock } from './test-helpers';

beforeAll(async () => {
  await sequelize.sync({ force: true });
});

afterAll(async () => {
  await sequelize.close();
});

describe('GET /api/phones', () => {
  it('should return an empty array initially', async () => {
    const response = await request(app).get('/api/phones');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should filter phones by name', async () => {
    const mockData = phoneMock();
    await Phone.create(mockData);
    const response = await request(app).get('/api/phones?name=test');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe(mockData.name);
  });
});

describe('GET /api/phones/:id', () => {
  it('should return a phone by id', async () => {
    const mockData = phoneMock({ name: 'test phone 1' });
    const phone = await Phone.create(mockData);
    const response = await request(app).get(`/api/phones/${phone.id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(mockData.name);
  });

  it('should return 404 if phone not found', async () => {
    const response = await request(app).get('/api/phones/999');
    expect(response.status).toBe(404);
  });
});

describe('POST /api/phones', () => {
  it('should create a new phone', async () => {
    const mockData = phoneMock();
    const response = await request(app).post('/api/phones').send(mockData);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(mockData.name);
  });
});

describe('Patch /api/phones/:id', () => {
  it('should update a phone name', async () => {
    const mockData = phoneMock({ name: 'test phone 1' });
    const phone = await Phone.create(mockData);
    const response = await request(app).patch(`/api/phones/${phone.id}`).send({ name: 'updated phone' });
    expect(response.status).toBe(200);
    expect(response.body.name).toBe('updated phone');
    expect(response.body.storage_size).toBe(phone.storage_size);
  });

  it('should return 404 if phone not found', async () => {
    const response = await request(app).patch('/api/phones/999').send({ name: 'updated phone' });
    expect(response.status).toBe(404);
  });
});

// delete phone by id
describe('DELETE /api/phones/:id', () => {
  it('should delete a phone by id', async () => {
    const mockData = phoneMock();
    const phone = await Phone.create(mockData);
    const response = await request(app).delete(`/api/phones/${phone.id}`);
    expect(response.status).toBe(200);
  });

  it('should return 404 if phone not found', async () => {
    const response = await request(app).delete('/api/phones/999');
    expect(response.status).toBe(404);
  });
});
