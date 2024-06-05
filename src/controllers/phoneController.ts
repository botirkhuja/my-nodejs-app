import { Request, Response } from 'express';
import Phone, { PhoneI } from '../models/phoneModel';
import { constants as STATUS_CODES } from 'http2';
import { getWhereOptions, isPhoneFound, isPhoneIdValid } from './helpers';
import { MessageRes } from '../models/responseModel';

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

  if (!isPhoneIdValid(id, res)) {
    return;
  }

  try {
    const phone = await Phone.findByPk(id);
    if (!isPhoneFound(phone, res)) {
      return;
    }
    res.json(phone);
  } catch (error) {
    res.status(STATUS_CODES.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
  }
}

export const updatePhoneById = async (
  req: Request<IdParams, Phone | MessageRes, Partial<PhoneI>>,
  res: Response<Phone | MessageRes>
) => {
  const { id } = req.params;
  const phoneData = req.body;

  if (!isPhoneIdValid(id, res)) {
    return;
  }

  try {
    const phone = await Phone.findByPk(id);
    if (!isPhoneFound(phone, res)) {
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

  if (!isPhoneIdValid(id, res)) {
    return;
  }

  try {
    const phone = await Phone.findByPk(id);
    if (!isPhoneFound(phone, res)) {
      return;
    }
    await phone.destroy();
    res.json({ message: 'Phone deleted' });
  } catch (error) {
    res.status(STATUS_CODES.HTTP_STATUS_INTERNAL_SERVER_ERROR).json({ message: 'Something went wrong' });
  }
}