import request from 'supertest';
import app from '../app';
import { mockPhoneData } from './test-helpers';
import Phone from '../models/phoneModel';

jest.mock('../models/phoneModel');
jest.mock('../config/database');

const mockPhone = Phone as jest.Mocked<typeof Phone>;

beforeEach(() => {
  mockPhone.findAll.mockReset();
  mockPhone.findByPk.mockReset();
  mockPhone.create.mockReset();
});
  
  describe('GET /api/phones', () => {
    
    it('should return an empty array initially', async () => {
    mockPhone.findAll.mockResolvedValue([]);
    const response = await request(app).get('/api/phones');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should filter phones by name', async () => {
    const mockData = mockPhoneData();
    mockPhone.findAll.mockResolvedValue([mockData as never as Phone]);
    const response = await request(app).get('/api/phones?name=test');
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].name).toBe(mockData.name);
  });
});

describe('GET /api/phones/:id', () => {
  it('should return a phone by id', async () => {
    const mockData = mockPhoneData({ name: 'test phone 1' });
    mockPhone.findByPk.mockResolvedValue(mockData as never as Phone);
    const response = await request(app).get(`/api/phones/${mockData.id}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(mockData.name);
    expect(mockPhone.findByPk).toHaveBeenCalledWith(mockData.id.toString());
  });

  it('should return 404 if phone not found', async () => {
    mockPhone.findByPk.mockResolvedValue(null);
    const response = await request(app).get('/api/phones/999');
    expect(response.status).toBe(404);
    expect(mockPhone.findByPk).toHaveBeenCalledWith('999');
  });
});

describe('POST /api/phones', () => {
  it('should create a new phone', async () => {
    const mockData = mockPhoneData();
    mockPhone.create.mockResolvedValue(mockData as never as Phone);
    const response = await request(app).post('/api/phones').send(mockData);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(mockData.name);
    expect(mockPhone.create).toHaveBeenCalledWith({ ...mockData, id: undefined });
  });
  it('should give error for missing field', async () => {
    const mockData = mockPhoneData();
    const response = await request(app).post('/api/phones').send({ ...mockData, name: undefined });
    expect(response.status).toBe(400);
  });
});

describe('Put /api/phones/:id', () => {
  it('should update a phone name', async () => {
    let mockData = mockPhoneData({ name: 'test phone 1' });
    const updateFn = jest.fn();
    mockPhone.findByPk.mockResolvedValue({ ...mockData, update: updateFn } as never as Phone);
    const response = await request(app).put(`/api/phones/${mockData.id}`).send({ name: 'updated phone' });
    expect(response.status).toBe(200);
    expect(updateFn).toHaveBeenCalledWith({ name: 'updated phone' });
  });

  it('should return 404 if phone not found', async () => {
    const response = await request(app).put('/api/phones/999').send({ name: 'updated phone' });
    expect(response.status).toBe(404);
    expect(mockPhone.findByPk).toHaveBeenCalledWith('999');
  });
});

// delete phone by id
describe('DELETE /api/phones/:id', () => {
  it('should delete a phone by id', async () => {
    const mockData = mockPhoneData();
    const destroyFn = jest.fn();
    mockPhone.findByPk.mockResolvedValue({ ...mockData, destroy: destroyFn } as never as Phone);
    const response = await request(app).delete(`/api/phones/${mockData.id}`);
    expect(response.status).toBe(200);
    expect(mockPhone.findByPk).toHaveBeenCalledWith(mockData.id.toString());
    expect(destroyFn).toHaveBeenCalled();
  });

  it('should return 404 if phone not found', async () => {
    const response = await request(app).delete('/api/phones/999');
    expect(response.status).toBe(404);
    expect(mockPhone.findByPk).toHaveBeenCalledWith('999');
  });
});
