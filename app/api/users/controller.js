import { Op } from "sequelize";

import Room from "../admin/model/model.js";
import Booking from "./model/model.js";

const findRoom = async (req, res) => {
    try {
        let { id, capacity, rent, roomNumber } = req.query;
        let maxRent = rent;
        let minCapacity = capacity;

        if (id != null) {
            const room = Room.findOne({
                where: { id: id },
            });
            return res.status(200).json(room);
        }
        if (roomNumber != null) {
            const room = Room.findOne({
                where: { roomNumber: roomNumber },
            });
            return res.status(200).json(room);
        }

        if (maxRent == null) {
            maxRent = 99999999;
        }
        if (minCapacity == null) {
            minCapacity = 0;
        }

        const rooms = await Room.findAll({
            where: {
                rent: {
                    [Op.lte]: maxRent,
                },
                capacity: {
                    [Op.gte]: minCapacity,
                },
            },
        });

        console.log(rooms);
        return res.status(200).json(rooms);
    } catch (err) {
        console.log(err);
        return res.status(500).send("some error occured");
    }
};

const findAllRooms = async (req, res) => {
    try {
        const rooms = await Room.findAll({});
        console.log(rooms);
        res.status(200).send(rooms);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
};

const findAvailableDates = async (req, res) => {
    try {
        let { id, startDate, endDate } = req.query;

        const room = await Room.findOne({ where: { id: id } });
        if (room == null) {
            return res.status(404).send("Room doesn't exist");
        }

        startDate = new Date(startDate);
        endDate = new Date(endDate);

        const overlappingBookings = await Booking.findAll({
            where: {
                id: id,
                startDate: {
                    [Op.lte]: endDate,
                },
                endDate: {
                    [Op.gte]: startDate,
                },
            },
        });

        const bookedDates = overlappingBookings.reduce((dates, booking) => {
            const { startDate, endDate } = booking;
            const current = new Date(startDate);
            const last = new Date(endDate);

            while (current <= last) {
                dates.push(new Date(current));
                current.setDate(current.getDate() + 1);
            }
            return dates;
        }, []);

        console.log("Booked dates: ", bookedDates);

        const availableDates = [];
        const current = new Date(startDate);
        const last = new Date(endDate);

        while (current <= last) {
            const currentDate = new Date(current);

            if (
                !bookedDates.some(
                    (date) => date.getUTCDate() === currentDate.getUTCDate()
                )
            ) {
                availableDates.push(currentDate.getUTCDate());
            }
            current.setDate(current.getDate() + 1);
        }

        console.log("Available dates: ", availableDates);

        return res.status(200).send(availableDates);
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

const bookRoom = async (req, res) => {
    try {
        let { id, startDate, endDate } = req.body;
        let username = req.userId || "user id or user name";

        startDate = new Date(startDate);
        endDate = new Date(endDate);

        const room = await Room.findOne({ where: { id: id } });
        if (room == null) {
            return res.status(404).send("room doesn't exist");
        }

        const isBookingExist = await Booking.findOne({
            where: {
                id: id,
                startDate: { [Op.lte]: endDate },
                endDate: { [Op.gte]: startDate },
            },
        });

        if (isBookingExist != null) {
            return res.status(400).send("Booking for this date already exist");
        }

        const booking = await Booking.create({
            id: id,
            username: username,
            startDate,
            endDate,
        });

        res.status(200).send(booking);
    } catch (err) {
        console.log(err);
        return res.status(500).send(err);
    }
};

export { findRoom, bookRoom, findAvailableDates, findAllRooms };
