import { Response } from 'express';
import { WhereOptions, Op } from "sequelize";
import { constants as STATUS_CODES } from 'http2';
import Phone, { PhoneI, PhoneQueryI } from "../models/phoneModel";
import { MessageRes } from '../models/responseModel';

export const getWhereOptions = (query: PhoneQueryI): WhereOptions<PhoneI> => {
  const where: WhereOptions<PhoneI> = {};

  if (query.name) {
    where.name = {
      [Op.iLike]: `%${query.name}%`
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

  if (query.cameraQuality && !Number.isNaN(parseInt(query.cameraQuality.toString()))) {
    const cameraQuality = parseInt(query.cameraQuality.toString());
    where.camera_quality = cameraQuality;
  }

  if (query.touchscreen) {
    const touchscreenString = query.touchscreen.toString();
    where.has_touchscreen = touchscreenString === 'true' || touchscreenString === '1';
  }

  if (query.screenSize && !Number.isNaN(parseInt(query.screenSize.toString()))) {
    const screenSize = parseInt(query.screenSize.toString());
    where.screen_size = screenSize;
  }

  return where;
}

export const isPhoneIdValid = (id: string, res: Response<MessageRes>): boolean => {
  if (Number.isNaN(parseInt(id))) {
    res.status(STATUS_CODES.HTTP_STATUS_BAD_REQUEST).json({ message: 'Invalid ID supplied' });
    return false;
  }
  return true;
}

export const isPhoneFound = (phone: Phone | null, res: Response<MessageRes>): phone is Phone => {
  if (!phone) {
    res.status(STATUS_CODES.HTTP_STATUS_NOT_FOUND).json({ message: 'Phone not found' });
    return false;
  }
  return true;
}