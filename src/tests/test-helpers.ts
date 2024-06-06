import { PhoneI } from "../models/phoneModel";

export const mockPhoneData = (phone?: Partial<PhoneI>): PhoneI => {
  return {
    id: phone?.id || 1,
    name: phone?.name || 'test phone',
    storage_size: phone?.screen_size || 128,
    storage_type: phone?.storage_type || 'GB',
    has_audio_jack: phone?.has_audio_jack || false,
    has_wifi: phone?.has_wifi || true,
    has_camera: phone?.has_camera || true,
    camera_quality: phone?.camera_quality || 12,
    screen_size: phone?.screen_size || 6,
    has_touchscreen: phone?.has_touchscreen || true,
  };
}