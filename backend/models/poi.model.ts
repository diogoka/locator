import { Model, model, Schema } from 'mongoose';
import { PoiType } from '../types/types';

type PoiModel = Model<PoiType>;

const poiSchema = new Schema<PoiType, PoiModel>(
    {
        name: {
            type: String,
            required: true,
        },
        location: {
            type: String || null,
            required: false,
        },
        latitude: {
            type: Number,
            required: true,
        },
        longitude: {
            type: Number,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const Poi = model<PoiType, PoiModel>('Poi', poiSchema);
