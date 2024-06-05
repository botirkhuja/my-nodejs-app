import { Request, Response } from 'express';
import Phone, { PhoneI, PhoneQueryI } from '../models/phoneModel';
import { WhereOptions } from 'sequelize';
import { Op } from 'sequelize';
import { constants as STATUS_CODES } from 'http2';

type MessageRes = { message: string };
type IdParams = { id: string };

export const getPhones = async (
  req: Request,
  res: Response<Phone[] | MessageRes>
) => {
  try {
    const where = getWhereOptions(req.query);

    const allPhones = await Phone.findAll({ where });
    res.json(allPhones);
  } catch (error) {
    res.status(STATUS_CODES.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
  }
};

export const createPhone = async (
  req: Request<any, Phone | MessageRes, Phone>,
  res: Response<Phone | MessageRes>
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

    if (!name || !storage_size || !storage_type || !has_audio_jack || !has_wifi || !has_camera || !camera_quality || !screen_size || !has_touchscreen) {
      res.status(STATUS_CODES.HTTP_STATUS_BAD_REQUEST).json({ message: 'Missing required fields' });
      return;
    }

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

    if (!phone) {
      res.status(STATUS_CODES.HTTP_STATUS_BAD_REQUEST).json({ message: 'Invalid phone data' });
      return;
    }

    res.status(STATUS_CODES.HTTP_STATUS_CREATED).json(phone);
  } catch (error) {
    res.status(STATUS_CODES.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
  }
};

export const getPhoneById = async (
  req: Request<IdParams, Phone | MessageRes>,
  res: Response<Phone | MessageRes>
) => {
  const { id } = req.params;

  try {
    const phone = await Phone.findByPk(id);
    if (!phone) {
      res.status(STATUS_CODES.HTTP_STATUS_NOT_FOUND).json({ message: 'Phone not found' });
      return;
    }
    res.json(phone);
  } catch (error) {
    res.status(STATUS_CODES.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
  }
}

const getWhereOptions = (query: PhoneQueryI): WhereOptions<PhoneI> => {
  const where: WhereOptions<PhoneI> = {};

  if (query.name) {
    where.name = {
      [Op.like]: `%${query.name}%`
    };
  }

  if (query.storage) {
    const storageSize = parseInt(query.storage.toString());
    where.storage_size = storageSize;
  }

  if (query.audioJack) {
    const audioJackString = query.audioJack.toString();
    where.has_audio_jack = audioJackString === 'true' || audioJackString === '1';
  }

  if (query.wifi) {
    const wifiString = query.wifi.toString();
    where.has_wifi = wifiString === 'true' || wifiString === '1';
  }

  if (query.camera) {
    const cameraString = query.camera.toString();
    where.has_camera = cameraString === 'true' || cameraString === '1';
  }

  if (query.touchscreen) {
    const touchscreenString = query.touchscreen.toString();
    where.has_touchscreen = touchscreenString === 'true' || touchscreenString === '1';
  }

  return where;
}

export const updatePhoneById = async (
  req: Request<IdParams, Phone | MessageRes, Partial<PhoneI>>,
  res: Response<Phone | MessageRes>
) => {
  const { id } = req.params;
  const phoneData = req.body;

  try {
    const phone = await Phone.findByPk(id);
    if (!phone) {
      res.status(STATUS_CODES.HTTP_STATUS_NOT_FOUND).json({ message: 'Phone not found' });
      return;
    }
    await phone.update(phoneData);
    res.json(phone);
  } catch (error) {
    res.status(STATUS_CODES.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
  }
}

export const deletePhoneById = async (
  req: Request<IdParams, MessageRes>,
  res: Response<MessageRes>
) => {
  const { id } = req.params;

  try {
    const phone = await Phone.findByPk(id);
    if (!phone) {
      res.status(STATUS_CODES.HTTP_STATUS_NOT_FOUND).json({ message: 'Phone not found' });
      return;
    }
    await phone.destroy();
    res.json({ message: 'Phone deleted' });
  } catch (error) {
    res.status(STATUS_CODES.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
  }
}