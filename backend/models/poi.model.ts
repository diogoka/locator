import { Model, model, Schema } from 'mongoose';

type PoiType = {
    name: string;
    latitude: number;
    longitude: number;
};

type PoiModel = Model<PoiType>;

const poiSchema = new Schema<PoiType, PoiModel>(
    {
        name: {
            type: String,
            required: true,
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
