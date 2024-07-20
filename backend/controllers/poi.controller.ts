import express from 'express';
import { Poi } from '../models/poi.model';

export const getAllPois = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const allPois = await Poi.find();
        res.status(200).json(allPois);
    } catch (e) {
        res.status(500).json(`Server Error: ${e}`);
    }
};

export const newPoi = async (req: express.Request, res: express.Response) => {
    try {
        const { name, latitude, longitude } = req.body;
        const newPoi = await Poi.create({
            name: name,
            latitude: +latitude,
            longitude: +longitude,
        });
        res.status(201).json({ newPoi });
    } catch (e) {
        res.status(500).json(`Server Error: ${e}`);
    }
};

export const deletePoi = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const id = req.params.id;

        if (!id) {
            res.status(400).json('Missing parameter.');
        } else {
            const deleted = await Poi.findByIdAndDelete(req.params.id);
            res.status(200).json(deleted);
        }
    } catch (e) {
        res.status(500).json(`Server Error: ${e}`);
    }
};
