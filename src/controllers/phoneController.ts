import { Request, Response } from 'express';
import Phone, { PhoneI } from '../models/phoneModel';
import { WhereOptions } from 'sequelize';
import { Op } from 'sequelize';

type ErrorResponse = { error: string }

export const getPhones = async (
  req: Request,
  res: Response<Phone[] | ErrorResponse>
) => {
  try {
    const {
      name,
      storage,
      audio_jack,
      wifi,
      camera,
      touchscreen,
      screen_size,
      camera_quality
    } = req.query;

    const where: WhereOptions<PhoneI> = {};

    if (name) {
      where.name = {
        [Op.like]: `%${name}%`
      };
    }

    if (storage) {
      const storageSize = parseInt(storage.toString());
      where.storage_size = storageSize;
    }

    if (audio_jack) {
      const audioJackString = audio_jack.toString();
      where.has_audio_jack = audioJackString === 'true' || audioJackString === '1';
    }
    
    const allPhones = await Phone.findAll({ where });
    res.json(allPhones);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const createPhone = async (
  req: Request<any, Phone | ErrorResponse, Phone>,
  res: Response<Phone | ErrorResponse>
) => {
  const {
    name,
    storage_size,
    storage_type,
    has_audio_jack,
    has_wifi,
    has_camera,
    camera_quality,
    screen_size,
    has_touchscreen,
  } = req.body;

  try {
    const phone = await Phone.create({
      name,
      storage_size,
      storage_type,
      has_audio_jack,
      has_wifi,
      has_camera,
      camera_quality,
      screen_size,
      has_touchscreen
    });
    res.status(201).json(phone);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
};

export const getPhoneById = async (
  req: Request<{ id: string }, Phone | ErrorResponse>,
  res: Response<Phone | ErrorResponse>
) => {
  const { id } = req.params;

  try {
    const phone = await Phone.findByPk(id);
    if (!phone) {
      res.status(404).json({ error: 'Phone not found' });
      return;
    }
    res.json(phone);
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong' });
  }
}