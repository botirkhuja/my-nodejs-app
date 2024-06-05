import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/database';

export interface PhoneI {
  id: number;
  name: string;
  storage_size: number | null;	
  storage_type: string | null;	
  has_audio_jack: boolean;	
  has_wifi: boolean;	
  has_camera: boolean;	
  camera_quality: number | null;	
  screen_size:	number | null;	
  has_touchscreen: boolean;
}

export interface PhoneQueryI {
  name?: string;
  storage?: string;
  storageType?: string;
  audioJack?: string;
  wifi?: string;
  camera?: string;
  cameraQuality?: string;
  touchscreen?: string;
  screenSize?: string;
}

export interface PhoneCreationI extends Optional<PhoneI, 'id'> {};

class Phone extends Model<PhoneI, PhoneCreationI> implements PhoneI {
  public id!: number;
  public name!: string;
  public storage_size!: number;
  public storage_type!: string;
  public has_audio_jack!: boolean;
  public has_wifi!: boolean;
  public has_camera!: boolean;
  public camera_quality!: number;
  public screen_size!: number;
  public has_touchscreen!: boolean;
}

Phone.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    storage_size: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    storage_type: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    has_audio_jack: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    has_wifi: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    has_camera: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    camera_quality: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    screen_size: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    has_touchscreen: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'phones_list',
  }
);

export default Phone;